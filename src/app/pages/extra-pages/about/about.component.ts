import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { TeamData } from './data';
import { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

/**
 * About Component
 */
export class AboutComponent implements OnInit {

  teamDatas: any;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  constructor(private formBuilder: UntypedFormBuilder) { }

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

  ngOnInit(): void {
    this.teamDatas = TeamData;
    /**
     * Form Validatyion
     */

  }



}
