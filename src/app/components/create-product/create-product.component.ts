import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  title: string = 'Create Product';
  id!: string | null;
  btn!: 'Add';
  productForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _ProductService: ProductService,
    private _actRoute: ActivatedRoute
  ) {

    this.productForm = new FormGroup({
      product: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

    this._actRoute.params.subscribe(dataId => {
      this.id = dataId['_id']
    })
  }

  ngOnInit(): void {
    this.edit();
  }

  createProduct() {
    //console.warn(this.productForm.value)

    const product: Product = {
      product: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value
    }

    if (this.id != null) {
      this._ProductService.updateProduct(this.id, product).subscribe(data => {
        this.toastr.info('Correctly updated product!', 'Updated procuct!');
        this.router.navigate(['/'])
      }, error => {
        console.log(error)
        this.productForm.reset();
      })
    } else {
      this._ProductService.saveProducts(product).subscribe(data => {
        this.toastr.success('Product was successfully added!', 'Added product !');
        this.router.navigate(['/'])
      }, error => {
        console.log(error)
        this.productForm.reset();
      })
    }

  }

  edit() {
    if (this.id != null) {
      this.title = 'Edit Product'
      this._ProductService.consultProduct(this.id).subscribe(data => {
        this.productForm.setValue({
          product: data.product,
          category: data.category,
          description: data.description,
          price: data.price
        })
      })
    }
  }

}
