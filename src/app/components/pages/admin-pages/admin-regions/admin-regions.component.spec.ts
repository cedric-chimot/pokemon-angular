import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegionsComponent } from './admin-regions.component';

describe('AdminRegionsComponent', () => {
  let component: AdminRegionsComponent;
  let fixture: ComponentFixture<AdminRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRegionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
