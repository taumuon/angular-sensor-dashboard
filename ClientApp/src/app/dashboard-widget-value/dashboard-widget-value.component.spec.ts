import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetValueComponent } from './dashboard-widget-value.component';

describe('DashboardWidgetValueComponent', () => {
  let component: DashboardWidgetValueComponent;
  let fixture: ComponentFixture<DashboardWidgetValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
