import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreciosComponent } from './admin-precios.component';

describe('AdminPreciosComponent', () => {
  let component: AdminPreciosComponent;
  let fixture: ComponentFixture<AdminPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPreciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
