/**
 * Created by yqzheng on 2017/6/20.
 */
import {Component} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
})
export class profile {
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    url: '',
  };
  constructor() {

  }
  ngOnInit() {
  }
}
