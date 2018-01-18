import { Component, OnInit } from '@angular/core';
import { Product } from '../../products-service/product.model';
import { ProductService } from '../../products-service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: [
    './product-create-edit.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class ProductCreateEditComponent implements OnInit {

  public currentProduct: Product;
  public errorMessage: string;
  public formGroup: FormGroup;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getProductFromRoute();
  }

  public checkError(element: string, errorType: string) {
    return this.formGroup.get(element).hasError(errorType) &&
      this.formGroup.get(element).touched;
  }

  public onSubmit() {
    this.currentProduct.name = this.formGroup.value.name;
    this.currentProduct.price = this.formGroup.value.price;

    if (this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct)
        .subscribe(
          () => this.goBack(),
          (error) => this.errorMessage = error
        );
    } else {
      this.productService.addProduct(this.currentProduct)
        .subscribe(
          () => this.goBack(),
          (error) => this.errorMessage = error
        );
    }
  }

  public goBack() {
    this.router.navigate(['/products']);
  }

  private getProductFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.productService.getProduct(id).subscribe(
          (product) => {
            this.currentProduct = product;
            this.formGroup.patchValue(this.currentProduct);
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      } else {
        this.currentProduct = new Product(null, null, null);
        this.formGroup.patchValue(this.currentProduct);
      }
    });
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

}
