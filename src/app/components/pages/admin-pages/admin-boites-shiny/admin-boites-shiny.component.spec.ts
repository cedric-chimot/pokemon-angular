import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoitesShinyComponent } from './admin-boites-shiny.component';

describe('AdminBoitesShinyComponent', () => {
  let component: AdminBoitesShinyComponent;
  let fixture: ComponentFixture<AdminBoitesShinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoitesShinyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoitesShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
