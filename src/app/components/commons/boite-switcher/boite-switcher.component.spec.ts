import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteSwitcherComponent } from './boite-switcher.component';

describe('BoiteSwitcherComponent', () => {
  let component: BoiteSwitcherComponent;
  let fixture: ComponentFixture<BoiteSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
