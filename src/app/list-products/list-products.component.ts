import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements  OnInit
{
  products: any = [];
  filteredProducts: any = [];
  isLoading: boolean = true;
  modalMessage:string = '';
  showModal:boolean = false;
  showAcceptCancel:boolean = false;
  idToDelete: string = '';
  openMenuId: string | null = null;
  numberResults: number = 5;
  dataLength: number = 0;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.productsService.getProducts().subscribe((response: any) => {
        this.products = response.data;
        this.isLoading = false;
        this.updateFilteredProducts();
      });
    }, 2000);
  }

  updateFilteredProducts() {
    this.filteredProducts = this.products.slice(0, this.numberResults);
    this.dataLength = this.filteredProducts.length;
  }

  onNumberResultsChange(target: any) {
    this.numberResults = parseInt(target.value);
    this.updateFilteredProducts();
    this.dataLength = this.filteredProducts.length;
  }

  askDelete(name: string, id: string){
    this.openModal('¿Está seguro de eliminar el producto '+ name + '?', true);
    this.idToDelete = id;
  }

  deleteProduct(id: any) {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.productsService.getProducts().subscribe((data: any) => {
        this.filteredProducts = data.data;
        this.products = data.data;
        this.dataLength = this.filteredProducts.length;
      });
    });
  }

  editProduct(id: any) {
    this.router.navigate(['/editar', id]);
  }

  openModal(message: string, showAcceptCancel: boolean = false) {
    this.modalMessage = message;
    this.showAcceptCancel = showAcceptCancel;
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
    this.idToDelete = '';
  }

  acceptModal(){
    console.log('accept');
    this.deleteProduct(this.idToDelete);
    this.closeModal();
    this.idToDelete = '';
  }

  cancelModal(){
    console.log('cancel');
    this.closeModal();
    this.idToDelete = '';
  }

  toggleMenu(id: string) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  isMenuOpen(id: string): boolean {
    return this.openMenuId === id;
  }

  onSearch(target: any){
    let searchTerm = target.value.toLowerCase();

    if(searchTerm !== '') {
      this.filteredProducts = this.products.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.id.toLowerCase().includes(searchTerm)
      ).slice(0, this.numberResults);
    } else {
      this.updateFilteredProducts();
    }
    this.dataLength = this.filteredProducts.length;
  }

}
