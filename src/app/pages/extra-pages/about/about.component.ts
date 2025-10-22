import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { TeamData } from './data';

import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper/types/swiper-options';

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
  index: number = 1;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  constructor(private formBuilder: UntypedFormBuilder) {

  }

  public config: SwiperOptions = {
    initialSlide: 1,
    slidesPerView: 1,
    spaceBetween: 25,
    breakpoints: {
      575: {
        slidesPerView: 2,

      },
      850: {
        slidesPerView: 3,

      },
      1080: {
        slidesPerView: 4,

      }
    }
  };

  ngOnInit(): void {
    this.teamDatas = TeamData;
    /**
     * Form Validatyion
     */
    this.chikexCustomerCounter();
  }

  chikexCustomerCounter() {
    const counters = document.querySelectorAll<HTMLDivElement>('.count');
    counters.forEach(counter => {
      const updateCount = () => {
        const targetAttr = counter.getAttribute('data-target');
        const target = targetAttr ? parseInt(targetAttr, 10) : 0; // Default to 0 if attribute is missing

        // Safely retrieve and convert the inner text
        const countText = counter.innerText;
        const count = countText ? parseInt(countText, 10) : 0; // Default to 0 if inner text is empty

        const increment = target / 200; // Adjust the speed of the counting

        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toString();
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target.toString();
        }
      };

      updateCount();
    });
  }



}
