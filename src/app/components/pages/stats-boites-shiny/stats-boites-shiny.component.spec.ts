import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBoitesComponent } from './stats-boites-shiny.component';

describe('StatsComponent', () => {
  let component: StatsBoitesComponent;
  let fixture: ComponentFixture<StatsBoitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsBoitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsBoitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
