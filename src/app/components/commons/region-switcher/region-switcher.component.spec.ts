import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSwitcherComponent } from './region-switcher.component';

describe('RegionSwitcherComponent', () => {
  let component: RegionSwitcherComponent;
  let fixture: ComponentFixture<RegionSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
