
import { HttpClient, } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, OnDestroy, } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';
import { AddressmodalComponent } from '../addressmodal/addressmodal.component';
import { AddresslistmodalComponent } from '../addresslistmodal/addresslistmodal.component';

@Component({
  selector: 'app-newaddressmodal',
  templateUrl: './newaddressmodal.component.html',
  styleUrls: ['./newaddressmodal.component.scss']
})
export class NewaddressmodalComponent implements OnInit {

  formData!: UntypedFormGroup;
  submitted = false;
  map_address: any;
  address_information: any;
  lat: any; lng: any;

  constructor(private cd: ChangeDetectorRef, public formBuilder: UntypedFormBuilder,
    private restService: HttpService,
    private sharedService: SharedService,
    private http: HttpClient, private modalService: NgbModal) {

    this.formData = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      flat: ['', [Validators.required]],
      building: ['', [Validators.required]],
      city: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      countryName: [''],
      region: [''],
      distance: [''],
      nearbyStore: [''],
      lat: [''],
      lng: [''],
      locationType: [''],
      primary: [false],
    });
  }

  closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    try {
      CookieStore.getDataAsync('address').then(data => {
        this.address_information = data;
        var city = data?.address_components.find((component: any) => component.types.includes('locality'))?.long_name;
        var countryName = data?.address_components.find((component: any) => component.types.includes('country'))?.long_name;
        this.formData.controls['primary'].setValue(true);
        this.formData.controls['streetAddress'].setValue(data?.formatted_address);

        this.formData.controls['countryName'].setValue(countryName);
        this.formData.controls['region'].setValue(city);
        this.formData.controls['city'].setValue(city);

        this.formData.controls['lat'].setValue(this.address_information?.geometry.location.lat);
        this.formData.controls['lng'].setValue(this.address_information?.geometry.location.lng);
        this.lat = this.address_information?.geometry.location.lat;
        this.lng = this.address_information?.geometry.location.lng
      });
      CookieStore.getDataAsync('location_data').then(data => {
        this.formData.controls['nearbyStore'].setValue(data?.code);
        this.formData.controls['distance'].setValue(data?.distance);
      });

      CookieStore.getDataAsync('edit_address').then(data => {
        if (data) {
          this.formData.controls['_id'].setValue(data?._id);
          this.formData.controls['name'].setValue(data?.name);
          this.formData.controls['mobile'].setValue(data?.mobile);
          this.formData.controls['streetAddress'].setValue(data?.streetAddress);
          this.formData.controls['flat'].setValue(data?.flat);
          this.formData.controls['building'].setValue(data?.building);
          this.formData.controls['city'].setValue(data?.city);
          this.formData.controls['landmark'].setValue(data?.landmark);
          this.formData.controls['countryName'].setValue(data?.countryName);
          this.formData.controls['region'].setValue(data?.region);
          this.formData.controls['distance'].setValue(data?.distance);
          this.formData.controls['nearbyStore'].setValue(data?.nearbyStore);
          this.formData.controls['lat'].setValue(data?.lat);
          this.formData.controls['lng'].setValue(data?.lng);
          this.formData.controls['locationType'].setValue(data?.locationType);
          this.formData.controls['primary'].setValue(data?.primary);
        }

      });

    }
    catch (error) {
      console.error(error);
    }
  }

  edit_map_address() {
    this.modalService.dismissAll();
    this.modalService.open(AddressmodalComponent, { size: 'lg', backdrop: 'static' });
  }

  async saveAddress(): Promise<void> {
    this.submitted = true;
    let addressData = this.formData.value;

    var sub = CookieStore.getUserInfo()?.sub;
    let obj = {
      _id: addressData._id,
      sub: sub,
      name: addressData.name,
      mobile: addressData.mobile,
      streetAddress: addressData.streetAddress,
      flat: addressData.flat,
      building: addressData.building,
      city: addressData.city,
      landmark: addressData.landmark,

      countryName: addressData.countryName,
      region: addressData.countryName,
      distance: addressData.distance,
      nearbyStore: addressData.nearbyStore,
      lat: addressData.lat,
      lng: addressData.lng,
      locationType: addressData.locationType,
      primary: addressData.primary,
    }

    const useraddress_response = await this.restService.saveAddress(obj);
    if (useraddress_response?.success) {
      this.closemodal();
      this.modalService.open(AddresslistmodalComponent, { size: 'lg', centered: true });
    }
  }

  get form() {
    return this.formData.controls;
  }

}
