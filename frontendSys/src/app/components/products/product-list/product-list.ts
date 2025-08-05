import { Component, OnInit } from '@angular/core';
declare const Swal: any;
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product-service/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  addProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(product: any): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-accent)',
      cancelButtonColor: '#e57373',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(() => {
          this.loadProducts();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El producto fue eliminado',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }
}
