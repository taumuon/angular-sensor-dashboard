import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationNewItemComponent } from './configuration-new-item.component';

describe('ConfigurationNewItemComponent', () => {
  let component: ConfigurationNewItemComponent;
  let fixture: ComponentFixture<ConfigurationNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationNewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
