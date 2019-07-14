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
  public productsPageSize: number = 8;
  public productsPagesNumber: number = 1;
  public allProductsCount: number = 1;

  public showLoader: boolean = true;
  public searchLoading: boolean = false;

  constructor(private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductsFromServer();
  }

  onPageChange(page) {
    this.productsPageNumber = page;
    this.getProductsFromServer();
  }

  searchForProduct(productName) {
    this.showLoader = true;
    this.searchLoading = true;
    console.log(productName);
    if (productName === '') {
      this.getProductsFromServer();
      this.showLoader = false;
      this.searchLoading = false;
    } else {
      this.productsService.searchForProduct(productName, this.productsPageNumber, this.productsPageSize)
        .subscribe(res => {
          console.log(res);
          this.productsList = res.products;
          this.updateProductsCount(res.count);
          this.showLoader = false;
          this.searchLoading = false;
        }, err => this.showLoader = false);
    }
  }

  updateProductsCount(count) {
    this.allProductsCount = count;
    this.productsPagesNumber = Math.ceil(count / this.productsPageSize);
  }

  // get products
  getProductsFromServer() {
    this.productsService.getProductsWithPagination(this.productsPageNumber, this.productsPageSize)
      .subscribe(res => {
        console.log(res);
        this.productsList = res.products;
        this.updateProductsCount(res.count);
        this.showLoader = false;
      }, err => this.showLoader = false);
  }

}
