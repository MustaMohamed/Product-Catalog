import {Component, OnInit} from '@angular/core';
import Product from "../../models/Product";
import {ProductsService} from "../../Shared/services/products.service";

declare const $;

@Component({
  selector: 'market-component',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {


  public productsList: Product[] = [];

  // pagination
  public productsPageNumber: number = 1;
  public productsPageSize: number = 5;

  public showLoader: boolean = true;
  public searchLoading: boolean = false;

  constructor(private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductsFromServer();
  }


  // get products
  getProductsFromServer() {
    this.productsService.getAllProducts()
      .subscribe(res => {
        this.productsList = res;
        this.showLoader = false;
      }, err => this.showLoader = false);
  }

}
