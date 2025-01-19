import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPokedexComponent } from './admin-pokedex.component';

describe('AdminPokedexComponent', () => {
  let component: AdminPokedexComponent;
  let fixture: ComponentFixture<AdminPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPokedexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
