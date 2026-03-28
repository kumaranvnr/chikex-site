import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen-popup',
  templateUrl: './splash-screen-popup.component.html',
  styleUrls: ['./splash-screen-popup.component.scss']
})
export class SplashScreenPopupComponent {
  isVisible = true;
  adImages = [
    // '/assets/img/food-delivery/b2g2.png',
    // 'https://friedchicken.blob.core.windows.net/general/35aed.png',
    'https://friedchicken.blob.core.windows.net/general/ad_screen2.jpeg',
  ];
  currentImageIndex = 0;

  ngOnInit() {
    setTimeout(() => {
      this.closePopup();
    }, 30000);
    this.startImageRotation();
  }

  closePopup() {
    this.isVisible = false;
  }

  startImageRotation() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.adImages.length;
    }, 3000);
  }
}
