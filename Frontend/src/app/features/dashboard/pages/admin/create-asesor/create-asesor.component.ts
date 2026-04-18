import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AsesorService, Asesor } from '../../../../../core/services/asesor.service';
import { CommonModule } from '@angular/common';
import colombiaRaw from '../../../../../../assets/colombia.json'; // ← renombrado

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-create-asesor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-asesor.component.html',
  styleUrl: './create-asesor.component.css'
})
export class CreateAsesorComponent {

  createAsesorForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  departments: string[] = [];
  cities: string[] = [];
  colombiaData: any[] = colombiaRaw; // ← ahora SÍ usa el JSON

  constructor(private fb: FormBuilder, private router: Router, private asesorService: AsesorService) {
    this.departments = this.colombiaData.map(d => d.departamento); // ← igual que register
    this.createAsesorForm = this.fb.group({
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

  get nombre() { return this.createAsesorForm.get('nombre'); }
  get apellido() { return this.createAsesorForm.get('apellido'); }
  get telefono() { return this.createAsesorForm.get('telefono'); }
  get correo() { return this.createAsesorForm.get('correo'); }
  get departamento() { return this.createAsesorForm.get('departamento'); }
  get municipio() { return this.createAsesorForm.get('municipio'); }
  get password() { return this.createAsesorForm.get('password'); }
  get confirmPassword() { return this.createAsesorForm.get('confirmPassword'); }
  get terms() { return this.createAsesorForm.get('terms'); }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }

  onDepartmentChange(): void {
    const selectedDept = this.createAsesorForm.get('departamento')?.value;
    const deptInfo = this.colombiaData.find((d: any) => d.departamento === selectedDept); // ← igual que register
    this.cities = deptInfo ? deptInfo.ciudades : [];
    this.createAsesorForm.get('municipio')?.setValue('');
  }

  goBack() { this.router.navigate(['/admin/asesores']); }

  onSubmit() {
    if (this.createAsesorForm.invalid) {
      this.createAsesorForm.markAllAsTouched();
      return;
    }

    const formValue = this.createAsesorForm.value;

    const nuevoAsesor: Asesor = {
      id: 0,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      telefono: formValue.telefono,
      correo: formValue.correo,
      departamento: formValue.departamento,
      municipio: formValue.municipio,
      estado: 'activo',
      clientes: []
    };

    this.asesorService.addAsesor(nuevoAsesor);
    console.log('Nuevo asesor creado:', nuevoAsesor);
    this.goBack();
  }
}