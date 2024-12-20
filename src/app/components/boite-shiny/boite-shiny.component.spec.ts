import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteShinyComponent } from './boite-shiny.component';

describe('BoiteShinyComponent', () => {
  let component: BoiteShinyComponent;
  let fixture: ComponentFixture<BoiteShinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteShinyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
