import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../../../../layout/client-header/client-header.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { Details } from '../../../../layout/details/details';
import { InfoTools } from '../../../../layout/info-tools/info-tools';

@Component({
  selector: 'app-page-welcome',
  standalone: true,
  imports: [ClientHeaderComponent, FooterComponent, Details, InfoTools],
  templateUrl: './page-welcome.html',
  styleUrl: './page-welcome.css',
})
export class PageWelcome {}
