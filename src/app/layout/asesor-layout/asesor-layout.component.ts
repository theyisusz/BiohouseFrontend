import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsesorHeaderComponent } from '../asesor-header/asesor-header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-asesor-layout',
  imports: [RouterModule, AsesorHeaderComponent, FooterComponent],
  templateUrl: './asesor-layout.component.html',
  styleUrl: './asesor-layout.component.css'
})
export class AsesorLayoutComponent {}