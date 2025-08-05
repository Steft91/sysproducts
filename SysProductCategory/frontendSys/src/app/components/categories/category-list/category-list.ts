import { Component, OnInit } from '@angular/core';
declare const Swal: any;
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category-service/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  addCategory(): void {
    this.router.navigate(['/categories/new']);
  }

  editCategory(category: any): void {
    this.router.navigate(['/categories/edit', category.id]);
  }

  deleteCategory(id: number): void {
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
        this.categoryService.delete(id).subscribe(() => {
          this.loadCategories();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'La categoría fue eliminada',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }
}
