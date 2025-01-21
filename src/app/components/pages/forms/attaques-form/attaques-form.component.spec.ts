import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttaquesFormComponent } from './attaques-form.component';

describe('AttaquesFormComponent', () => {
  let component: AttaquesFormComponent;
  let fixture: ComponentFixture<AttaquesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttaquesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttaquesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
