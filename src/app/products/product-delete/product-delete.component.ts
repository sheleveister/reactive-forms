import { Component, OnInit } from '@angular/core';
import { Product } from '../../products-service/product.model';
import { ProductService } from '../../products-service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: [
    './product-delete.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class ProductDeleteComponent implements OnInit {

  public currentProduct: Product;
  public errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.productService.getProduct(id)
        .subscribe(
          product => this.currentProduct = product,
          error => this.errorMessage = error
        );
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.currentProduct)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );
  }

  goBack() {
    this.router.navigate(['/products']);
  }

}
