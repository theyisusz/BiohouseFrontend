
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ClientHeaderComponent } from '../client-header/client-header.component';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, ClientHeaderComponent, FooterComponent,RouterModule],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
})
export class ClientLayoutComponent {

  

}
