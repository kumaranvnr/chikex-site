import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cart_details, cartdata } from '../cart/data';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { SignmodalComponent } from 'src/app/shared/signmodal/signmodal.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  products: any;
  productdetail: any;
  category_name_header: any;
  category_list: any;
  complete_product_list: any;
  complete_category_list: any;

  constructor(private modalService: NgbModal,
    private restService: HttpService, private route: ActivatedRoute) {
    this.getProductList();
    this.getCategory()
    this.getCartRequest();
  }

  ngOnInit(): void {
    this.category_list = this.complete_category_list;
    this.route.params.subscribe(data => {
      if (data['category'] != null) {
        this.category_name_header = this.getCategoryDescription(data['category']);
        this.products = this.complete_product_list.filter((item: any) => {
          return item.category_code === data['category'];
        });
      }
    });
  }

  async getCartRequest(): Promise<any> {
    if (cart_details._id == '') {
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
    }
  }

  async getProductList(): Promise<any> {
    let category_response = await this.restService.getProductList();
    if (category_response.data) {
      this.products = category_response.data;
      this.complete_product_list = category_response.data;
    }
  }

  async getCategory(): Promise<any> {
    let category_response = await this.restService.getCategoryList();
    if (category_response.data) {
      this.category_list = category_response.data;
      this.complete_category_list = category_response.data;
    }
  }

  getCategoryDescription(category_id: string) {
    return this.complete_category_list.find((c: any) => c._id == category_id)?.title
  }

  // open modal
  openModal(content: any, i: any) {
    this.productdetail = this.products[i];
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  async decreaseQuantity(product: any): Promise<void> {
    if (product.qty == 1) {
      return;
    }
    product.qty--;
    this.calculateAddontotal(product);
  }

  async onQuantityChange(product: any): Promise<void> {
    if (product.qty < 0) {
      product.qty = 1;
    }
    this.calculateAddontotal(product);
  }

  async increaseQuantity(product: any): Promise<void> {
    product.qty++;
    this.calculateAddontotal(product);
  }
  adjustWidth(event: any): void {
    const input = event.target;
    input.style.width = `${input.value.length + 1}ch`; // Adjust width based on input length
  }
  calculateAddontotal(product: any) {
    var addons_total_price = 0;
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
  async addnewitem(product: any): Promise<void> {
    var sub = CookieStore.getUserInfo()?.sub;
    if (sub == "") {
      Swal.fire({ title: 'Login!', text: `Please Login to Continue`, confirmButtonColor: '#364574', icon: 'info', position: 'top', width: '500px', });
      this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
      return;
    }
    if (product.quantity == 0) {
      return;
    }

    product.sub = sub;
    let cart_data = cartdata.find(data => data.product_id == product.product_id);
    if (cart_data) {
      cart_data.qty = product.qty;
      cart_data.addon_total = product.addons_total_price;
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
    if (response.data) {
      this.modalService.dismissAll();
      Swal.fire({ title: 'Added!', text: `${product.title} has been Added to cart.`, confirmButtonColor: '#364574', icon: 'success', position: 'bottom-end', width: '500px', });
    }
  }

  qty_info: any
  async onChange(event: any) {
    this.qty_info = parseFloat(event.target.value);
  }

  // filter product
  selectcategory(category_id: string, event: any) {
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('li')
      el.forEach((item: any) => {
        var element = item.querySelector('a').innerHTML
        if (element === category_id) {
          item.querySelector('a')?.classList.add("active");
        } else {
          item.querySelector('a').classList.remove("active");
        }
      })
    });
    this.products = this.complete_product_list.filter((item: any) => {
      return item.category_code === category_id
    });
    this.category_name_header = category_id;
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