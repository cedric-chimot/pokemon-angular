import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexJohtoComponent } from './pokedex-johto.component';

describe('PokedexJohtoComponent', () => {
  let component: PokedexJohtoComponent;
  let fixture: ComponentFixture<PokedexJohtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexJohtoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexJohtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
