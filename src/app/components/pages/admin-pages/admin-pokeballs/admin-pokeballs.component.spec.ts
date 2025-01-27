import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPokeballsComponent } from './admin-pokeballs.component';

describe('AdminPokeballsComponent', () => {
  let component: AdminPokeballsComponent;
  let fixture: ComponentFixture<AdminPokeballsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPokeballsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPokeballsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
