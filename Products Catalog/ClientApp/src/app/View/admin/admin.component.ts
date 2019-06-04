import {Component, OnInit} from '@angular/core';
import Product from '../../models/Product';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ProductsService} from "../../Shared/services/products.service";

declare const $;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  public productsList: Product[] = [];
  // the selected product from the table
  public selectedProduct: Product = new Product();
  // the copy of selected product for editing in form modal to avoid changes in the referenced object
  public selectedProductModalView: Product = new Product();
  // form object
  public editProductForm: FormGroup;

  // pagination
  public productsTablePageNumber: number = 1;
  public productsTablePageSize: number = 5;
  public productsPagesNumber: number = 1;
  public allProductsCount: number = 1;

  // modal hide and show flags
  public showProductPreviewModal: boolean = false;
  public showEditProductModal: boolean = false;

  // flag for edit modal to clear UI for new product entry
  public isAddNewProductView: boolean = false;
  // flag for select image button touching to display error message
  public imageBtnTouched: boolean = false;
  // flag for page loader
  public showLoader: boolean = true;
  public loaderMessage: string = '';

  public imageValueBytes: any;


  constructor(private productsService: ProductsService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.setLoaderMessage('Loading Product...');
    this.getProductsFromServer();
  }


  updateProductsCount(count) {
    this.allProductsCount = count;
    this.productsPagesNumber = Math.ceil(count / this.productsTablePageSize);
    console.log(this.productsPagesNumber);
  }


  // get products
  getProductsFromServer() {
    this.productsService.getProductsWithPagination(this.productsTablePageNumber, this.productsTablePageSize)
      .subscribe(res => {
        this.productsList = res.products;
        this.updateProductsCount(res.count);
        this.showLoader = false;
      }, err => this.showLoader = false);
  }

  // handle selection ot table product item
  selectTableRor(product: Product) {
    console.log(product.id);
    this.selectedProduct = Object.assign({}, product);
    this.selectedProductModalView = Object.assign({}, product);
    this.setIsAddNewProductViewState(false);
    this.setProductPreviewModalState(true);
  }

  // callback for handling pagination changes
  onPageChange(page: number) {
    console.log(page);
    this.productsTablePageNumber = page;
    this.getProductsFromServer();
  }

  // update flag
  setIsAddNewProductViewState(actionState: boolean) {
    this.isAddNewProductView = actionState;
  }

  // update flag
  setProductPreviewModalState(actionState: boolean) {
    this.showProductPreviewModal = actionState;
  }

  // update flag
  setProductEditModalState(actionState: boolean) {
    this.showEditProductModal = actionState;
    // if the flag is true initialize the form
    if (actionState)
      this.initEditForm();
  }

  setLoaderMessage(message) {
    this.loaderMessage = message;
  }

  // view product modal handle cancel action
  productPreviewModalActionDismissed(e) {
    console.log('dismissed');
    this.setProductPreviewModalState(false);
  }

  // view product modal handle approve action
  productPreviewModalActionApproved(e) {
    console.log('approved', e);
    if (e === 'edit') {
      this.setLoaderMessage('Submitting Product...');
      this.setProductEditModalState(true);
    } else if (e == 'delete') {
      console.log('delete');
    }
    this.setProductPreviewModalState(false);
  }

  // edit product modal handle cancel action
  editProductModalActionDismissed(e) {
    console.log('dismissed');
    this.setProductEditModalState(false);
  }

  // edit product modal handle approve action
  editProductModalActionApproved(e) {
    console.log('approve', e);
    this.submitEditForm();
    this.setProductEditModalState(false);

  }

  initEditForm() {
    if (!this.isAddNewProductView) {
      // initialize edit form
      this.editProductForm = this.fb.group({
        productName: new FormControl(this.selectedProductModalView.name, [Validators.required]),
        productDescription: new FormControl(this.selectedProductModalView.description),
        productPrice: new FormControl(this.selectedProductModalView.price,
          [Validators.required, Validators.min(1), Validators.max(999)]),
        productImage: new FormControl()
      });
    } else {
      // initialize empty form for new product
      this.editProductForm = this.fb.group({
        productName: new FormControl('', [Validators.required]),
        productDescription: new FormControl(''),
        productPrice: new FormControl(0,
          [Validators.required, Validators.min(1), Validators.max(999)]),
        productImage: new FormControl(null, [Validators.required])
      });
    }
    console.log(this.editProductForm);
  }

  selectImage() {
    // set image selection flag
    this.imageBtnTouched = true;
  }

  imageChange(e) {
    console.log(e.target.files);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageValueBytes = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // initializing add new product modal
  addNewProduct() {
    this.setIsAddNewProductViewState(true);
    this.initEditForm();
    this.setProductEditModalState(true);
  }

  // handle submit the form data
  submitEditForm() {
    let editFormObject: Product;


    if (!this.isAddNewProductView) {
      editFormObject = {
        name: this.editProductForm.controls['productName'].value ? this.editProductForm.controls['productName'].value : this.selectedProductModalView.name,
        description: this.editProductForm.controls['productDescription'].value ? this.editProductForm.controls['productDescription'].value : this.selectedProductModalView.description,
        price: this.editProductForm.controls['productPrice'].value ? this.editProductForm.controls['productPrice'].value : this.selectedProductModalView.price,
        image: this.imageValueBytes ? this.imageValueBytes : this.selectedProductModalView.image,
        id: this.selectedProductModalView.id,
        lastUpdated: (new Date()).toDateString(),
        boughtByCounter: this.selectedProductModalView.boughtByCounter
      };
    } else {
      editFormObject = {
        name: this.editProductForm.controls['productName'].value,
        description: this.editProductForm.controls['productDescription'].value,
        price: this.editProductForm.controls['productPrice'].value,
        image: this.imageValueBytes,
        id: this.selectedProductModalView.id,
        lastUpdated: (new Date()).toDateString(),
        boughtByCounter: this.selectedProductModalView.boughtByCounter
      };
    }
    console.log(editFormObject);
    this.sendProductToServer(editFormObject);
  }

  // send product object to server
  sendProductToServer(product: Product) {
    this.showLoader = true;
    if (!this.isAddNewProductView) {
      this.productsService.editProduct(product).subscribe(res => {
        // update existing product item
        const productIdx = this.productsList.indexOf(product);
        this.productsList[productIdx] = {...res};
        this.showLoader = false;
      }, err => this.showLoader = false);
    } else {
      this.productsService.addProduct(product).subscribe(res => {
        // update existing product item
        console.log(res);
        this.productsList.push(res);
        this.showLoader = false;
      }, err => this.showLoader = false);
    }
  }

}



