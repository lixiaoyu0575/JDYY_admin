import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableImgViewComponent } from './data-table-img-view.component';

describe('DataTableImgViewComponent', () => {
  let component: DataTableImgViewComponent;
  let fixture: ComponentFixture<DataTableImgViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableImgViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableImgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
