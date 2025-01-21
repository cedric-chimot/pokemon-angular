import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttaquesComponent } from './admin-attaques.component';

describe('AdminAttaquesComponent', () => {
  let component: AdminAttaquesComponent;
  let fixture: ComponentFixture<AdminAttaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAttaquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
