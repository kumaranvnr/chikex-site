import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ticketData } from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { Router } from '@angular/router';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';

@Component({
  selector: 'app-account-tickets',
  templateUrl: './account-tickets.component.html',
  styleUrls: ['./account-tickets.component.scss']
})

/**
 * Account Tickets Component
 */
export class AccountTicketsComponent implements OnInit {
  fromDataResolver = FromDataResolver;
  tableData: any;
  public isCollapsed = true;
  // Form Submit
  ticketform!: UntypedFormGroup;
  submitted = false;
  tickets: any = '';
  picture: string = '';
  name: string = '';
  email: string = '';
  constructor(private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private restService: HttpService,
    public datePipe: DatePipe) {
    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;

    this.getUserSubmittedTickets();
    this.tableData = ticketData;
  }

  async getUserSubmittedTickets(): Promise<void> {
    ticketData.splice(0);
    let account_id = CookieStore.getUserInfo()?.sub;
    let response = await this.restService.getUserSubmittedTickets(account_id);
    if (response) {
      response.data.forEach((element: any) => {
        ticketData.push(element)
      });
    }

  }

  ngOnInit(): void {


    /**
     * Form Validation
     */
    this.ticketform = this.formBuilder.group({
      subject: ['', [Validators.required]],
      ticket_type: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      issue: ['', [Validators.required]],
      attachement: [''],
    });
  }
  SignOut() {
    this.restService.UserSignOut()
  }
  /**
   * Open Modal
   * @param sizeChartModal scroll modal data
   */
  OpenModal(sizeChartModal: any) {
    this.modalService.open(sizeChartModal, { size: 'lg', centered: true });
  }

  get form() {
    return this.ticketform.controls;
  }

  /**
   * Save user
   */
  async saveUser(): Promise<void> {
    if (this.ticketform.valid) {
      let obj = {
        account_id: CookieStore.getUserInfo()?.sub,
        subject: this.ticketform.get('subject')?.value,
        ticket_type: this.ticketform.get('ticket_type')?.value,
        priority: this.ticketform.get('priority')?.value,
        issue: this.ticketform.get('issue')?.value,
        attachement: this.ticketform.get('attachement')?.value,
        status: 'Open'
      }
      let response = await this.restService.saveUserTicket(obj);
      if (response) {
        this.modalService.dismissAll();
        this.ticketform.reset();
      }
    }
    this.submitted = true;
  }

  // Tickets sort filter
  ticketFilter() {
    if (this.tickets != '') {
      this.tableData = ticketData.filter((product: any) => {
        return product.status === this.tickets;
      });
    }
    else {
      this.tableData = ticketData;
    }

  }

  closeModal() {
    this.modalService.dismissAll();
    this.ticketform.reset();
  }

}

export interface ITickets {
  _id: string;
  id: string;

  account_id: string;
  subject: string;
  ticket_type: string;
  priority: string;
  issue: string;
  attachement: string;

  status: string;
  status_change_by: string;

  // db defaults
  migration_flag: string;
  createdAt: Date;
  updatedAt: Date;
  __ref: string;
}