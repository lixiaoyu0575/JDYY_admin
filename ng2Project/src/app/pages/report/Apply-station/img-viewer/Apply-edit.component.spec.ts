import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgViewerComponent } from './Apply-edit.component';

describe('ImgViewerComponent', () => {
  let component: ImgViewerComponent;
  let fixture: ComponentFixture<ImgViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
