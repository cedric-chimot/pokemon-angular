import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinyFormComponent } from './shiny-form.component';

describe('ShinyFormComponent', () => {
  let component: ShinyFormComponent;
  let fixture: ComponentFixture<ShinyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShinyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShinyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
