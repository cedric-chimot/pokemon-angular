import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitesShinyFormComponent } from './boites-shiny-form.component';

describe('BoitesShinyFormComponent', () => {
  let component: BoitesShinyFormComponent;
  let fixture: ComponentFixture<BoitesShinyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoitesShinyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoitesShinyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
