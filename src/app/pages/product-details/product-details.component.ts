import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
import { SignmodalComponent } from 'src/app/shared/modals/signmodal/signmodal.component';
import { cart_details, cartdata } from '../cart/data';
import Swal from 'sweetalert2';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  fromDataResolver = FromDataResolver;
  relatedProducts: any;

  ratingBreakdown: RatingBreakdown[] = [
    { stars: 5, count: 78, percentage: 61 },
    { stars: 4, count: 32, percentage: 25 },
    { stars: 3, count: 12, percentage: 9 },
    { stars: 2, count: 3, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  selectedImage: string = '';
  selectedSize: ProductSize | null = null;
  selectedColor: ProductColor | null = null;
  quantity: number = 1;
  isInWishlist: boolean = false;
  hasMoreReviews: boolean = true;

  product_id: string | undefined;
  product_name: string | undefined;
  category_name_header: string | undefined;
  category_list: any;
  complete_product_list: any;
  productDetails: any;

  constructor(
    private route: ActivatedRoute, private modalService: NgbModal,
    private router: Router, private restService: HttpService, private ngxService: NgxUiLoaderService,
  ) {

    this.getCategory();
    this.getProductList();
    this.route.queryParams.subscribe(params => {
      this.product_id = params['product_id'];
    });
    console.log(this.product_id);

  }

  async getCategory(): Promise<any> {
    try {
      let category_response = await this.restService.getCategoryList();
      if (category_response.data) {
        this.category_list = category_response.data;

      }
    }
    catch (error) {
      console.error('Error fetching category list', error);
    }
  }

  async getProductList(): Promise<any> {
    try {
      let product_response = await this.restService.getProductList();
      if (product_response.data) {
        this.complete_product_list = product_response.data;
        this.product_name = this.complete_product_list.find((c: any) => c._id == this.product_id)?.title;
        const category_code = this.complete_product_list.find((c: any) => c._id == this.product_id)?.category_code;
        this.category_name_header = this.category_list.find((c: any) => c._id == category_code)?.title;
        this.productDetails = this.complete_product_list.find((c: any) => c._id == this.product_id);
        this.relatedProducts = this.complete_product_list.filter((c: any) => c.category_code === category_code);
      }
    }
    catch (error) {
      console.error('Error fetching product list', error);
    }
  }

  ngOnInit(): void {

  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  selectSize(size: ProductSize): void {
    if (size.available) {
      this.selectedSize = size;
    }
  }

  selectColor(color: ProductColor): void {
    if (color.available) {
      this.selectedColor = color;
    }
  }
  getDiscountPercentage(): number {
    if (this.productDetails.list_price > this.productDetails.price) {
      return Math.round(((this.productDetails.list_price - this.productDetails.price) / this.productDetails.price) * 100);
    }
    return 0;
  }

  async addnewitem(product: any): Promise<void> {
    if (this.checkLoginStatus()) { return; }
    this.ngxService.start();
    var sub = CookieStore.getUserInfo()?.sub;

    if (product.quantity == 0) {
      this.ngxService.stop();
      return;
    }

    if (product.group_modifiers_list.length != 0) {
      var required = false;
      product.group_modifiers_list.forEach((group_modifier: any) => {
        if (group_modifier.mtype == 0 && group_modifier.selected == false) {
          required = true;
        }
      });
      if (required) {

        Swal.fire({ title: 'Message', text: `Please choose required options`, confirmButtonColor: '#364574', timer: 1500 });
        this.ngxService.stop();
        return;
      }
    }

    product.sub = sub;
    let cart_data = cartdata.find(data => data.product_id == product.product_id);
    if (cart_data) {
      cart_data.price = product.price;
      cart_data.qty = product.qty;
      cart_data.addon_total = product.addon_total;
      cart_data.total_price = product.total_price;
      cart_data.group_modifiers_list = product.group_modifiers_list;
    } else {
      cartdata.push(product);
    }

    const cart_info: any = {};
    cart_info.sub = sub;
    cart_info.cart_items = [];
    cart_info.cart_items.push(product);

    let response = await this.restService.addCartItems(cart_info);
    this.ngxService.stop();
    if (response.data) {
      this.modalService.dismissAll();
      Swal.fire({ title: 'Added!', text: `${product.title} has been Added to cart.`, confirmButtonColor: '#364574', icon: 'success', position: 'bottom-end', width: '500px', timer: 1500 });
    }

  }
  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
    // Implement wishlist logic here
    console.log('Wishlist toggled:', this.isInWishlist);
  }

  openImageModal(image?: string): void {
    // Implement image modal/zoom functionality
    const imageToShow = image || this.selectedImage;
    console.log('Opening image modal for:', imageToShow);
    // You can use a modal library like ng-bootstrap modal here
  }



  loadMoreReviews(): void {
    // Implement load more reviews functionality
    console.log('Loading more reviews...');
    // You can load more reviews from your service here
    this.hasMoreReviews = false; // Set to false when no more reviews
  }

  async decreaseQuantity(product: any): Promise<void> {
    if (this.checkLoginStatus()) { return; }

    if (product.qty == 1) {
      this.removecart(product);
      return;
    }

    product.qty--;
    this.calculateAddontotal(product);
    this.updateTempCart(product);
  }

  async updateTempCart(product: any) {
    if (this.checkLoginStatus()) { return; }
    var sub = CookieStore.getUserInfo()?.sub;

    this.ngxService.start();

    product.sub = sub;
    let cart_data = cartdata.find(data => data.product_id == product.product_id);
    if (cart_data) {
      cart_data.price = product.price;
      cart_data.qty = product.qty;
      cart_data.addon_total = product.addon_total;
      cart_data.total_price = product.total_price;
      cart_data.group_modifiers_list = product.group_modifiers_list;
    } else {
      cartdata.push(product);
    }

    const cart_info: any = {};
    cart_info.sub = sub;
    cart_info.cart_items = [];
    cart_info.cart_items.push(product);

    await this.restService.addCartItems(cart_info);
    this.ngxService.stop();
  }

  calculateAddontotal(product: any) {
    let addons_total_price = 0;
    if (product.group_modifiers_list.length != 0) {
      product.group_modifiers_list.forEach((group_modifier: any) => {
        group_modifier.modifiers_list.forEach((modifier: any) => {
          if (modifier.selected) {
            addons_total_price = addons_total_price + modifier.price;
          }
        });
      });
    }
    product.addon_total = addons_total_price;
    product.total_price = product.qty * (addons_total_price + product.price);
  }

  async onModifierChange(product: any, group_modifier: any, modifier: any): Promise<void> {
    if (group_modifier.mtype == 0) {
      group_modifier.modifiers_list.forEach((element: any) => {
        element.selected = false;
      });
      group_modifier.selected = true;
    }
    modifier.selected = !modifier.selected;
    this.calculateAddontotal(product);

  }

  gotoProduct(product_id: string) {
    const currentProductId = this.product_id; // Store the current product ID

    if (currentProductId === product_id) {
      // If navigating to the same product, refresh the route with updated parameters
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { product_id: product_id },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    } else {
      // Navigate to a different product
      this.router.navigate(['/products'], {
        queryParams: { product_id: product_id }
      });
    }

    this.product_name = this.complete_product_list.find((c: any) => c._id == product_id)?.title;
    this.productDetails = this.complete_product_list.find((c: any) => c._id == product_id);
    this.scrollToTop();
  }

  async removecart(product: any) {
    if (this.checkLoginStatus()) { return; }
    this.ngxService.start();
    // this.cartdata.splice(product, 1);
    const index = cartdata.findIndex((cart: any) => cart.product_id == product.product_id);
    if (index !== -1) {
      cartdata.splice(index, 1);
    }
    if (product.sub == undefined) {
      product.sub = CookieStore.getUserInfo()?.sub
    }
    let remove_obj: any = {
      sub: product.sub,
      product_id: product.product_id
    };
    await this.restService.removeCartItems(remove_obj);
    this.ngxService.stop();
  }

  getItemStatus(productId: string) {
    const productStatus = cartdata.find(data => data.product_id == productId);
    if (productStatus) {
      return true;
    }
    return false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }
  async onQuantityChange(product: any): Promise<void> {
    if (this.checkLoginStatus()) { return; }

    if (product.qty < 0) {
      product.qty = 1;
    }
    this.calculateAddontotal(product);
    this.updateTempCart(product);
  }

  async increaseQuantity(product: any): Promise<void> {
    if (this.checkLoginStatus()) { return; }
    product.qty++;
    this.calculateAddontotal(product);
    this.updateTempCart(product);
  }
  checkLoginStatus(): boolean {
    var sub = CookieStore.getUserInfo()?.sub;
    if (sub == "" || sub == undefined) {
      this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
      return true;
    }
    return false;
  }

}


interface ProductSize {
  name: string;
  available: boolean;
}

interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductNutrition {
  name: string;
  value: string;
}

interface ProductReview {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  maxQuantity: number;
  images: string[];
  sizes?: ProductSize[];
  colors?: ProductColor[];
  ingredients: string[];
  specifications: ProductSpecification[];
  nutrition: ProductNutrition[];
  allergens: string[];
  reviews: ProductReview[];
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
}

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}