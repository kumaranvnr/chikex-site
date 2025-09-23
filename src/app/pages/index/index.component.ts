import { Component, OnInit, ViewChild } from '@angular/core';
import { Reviews } from './data';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { cart_details, cartdata } from '../cart/data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  fromDataResolver = FromDataResolver;
  category: any;

  review: any;
  index: number = 1;
  location_list: any = {};
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(public router: Router, private httpService: HttpService, private ngxService: NgxUiLoaderService,) {
    // this.getCartRequest();
  }

  ngOnInit(): void {
    this.review = Reviews;
    document.querySelector('.cart')?.classList.add('d-none');
    this.getCategory();
    this.getGoogleReviews();
  }

  async getGoogleReviews(): Promise<any> {
    const query: any = {};
    query.code = '9802';
    let review_response = await this.httpService.googlereviews(query);
    console.log(review_response);

  }

  async getCartRequest(): Promise<any> {
    if (cart_details._id == '') {
      let cart_reponse = await this.httpService.getCartIdRequest();
      if (cart_reponse.data) {
        cart_details._id = cart_reponse.data._id;
        cart_details.sub = cart_reponse.data.sub;
        cart_details.total_price = cart_reponse.data.total_price;
        cartdata.splice(0);
        cart_reponse.data.cart_items.forEach((element: any) => {
          cartdata.push(element);
        });
      }
    }
  }

  async getCategory(): Promise<any> {
    this.ngxService.start();
    let category_response = await this.httpService.getCategoryList();
    if (category_response.data) {
      this.category = category_response.data.filter((item: any) => {
        return item.homepage == true;
      })
    }
    this.ngxService.stop();
  }

  /**
   * Swiper Coverflow setting
   */
  /*   Coverflow: SwiperOptions = {
      initialSlide: 1,
      slidesPerView: 1,
      spaceBetween: 25,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      effect: 'fade',
    }; */
  public Coverflow: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 500,
    autoplay: true
  };

  /**
 * Swiper setting
 */
  public config: SwiperOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    spaceBetween: 25,
    breakpoints: {
      575: {
        slidesPerView: 2,
        pagination: false
      },
      850: {
        slidesPerView: 3,
        pagination: false
      },
      1080: {
        slidesPerView: 4,
        pagination: false
      }
    }
  };


  godetail() {
    // this.router.navigate('category')
    // this.router.navigate(['/ecommerce/product-detail/1', this.products[id]])
  }

}
