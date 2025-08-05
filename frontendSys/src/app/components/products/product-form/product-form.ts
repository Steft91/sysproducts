import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const Swal: any;
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
function noSpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
  // Permite letras, números, espacios, acentos y algunos signos básicos
  const valid = /^[\p{L}\p{N} .,'áéíóúÁÉÍÓÚüÜñÑ-]*$/u.test(control.value || '');
  return valid ? null : { specialChars: true };
}
import { ProductService, Product } from '../../../services/product-service/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = {};
  @Output() save = new EventEmitter<any>();
  form: FormGroup;
  productId?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), noSpecialCharsValidator]],
      description: ['', [noSpecialCharsValidator]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = +id;
        this.productService.getById(this.productId).subscribe(product => {
          this.form.patchValue(product);
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
    const product: Product = this.form.value;
    if (this.isEdit && this.productId) {
      this.productService.update(this.productId, product).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          timer: 1200,
          showConfirmButton: false
        });
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(product).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          timer: 1200,
          showConfirmButton: false
        });
        this.router.navigate(['/products']);
      });
    }
  }
}
