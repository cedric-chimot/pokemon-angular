import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGeneralesComponent } from './stats-generales.component';

describe('StatsGeneralesComponent', () => {
  let component: StatsGeneralesComponent;
  let fixture: ComponentFixture<StatsGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsGeneralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
