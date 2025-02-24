import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddProductComponent} from './add-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {ProductsService} from "../service/products.service";

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    productServiceMock = {
      verifyProduct: jest.fn().mockReturnValue(of(false)),
      addProduct: jest.fn().mockReturnValue(of({message: 'Product added successfully'})),
      updateProduct: jest.fn().mockReturnValue(of({message: 'Product updated successfully'}))
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.productForm.value;
    expect(formValues).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
  });

  it('should validate product ID', () => {
    const target = { value: '123' };
    expect(productServiceMock.verifyProduct).toHaveBeenCalledWith('123');
  });

  it('should open modal with message', () => {
    component.openModal('Test message');
    expect(component.modalMessage).toBe('Test message');
    expect(component.showModal).toBe(true);
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should submit form and add product', () => {
    component.productForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2023-10-10',
      date_revision: '2023-10-11'
    });

    component.onSubmit();
    expect(productServiceMock.addProduct).toHaveBeenCalledWith(component.productForm.value);
  });

  it('should submit form and update product', () => {
    component.isEdit = true;
    component.productId = '123';
    component.productForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2023-10-10',
      date_revision: '2023-10-11'
    });

    component.onSubmit();
    expect(productServiceMock.updateProduct).toHaveBeenCalledWith(component.productForm.value, '123');
  });

});
