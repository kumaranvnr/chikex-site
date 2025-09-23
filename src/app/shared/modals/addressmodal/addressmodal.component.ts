
import { HttpClient, } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared.service';

import { environment } from 'src/environments/environment';
import { NewaddressmodalComponent } from '../newaddressmodal/newaddressmodal.component';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SignmodalComponent } from '../signmodal/signmodal.component';

@Component({
  selector: 'app-addressmodal',
  templateUrl: './addressmodal.component.html',
  styleUrls: ['./addressmodal.component.scss']
})
export class AddressmodalComponent implements OnInit {

  map!: google.maps.Map;
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;

  searchTerm: string = '';
  searchResults: any[] = [];
  delivery_status: boolean = true;
  lat = 25.3608332804672;
  lng = 55.3965451784847;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  positionMarker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    clickable: false,
  });

  map_address: any;
  constructor(private cd: ChangeDetectorRef,
    private http: HttpClient,
    private sharedService: SharedService,
    private restService: HttpService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal) {
    this.centerOnCurrentLocation();
  }

  ngAfterViewInit() {
    this.initializeMap(true);
    this.cd.detectChanges();
  }

  ngOnInit(): void {

  }

  closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
  }
  confirmAdreess() {
    var sub = CookieStore.getUserInfo()?.sub;
    if (sub == "" || sub == undefined) {
      this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
      return;
    }

    if (this.delivery_status) {
      this.closemodal();
      this.modalService.open(NewaddressmodalComponent, { size: 'lg', centered: true });
    }
    else {
      Swal.fire({ text: "Delivery not available in your location", timer: 1500 });
    }
  }

  initializeMap(interactive: boolean) {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.coordinates,
      zoom: 12,
      minZoom: 12,
      maxZoom: 20,
      draggable: interactive,
      scrollwheel: interactive,
      disableDefaultUI: !interactive,
      zoomControl: interactive,
      streetViewControl: interactive,
      mapTypeControl: interactive,
      fullscreenControl: interactive,
      clickableIcons: true,
      headingInteractionEnabled: true,
    });
    this.positionMarker.setMap(this.map);
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.updateSelectedLocation(event.latLng);
    });
  }

  async updateSelectedLocation(latLng: google.maps.LatLng | null) {
    if (latLng) {

      const coordinate: any = {};
      coordinate.lat = latLng.lat();
      coordinate.long = latLng.lng();
      this.checkingDelivery(coordinate);

      this.positionMarker.setPosition(latLng);

    }
  }

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApiKey}`;

    try {
      const response = await this.http.get<any>(geocodeUrl).toPromise();
      if (response.status === 'OK' && response.results.length > 0) {
        return response.results[0]; // Return the first result's formatted address
      } else {
        throw new Error('No address found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error retrieving address:', error);
      return 'Unable to retrieve address'; // Fallback message
    }
  }

  centerOnCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentLocation = new google.maps.LatLng(lat, lng);
          this.map.setCenter(currentLocation);
          this.positionMarker.setPosition(currentLocation);

          const coordinate: any = {};
          coordinate.lat = lat;
          coordinate.long = lng;
          this.checkingDelivery(coordinate)
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


  async checkingDelivery(coordinate: any) {
    this.ngxService.start();
    const location_response = await this.restService.getNearbyLocationList(coordinate);
    if (location_response) {
      if (location_response.data.length > 0) {

        let address: any = await this.reverseGeocode(coordinate.lat, coordinate.long);
        this.map_address = address?.formatted_address;
        //   this.sharedService.setValue(address);
        CookieStore.saveDataAsync('address', address);
        CookieStore.saveDataAsync('location_data', location_response.data[0]);
        this.cd.detectChanges(); this.delivery_status = true;
      } else {
        this.ngxService.stop();
        Swal.fire({ text: "Delivery not available in your location", timer: 1500 });
        this.delivery_status = false;
      }
    } else {
      this.ngxService.stop();
      Swal.fire({ text: "Location not found", timer: 1500 });
      this.delivery_status = false;
    }
    this.ngxService.stop();
  }

}
