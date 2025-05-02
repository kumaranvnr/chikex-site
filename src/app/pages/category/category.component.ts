import { Component, OnInit } from '@angular/core';
import { categories, Items } from './data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any;
  items: any;

  constructor() { }

  ngOnInit(): void {
    this.categories = categories
    this.items = Items
  }

// filter product
  selectcategory(title:any){
    this.items = Items.filter((item:any) => {
      return item.type == title
    })
  }

}
