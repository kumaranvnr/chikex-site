
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
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    private ngxService: NgxUiLoaderService,
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
      this.getDataFromCookies();

    }
    catch (error) {
      console.error(error);
    }
  }

  async getDataFromCookies(): Promise<void> {
    const edit_address = await CookieStore.getDataAsync('edit_address')
    if (edit_address) {
      this.formData.controls['_id'].setValue(edit_address?._id);
      this.formData.controls['name'].setValue(edit_address?.name);
      this.formData.controls['mobile'].setValue(edit_address?.mobile);
      this.formData.controls['streetAddress'].setValue(edit_address?.streetAddress);
      this.formData.controls['flat'].setValue(edit_address?.flat);
      this.formData.controls['building'].setValue(edit_address?.building);
      this.formData.controls['city'].setValue(edit_address?.city);
      this.formData.controls['landmark'].setValue(edit_address?.landmark);
      this.formData.controls['countryName'].setValue(edit_address?.countryName);
      this.formData.controls['region'].setValue(edit_address?.region);
      this.formData.controls['distance'].setValue(edit_address?.distance);
      this.formData.controls['nearbyStore'].setValue(edit_address?.nearbyStore);
      this.formData.controls['lat'].setValue(edit_address?.lat);
      this.formData.controls['lng'].setValue(edit_address?.lng);
      this.formData.controls['locationType'].setValue(edit_address?.locationType);
      this.formData.controls['primary'].setValue(edit_address?.primary);
    }

    const address = await CookieStore.getDataAsync('address');
    if (address) {
      this.address_information = address;
      var city = address?.address_components.find((component: any) => component.types.includes('locality'))?.long_name;
      var countryName = address?.address_components.find((component: any) => component.types.includes('country'))?.long_name;
      this.formData.controls['primary'].setValue(true);
      this.formData.controls['streetAddress'].setValue(address?.formatted_address);

      this.formData.controls['countryName'].setValue(countryName);
      this.formData.controls['region'].setValue(city);
      this.formData.controls['city'].setValue(city);

      this.formData.controls['lat'].setValue(this.address_information?.geometry.location.lat);
      this.formData.controls['lng'].setValue(this.address_information?.geometry.location.lng);
      this.lat = this.address_information?.geometry.location.lat;
      this.lng = this.address_information?.geometry.location.lng

    }

    const location_data = await CookieStore.getDataAsync('location_data')
    if (location_data) {
      this.formData.controls['nearbyStore'].setValue(location_data?.code);
      this.formData.controls['distance'].setValue(location_data?.distance);
    }

  }

  edit_map_address() {
    // CookieStore.clearDataAsync('edit_address');
    // CookieStore.clearDataAsync('location_data');
    // CookieStore.clearDataAsync('address');

    this.modalService.dismissAll();
    this.modalService.open(AddressmodalComponent, { size: 'lg', backdrop: 'static' });
  }

  async saveAddress(): Promise<void> {
    this.ngxService.start();
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
    this.ngxService.stop();
    if (useraddress_response?.success) {
      this.closemodal();
      this.modalService.open(AddresslistmodalComponent, { size: 'lg', centered: true });
    }
  }

  get form() {
    return this.formData.controls;
  }

}
