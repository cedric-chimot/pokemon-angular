import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexKalosComponent } from './pokedex-kalos.component';

describe('PokedexKalosComponent', () => {
  let component: PokedexKalosComponent;
  let fixture: ComponentFixture<PokedexKalosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexKalosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexKalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
