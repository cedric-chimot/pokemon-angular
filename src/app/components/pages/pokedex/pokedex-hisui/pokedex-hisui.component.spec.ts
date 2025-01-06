import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexHisuiComponent } from './pokedex-hisui.component';

describe('PokedexHisuiComponent', () => {
  let component: PokedexHisuiComponent;
  let fixture: ComponentFixture<PokedexHisuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexHisuiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexHisuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
