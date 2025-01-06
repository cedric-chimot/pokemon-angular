import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexShinyComponent } from './pokedex-shiny.component';

describe('PokedexShinyComponent', () => {
  let component: PokedexShinyComponent;
  let fixture: ComponentFixture<PokedexShinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexShinyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
