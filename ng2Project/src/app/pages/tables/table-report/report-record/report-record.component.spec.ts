import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRecordComponent } from './report-record.component';

describe('ReportRecordComponent', () => {
  let component: ReportRecordComponent;
  let fixture: ComponentFixture<ReportRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
