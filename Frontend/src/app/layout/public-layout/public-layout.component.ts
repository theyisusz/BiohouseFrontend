import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../../features/home/pages/home/home.component';


@Component({
  selector: 'app-public-layout',
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent, HomeComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {

}
