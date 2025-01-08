import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPokedexComponent } from './stats-pokedex.component';

describe('StatsPokedexComponent', () => {
  let component: StatsPokedexComponent;
  let fixture: ComponentFixture<StatsPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsPokedexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
