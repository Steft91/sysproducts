import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const Swal: any;
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
function noSpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
  // Permite letras, números, espacios, acentos y algunos signos básicos
  const valid = /^[\p{L}\p{N} .,'áéíóúÁÉÍÓÚüÜñÑ-]*$/u.test(control.value || '');
  return valid ? null : { specialChars: true };
}
import { CategoryService, Category } from '../../../services/category-service/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  categoryId?: number;
  isEdit = false;
  createdAt?: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), noSpecialCharsValidator]],
      description: ['', [noSpecialCharsValidator]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.categoryId = +id;
        this.categoryService.getById(this.categoryId).subscribe(category => {
          this.form.patchValue(category);
          this.createdAt = category.createdAt;
        });
      }
    });
  }

  submit(): void {
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, corrige los errores antes de guardar.'
      });
      return;
    }
    const category: Category = this.form.value;
    if (this.isEdit && this.categoryId) {
      this.categoryService.update(this.categoryId, category).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Categoría actualizada',
          timer: 1200,
          showConfirmButton: false
        });
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoryService.create(category).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          timer: 1200,
          showConfirmButton: false
        });
        this.router.navigate(['/categories']);
      });
    }
  }
}
