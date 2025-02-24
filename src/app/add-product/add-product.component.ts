import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../service/products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  productForm!: FormGroup;
  loading: boolean =  true;
  productId: string | null = null;
  isEdit: boolean = false;
  modalMessage:string = '';
  showModal:boolean = false;
  showAcceptCancel:boolean = false;


  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addProduct();

    this.productForm.get('date_revision')?.valueChanges.subscribe(value => {
      const dateReleaseControl = this.productForm.get('date_release');
      const dateRevision = new Date(value);
      const dateRelease = new Date(dateRevision.setFullYear(dateRevision.getFullYear() + 1));
      dateReleaseControl?.setValue(dateRelease.toISOString().split('T')[0], { emitEvent: false });
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId){
        this.isEdit = true;
        this.loadProductDetails(this.productId);
      }
    })
  }

  loadProductDetails(id: string) {
    this.productService.getProducts(id).subscribe(
      (product: any) => {
        this.productForm.patchValue(product);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addProduct() {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', [Validators.required, this.dateRevisionValidator]]
    });
  }

  dateRevisionValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate >= currentDate ? null : { invalidDate: true };
  }

  validateProductId(target: any){
    if(target.value !== null && target.value !== '' && !this.isEdit){
      this.productService.verifyProduct(target.value).subscribe(
        (response: any) => {
          if(response){
            this.productForm.get('id')?.setErrors({ invalidId: true });
          }
        }
      );
    }
  }

  openModal(message: string, showAcceptCancel: boolean = false) {
    this.modalMessage = message;
    this.showAcceptCancel = showAcceptCancel;
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

  acceptModal(){
    console.log('accept');
    this.closeModal();
  }

  cancelModal(){
    console.log('cancel');
    this.closeModal();
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.isEdit) {
        this.productService.updateProduct(this.productForm.value, this.productId).subscribe(
          (response: any) => {
            console.log(response);
            this.openModal(response.message);
          },
          (error: any) => {
            console.error(error);
          }
        );
      } else {
        this.productService.addProduct(this.productForm.value).subscribe(
          (response: any) => {
            console.log(response);
            this.openModal(response.message);
            this.productForm.reset();
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    }
  }

}
