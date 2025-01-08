import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSwitcherComponent } from './stat-switcher.component';

describe('StatSwitcherComponent', () => {
  let component: StatSwitcherComponent;
  let fixture: ComponentFixture<StatSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
