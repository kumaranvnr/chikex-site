import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cart_details, cartdata } from '../cart/data';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { SignmodalComponent } from 'src/app/shared/modals/signmodal/signmodal.component';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  fromDataResolver = FromDataResolver;
  products: any;
  productdetail: any = {};
  category_name_header: any;
  category_list: any = {};
  complete_product_list: any = {};
  complete_category_list: any = {};
  location_List: any = {};
  address: any = {};
  outlet_id: any;
  outlet_code: any;
  loading: boolean = true;
  expandedItems: Set<string> = new Set();
  selected_category_id: string = '';
  // coupons: CouponData[] = [];
  // showArrows: boolean = true;


  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private ngxService: NgxUiLoaderService,
    private restService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.ngxService.start();
    this.getCategory();
    this.getLocationList();
    this.getProductList();
    this.ngxService.stop();

  }


  gotoProductView(product_id: string) {
    this.router.navigate(['/products'], {
      queryParams:
      {
        product_id: product_id
      }
    });
  }

  isActive(category_id: any): boolean {
    return this.selected_category_id === category_id; // Check if the category is active
  }
  showMore(item: any): void {
    if (this.expandedItems.has(item._id)) {
      this.expandedItems.delete(item._id); // Collapse if already expanded
    } else {
      this.expandedItems.add(item._id); // Expand
    }
  }

  addToFavorites(item: any) {
    // Logic to add item to favorites
  }

  async getLocationList(): Promise<any> {
    let response = await this.restService.getLocationList();
    if (response.data) {
      this.location_List = response.data.location_list;
    } else {
      console.log(response?.error);
    }
  }

  // onCouponClick(coupon: CouponData): void {
  //   if (!coupon.isAutoApplied) {
  //     // Handle coupon code copy or application logic
  //     console.log('Coupon clicked:', coupon.code);
  //   }
  // }

  // check_product_status(product: any) {
  //   var status = true;
  //   CookieStore.getDataAsync('outlet_id').then(data => {
  //     if (data) {
  //       const location_id = product.locations.find((location: any) => location == data);
  //       if (!location_id || location_id == undefined) {
  //         status = false;
  //       }
  //     }
  //   });
  //   return status
  // }

  check_product_status(product: any) {
    if (this.outlet_id == undefined) {
      return true;
    }
    var location_id = product.locations.find((location: any) => location === this.outlet_id);
    if (location_id) {
      return true;
    }
    return false;
  }

  async check_address_list(): Promise<any> {

    const location_data = await CookieStore.getDataAsync("location_data");
    if (location_data) {
      this.outlet_code = location_data?.code;
      this.outlet_id = location_data?._id;
      CookieStore.saveDataAsync("outlet_id", this.outlet_id);
      this.cd.detectChanges();
      return;
    }

    this.ngxService.start();
    var getlocation: boolean = false;
    const user_info = await CookieStore.getUserInfo()?.sub;
    this.ngxService.stop();
    if (user_info) {
      this.ngxService.start();
      let user_address_response = await this.restService.getUserAddressList();
      this.ngxService.stop();
      if (user_address_response?.data.length > 0) {
        this.address = user_address_response?.data.find((data: any) => data.primary == true);
        CookieStore.saveDataAsync("current_address", this.address);
        this.outlet_code = this.address.nearbyStore;
      } else {
        getlocation = true;
      }
    }
    else {
      getlocation = true;
    }
    if (getlocation) {
      await this.getCurrentLocation();
    }
    if (this.location_List && this.outlet_code) {
      this.outlet_id = this.location_List.find((data: any) => data.code == this.outlet_code)?._id;
      CookieStore.saveDataAsync("outlet_id", this.outlet_id);
      this.cd.detectChanges();
    }
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.updateMenuGridView();
    // }, 100);

    this.check_address_list();
  }


  private updateModifiersView() {
    const targetElements = document.querySelectorAll('.mobile-modifiers');

    targetElements.forEach((element: Element) => {
      if (this.checkMobileDevice()) {
        element.classList.remove('d-flex');
      } else {
        element.classList.add('d-flex');
      }
    });
  }

  // private updateMenuGridView() {
  //   try {
  //     const targetElements = document.querySelectorAll('.menu-grid');
  //     targetElements.forEach((element: Element) => {
  //       if (this.checkMobileDevice()) {
  //         element.classList.remove('mb-grid-gutter');
  //       } else {
  //         element.classList.add('mb-grid-gutter');
  //       }
  //     });
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  lat: any; long: any;
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinate: any = {};
          coordinate.lat = position.coords.latitude;
          coordinate.long = position.coords.longitude;
          this.ngxService.start();
          let location_response = await this.restService.getNearbyLocationList(coordinate);
          this.ngxService.stop();
          if (location_response) {
            if (location_response.data.length > 0) {
              this.outlet_id = location_response?.data[0]?._id;
              CookieStore.saveDataAsync("outlet_id", this.outlet_id);
              this.outlet_code = location_response?.data[0]?.code;
            }
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  filterProducts(category_id: any) {
    setTimeout(() => {
      if (this.complete_product_list) {
        this.products = this.complete_product_list.filter((item: any) => {
          return item.category_code === category_id;
        });
      }
    }, 100);
  }

  async getCartRequest(): Promise<any> {
    if (cart_details._id == '') {
      this.ngxService.start();
      let cart_reponse = await this.restService.getCartIdRequest();
      if (cart_reponse.data) {
        cart_details._id = cart_reponse.data._id;
        cart_details.sub = cart_reponse.data.sub;
        cart_details.total_price = cart_reponse.data.total_price;
        cartdata.splice(0);
        cart_reponse.data.cart_items.forEach((element: any) => {
          cartdata.push(element)
        });
      }
      this.ngxService.stop();
    }
  }

  scrollToCategory(categoryId: string) {
    const element = document.getElementById('category-' + categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async getProductList(): Promise<any> {
    try {
      let product_response = await this.restService.getProductList();
      if (product_response.data) {
        this.complete_product_list = product_response.data;
        this.loading = false;
      }
      let category_id = this.route.snapshot.paramMap.get('category');
      if (category_id == null || category_id == undefined || category_id == '') {
        category_id = this.complete_category_list[0]._id;
      }

      if (category_id) {
        this.category_name_header = category_id;
        this.selectcategory(category_id, null);
      }
    }
    catch (error) {
      console.error('Error fetching products', error);
      this.loading = false;
    }
  }

  async getCategory(): Promise<any> {
    let category_response = await this.restService.getCategoryList();
    if (category_response.data) {
      this.category_list = category_response.data;
      this.complete_category_list = category_response.data;
    }
  }

  getCategoryDescription(category_id: any) {
    return this.complete_category_list.find((c: any) => c._id == category_id)?.title
  }

  // open modal
  openModal(content: any, product_id: string) {
    // var sub = CookieStore.getUserInfo()?.sub;
    // if (sub == "" || sub == undefined) {
    //   this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
    //   return;
    // }
    this.productdetail = this.complete_product_list.find((c: any) => c._id == product_id);

    var location_id = this.productdetail.locations.find((location: any) => location === this.outlet_id);


    // if (!location_id) {
    //   Swal.fire({ title: 'Message', text: `Stock not available`, confirmButtonColor: '#364574',timer:1500  });
    //   return;
    // }
    // this.check_location_status(this.products[i]);
    setTimeout(() => {
      this.updateModifiersView();
    }, 100);

    this.modalService.open(content, { size: 'xl', centered: true });

  }

  checkLoginStatus(): boolean {
    var sub = CookieStore.getUserInfo()?.sub;
    if (sub == "" || sub == undefined) {
      this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
      return true;
    }
    return false;
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

  adjustWidth(event: any): void {
    const input = event.target;
    input.style.width = `${input.value.length + 1}ch`; // Adjust width based on input length
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

  getItemStatus(productId: string) {
    const productStatus = cartdata.find(data => data.product_id == productId);
    if (productStatus) {
      return true;
    }
    return false;
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

  // filter product
  selectcategory(category_id: string, event: any) {
    try {
      this.selected_category_id = category_id;
      const iconItems = document.querySelectorAll('#filter-list');
      iconItems.forEach((item: any) => {
        var el = item.querySelectorAll('li')
        el.forEach((item: any) => {
          var element = item.querySelector('a').innerHTML
          if (element === category_id) {
            item.querySelector('a')?.classList.add("active");
          } else {
            item.querySelector('a')?.classList.remove("active");
          }
        })
      });
      this.category_name_header = category_id;
      this.products = this.groupProductsByCategory();

      // this.products = this.complete_product_list.filter((item: any) => {
      //   return item.category_code === category_id
      // });
      if (this.checkMobileDevice()) {
        this.scrollToCategory(category_id);
        // this.scrollToProductsByCategory(category_id)
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  groupProductsByCategory(): any {
    let groupedProducts: { cat_desc: string, cat_index: number, product_items: any }[] = [];

    this.complete_category_list.forEach((category: any) => {
      const category_data: any = {};
      category_data.cat_id = category._id;
      category_data.cat_desc = category.title;
      category_data.cat_index = category.sortorder;
      category_data.product_items = this.complete_product_list.filter((c: any) => c.category_code === category._id);
      groupedProducts.push(category_data);
    });
    // groupedProducts = groupedProducts.sort(c => c.cat_index);
    return groupedProducts;
  }

  scrollToProductsByCategory(categoryId: string): void {
    const productListContainer = document.querySelectorAll('.product-section') as NodeListOf<HTMLElement>;
    const targetSection = Array.from(productListContainer).find((section: HTMLElement) => {
      return section.textContent?.trim() === categoryId; // Assuming each section has a data attribute for category ID
    });
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // scrollToCategory(categoryId: string): void {
  //   const categoryElements = document.querySelectorAll('.category-item') as NodeListOf<HTMLElement>;
  //   const targetElement = Array.from(categoryElements).find((el: HTMLElement) => {
  //     return el.textContent?.trim() === this.getCategoryName(categoryId); // Ensure proper comparison
  //   });

  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     targetElement.focus();
  //   }
  // }

  checkMobileDevice(): boolean {
    const mobileBreakpoints = [576, 768];
    const isMobile = mobileBreakpoints.some(breakpoint => window.innerWidth < breakpoint);
    return isMobile;
  }

  getCategoryName(category_id: string) {
    return this.complete_category_list.find((c: any) => c._id == category_id)?.title;
  }
}

export interface ICartItems {
  _id: string;
  id: string;
  sub: string;
  product_id: string;
  product_code: string;
  title: string;
  description: string;
  img_url: string;
  qty: number;
  price: number;
  addon_total: number;
  discount: number;
  total_price: number;
  currency: string;
  currency_locale: string;
  group_modifiers_list: any;
}

export interface CouponData {
  id: string;
  discount: number;
  subtitle: string;
  code?: string;
  isAutoApplied: boolean;
  isActive?: boolean;
}
