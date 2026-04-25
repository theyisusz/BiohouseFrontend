import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorCotizacionesComponent } from './asesor-cotizaciones.component';

describe('AsesorCotizacionesComponent', () => {
  let component: AsesorCotizacionesComponent;
  let fixture: ComponentFixture<AsesorCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesorCotizacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesorCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
