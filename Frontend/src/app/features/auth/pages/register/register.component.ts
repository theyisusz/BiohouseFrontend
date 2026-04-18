import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

import colombiaData from '../../../../../assets/colombia.json';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  rolSeleccionado: 'CLIENTE'  | null = null;
  
  departments: string[] = [];
  cities: string[] = [];

  colombiaData: any[] = colombiaData;

  constructor(private fb: FormBuilder, private router: Router) {
    this.departments = this.colombiaData.map(d => d.departamento);
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-]{8,15}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: passwordMatchValidator });
  }

  get nombre() { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get telefono() { return this.registerForm.get('telefono'); }
  get correo() { return this.registerForm.get('correo'); }
  get departamento() { return this.registerForm.get('departamento'); }
  get municipio() { return this.registerForm.get('municipio'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }

  onDepartmentChange(): void {
    const selectedDept = this.registerForm.get('departamento')?.value;
    const deptInfo = this.colombiaData.find((d: any) => d.departamento === selectedDept);
    this.cities = deptInfo ? deptInfo.ciudades : [];
    this.registerForm.get('municipio')?.setValue('');
  }

  goToLogin() { this.router.navigate(['/login']); }
  selectRol(rol: 'CLIENTE'): void {
    this.rolSeleccionado = rol;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const data = {
    ...this.registerForm.value,
    rol: this.rolSeleccionado
  };

  console.log('Datos de registro:', data);
    console.log('Registro:', this.registerForm.value);
    // aquí irá la llamada al microservicio de auth
  }
}