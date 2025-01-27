import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSexesComponent } from './admin-sexes.component';

describe('AdminSexesComponent', () => {
  let component: AdminSexesComponent;
  let fixture: ComponentFixture<AdminSexesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSexesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
