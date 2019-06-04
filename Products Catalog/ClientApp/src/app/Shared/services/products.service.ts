import {Inject, Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Product from "../../models/Product";
import ProductsResponse from "../../models/ProductsResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {

  private productControl: string = 'Products';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  getAllProducts(): Observable<ProductsResponse> {
    return this.getAllData(`${this.productControl}/all`);
  }

  getProductsWithPagination(pageNumber, pageCount): Observable<ProductsResponse> {
    return this.getData(`${this.productControl}/WithPagination?pageNumber=${pageNumber}&&pageSize=${pageCount}`)
  }

  getProduct(productId): Observable<Product> {
    return this.getData(`${this.productControl}/${productId}`)
  }

  addProduct(product): Observable<Product> {
    return this.postData(`${this.productControl}/add`, product);
  }

  deleteProduct(productId) {
    return this.deleteData(`${this.productControl}/${productId}`);
  }

  editProduct(product): Observable<Product> {
    return this.putData(this.productControl, product);
  }

}
