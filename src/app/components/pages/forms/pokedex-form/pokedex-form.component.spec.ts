import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexFormComponent } from './pokedex-form.component';

describe('PokedexFormComponent', () => {
  let component: PokedexFormComponent;
  let fixture: ComponentFixture<PokedexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
