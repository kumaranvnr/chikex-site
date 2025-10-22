import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  @Input() phoneNumber: string = '971507230280';
  @Input() message: string = 'Hello! I would like to know more about Chikex menu and services.';
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';

  openWhatsApp(): void {
    const encodedMessage = encodeURIComponent(this.message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
