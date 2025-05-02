import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss']
})
export class CustomerReviewComponent {

  location_list: Ilocations[] = [];
  locationData: any;
  emirates_list: any;


  constructor(private location: Location, private activatedRoute: ActivatedRoute, private router: Router,
    private restService: HttpService) {
    this.getEmiratesList();
    this.getLocationsForReview();
    setTimeout(() => {
      if (this.activatedRoute.snapshot.queryParams['id']) {
        this.locationFilter(this.activatedRoute.snapshot.queryParams['id']);
      }
    }, 1000);
  }

  generateVCard() {
    // vCard.firstName = 'Chikex ' + this.locationData.loc_name;
    // vCard.organization = 'Chikex Fried Chicken & Restaurant L.L.C';
    // vCard.photo.attachFromUrl('https://chikex.me/wp-content/uploads/2022/09/ft-logo.png', 'PNG');
    // vCard.workPhone = this.locationData.loc_whatsapp;
    // vCard.email = 'info.chikex@gmail.com'
    // vCard.url = 'https://chikex.me/';
    // vCard.saveToFile('./chikex.vcf');
  }
  locationFilter(outlet_name: string): void {
    this.locationData = this.location_list?.find(c => c.loc_name == outlet_name);
  }

  ngOnInit(): void {

  }

  viewOutletData(outletId: string): void {
    this.router.navigate(["/pages/review"], {
      queryParams: { id: outletId }
    }).then(() => {
      window.location.reload();
    });
  }

  async getLocationsForReview(): Promise<void> {
    this.location_list = [];
    let response = await this.restService.getLocationsForReview();
    if (response.success) {
      this.location_list = response.data;
    }
  }

  async getEmiratesList(): Promise<void> {
    let response = await this.restService.getEmirates();
    if (response.success) {
      this.emirates_list = response.data;
    }
  }

  async AndroidNativeShare(Title: any, URL: any, Description: any) {
    if (typeof navigator.share === 'undefined' || !navigator.share) {
      alert('Your browser does not support Android Native Share, it\'s tested on chrome 63+');
    } else if (window.location.protocol != 'https:') {
      alert('Android Native Share support only on Https:// protocol');
    } else {
      if (typeof URL === 'undefined') {
        URL = window.location.href;
      }
      if (typeof Title === 'undefined') {
        Title = document.title;
      }
      if (typeof Description === 'undefined') {
        Description = 'Share your thoughts about ' + Title;
      }
      const TitleConst = Title;
      const DescriptionConst = Description;
      const URLConst = URL;
      try {
        await navigator.share({ title: TitleConst, text: DescriptionConst, url: URLConst });
      } catch (error) {
        console.log('Error sharing: ' + error);
        return;
      }
    }
  }

  getEmirateName(emirate_id: string): string {
    return this.emirates_list.find((c: any) => c.code == emirate_id).name;
  }
  getCurrentUrl(): string {
    return window.location.hostname + "/" + this.location.path();
  }
}

export interface Ilocations {
  id: string;
  loc_name: string;
  loc_whatsapp: string;
  loc_map: string;
  google_review_link: string;
  emirate: string;
}

export interface IEmirates {
  id: string;
  code: string;
  name: string;
}

