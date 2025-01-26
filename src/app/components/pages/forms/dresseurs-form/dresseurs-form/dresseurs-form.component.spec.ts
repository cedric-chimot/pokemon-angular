import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DresseursFormComponent } from './dresseurs-form.component';

describe('DresseursFormComponent', () => {
  let component: DresseursFormComponent;
  let fixture: ComponentFixture<DresseursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DresseursFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DresseursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
