import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitesPokedexFormComponent } from './boites-pokedex-form.component';

describe('BoitesPokedexFormComponent', () => {
  let component: BoitesPokedexFormComponent;
  let fixture: ComponentFixture<BoitesPokedexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoitesPokedexFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoitesPokedexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
