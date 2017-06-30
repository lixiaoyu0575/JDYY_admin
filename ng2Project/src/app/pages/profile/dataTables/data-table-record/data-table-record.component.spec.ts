import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRecordComponent } from './data-table-record.component';

describe('DataTableRecordComponent', () => {
  let component: DataTableRecordComponent;
  let fixture: ComponentFixture<DataTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
