import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorClientesComponent } from './asesor-clientes.component';

describe('AsesorClientesComponent', () => {
  let component: AsesorClientesComponent;
  let fixture: ComponentFixture<AsesorClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesorClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesorClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
