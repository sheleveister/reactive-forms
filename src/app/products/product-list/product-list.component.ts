import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../products-service/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class ProductListComponent implements OnInit {

  public title = 'Product List';
  public products: Product[];
  public errorMessage: string;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProductsList();
  }

  public getProductsList() {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => this.errorMessage = error
    );
  }

  public refreshList() {
    this.getProductsList();
  }

  public createProduct(product: Product) {
    this.router.navigate(['products', 'create']);
  }

  public editProduct(product: Product) {
    this.router.navigate(['products', 'edit', product.id]);
  }

  public deleteProduct(product: Product) {
    this.router.navigate(['products', 'delete', product.id]);
  }
}
