import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexAlolaComponent } from './pokedex-alola.component';

describe('PokedexAlolaComponent', () => {
  let component: PokedexAlolaComponent;
  let fixture: ComponentFixture<PokedexAlolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexAlolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexAlolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
