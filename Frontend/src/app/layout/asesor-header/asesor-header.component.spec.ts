import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorHeaderComponent } from './asesor-header.component';

describe('AsesorHeaderComponent', () => {
  let component: AsesorHeaderComponent;
  let fixture: ComponentFixture<AsesorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsesorHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
