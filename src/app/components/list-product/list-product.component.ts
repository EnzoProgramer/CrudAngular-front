import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  listProducts?: Product[];

  constructor(
    private _ProductService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtainProducts();
  }

  obtainProducts() {
    this._ProductService.getProducts().subscribe(data => {
      console.log(data);

      this.listProducts = data;
    }, error => {
      console.log(error)
    });
  }

  deleteProduct(id: any) {
    this._ProductService.deleteProducts(id).subscribe(data => {
      this.toastr.error('product was successfully removed', 'Product eliminated')
      this.obtainProducts();
    }, error => {
      console.log(error)
    })
  }

}
