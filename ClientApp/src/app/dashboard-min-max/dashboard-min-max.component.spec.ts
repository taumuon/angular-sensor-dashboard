import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMinMaxComponent } from './dashboard-min-max.component';

describe('DashboardMinMaxComponent', () => {
  let component: DashboardMinMaxComponent;
  let fixture: ComponentFixture<DashboardMinMaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMinMaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
