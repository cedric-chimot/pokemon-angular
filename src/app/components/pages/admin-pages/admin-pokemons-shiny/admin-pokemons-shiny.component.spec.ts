import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPokemonsShinyComponent } from './admin-pokemons-shiny.component';

describe('AdminPokemonsShinyComponent', () => {
  let component: AdminPokemonsShinyComponent;
  let fixture: ComponentFixture<AdminPokemonsShinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPokemonsShinyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPokemonsShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
