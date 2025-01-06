import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexKantoComponent } from './pokedex-kanto.component';

describe('PokedexKantoComponent', () => {
  let component: PokedexKantoComponent;
  let fixture: ComponentFixture<PokedexKantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexKantoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexKantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
