import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNaturesComponent } from './admin-natures.component';

describe('AdminNaturesComponent', () => {
  let component: AdminNaturesComponent;
  let fixture: ComponentFixture<AdminNaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
