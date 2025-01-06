import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexNationalComponent } from './pokedex-national.component';

describe('PokedexNationalComponent', () => {
  let component: PokedexNationalComponent;
  let fixture: ComponentFixture<PokedexNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexNationalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
