import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-single-topic',
  templateUrl: './help-single-topic.component.html',
  styleUrls: ['./help-single-topic.component.scss']
})

/**
 * Help Single Topic Component
 */
export class HelpSingleTopicComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Help center', link:'/pages/single-topic' },
      { label: 'Single topic', active: true, link:'/pages/single-topic' }
    ];
  }

}
