import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendappComponent } from './sendapp.component';

describe('SendappComponent', () => {
  let component: SendappComponent;
  let fixture: ComponentFixture<SendappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
