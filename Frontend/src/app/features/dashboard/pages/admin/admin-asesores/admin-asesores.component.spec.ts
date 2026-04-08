import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsesoresComponent } from './admin-asesores.component';

describe('AdminAsesoresComponent', () => {
  let component: AdminAsesoresComponent;
  let fixture: ComponentFixture<AdminAsesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAsesoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAsesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
