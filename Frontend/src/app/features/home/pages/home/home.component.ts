import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  features = [
    {
      icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
      title: 'Diseño 3D Interactivo',
      description: 'Configura tu estructura con el sistema Bloqueplas y visualízala en tiempo real desde cualquier ángulo.'
    },
    {
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      title: 'Cotización Automática',
      description: 'Calcula automáticamente la cantidad de bloques y el costo estimado según tu configuración.'
    },
    {
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      title: 'Gestión de Proyectos',
      description: 'Guarda y consulta el historial de tus proyectos y cotizaciones en cualquier momento.'
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Materiales Ecológicos',
      description: 'Fabricado con plástico recuperado. Reduce el impacto ambiental sin sacrificar resistencia ni calidad.'
    }
  ];

  steps = [
    {
      number: '01',
      title: 'Configura tu estructura',
      description: 'Define dimensiones, número de pisos (hasta 10), puertas y ventanas de tu construcción.'
    },
    {
      number: '02',
      title: 'Visualiza en 3D',
      description: 'Observa tu diseño en un visor tridimensional interactivo en tiempo real.'
    },
    {
      number: '03',
      title: 'Obtén tu cotización',
      description: 'Recibe automáticamente el cálculo de materiales Bloqueplas y el costo estimado.'
    }
  ];

  benefits = [
    { icon: '⚡', text: 'Instalación en 1 a 2 semanas' },
    { icon: '♻️', text: 'Fabricado con plástico recuperado' },
    { icon: '💰', text: 'Reducción significativa de costos' },
    { icon: '🏗️', text: 'Sistema modular liviano' },
    { icon: '🛡️', text: 'Sismoresistente' },
    { icon: '🌿', text: 'Alternativa sostenible' }
  ];

  tecnicas = [
    'Instalación sobre placa de concreto con acometidas de servicios públicos',
    'Sistema sismoresistente certificado',
    'El sistema constructivo puede ser hasta de 10 pisos',
    'Sin límite de diseño, tamaño de áreas o estilo',
    'Permite acabados: estuco, graniplast, marmoplast y otros',
    'Material resistente a la erosión y cambios climáticos',
    'Alta resistencia al fuego',
    'Inmune a plagas y microorganismos',
    'No requiere aditivos o pegamento',
    'No se deteriora al entrar en contacto con químicos',
    'Produce 12 millones de litros de agua ahorrados por casa',
    'Cada casa usa 4 toneladas de plástico recuperado'
  ];

  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    //this.router.navigate(['/register']);
  }
}
