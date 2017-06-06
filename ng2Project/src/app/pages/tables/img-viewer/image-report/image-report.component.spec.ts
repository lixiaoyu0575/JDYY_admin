import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReportComponent } from './image-report.component';

describe('ImageReportComponent', () => {
  let component: ImageReportComponent;
  let fixture: ComponentFixture<ImageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
