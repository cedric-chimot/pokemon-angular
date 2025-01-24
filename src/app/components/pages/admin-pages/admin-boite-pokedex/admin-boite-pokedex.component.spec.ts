import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoitePokedexComponent } from './admin-boite-pokedex.component';

describe('AdminBoitePokedexComponent', () => {
  let component: AdminBoitePokedexComponent;
  let fixture: ComponentFixture<AdminBoitePokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoitePokedexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoitePokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
