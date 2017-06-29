/**
 * Created by yqzheng on 2017/6/25.
 */
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'person-Inform',
  templateUrl: './personalInform.html',
  // styleUrls: ['./personalInform.scss']
})
export class personalInform {
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    url: '',
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
  ) {}

  gotoHeroes(): void {
    this.router.navigate(['../'], { relativeTo: this.route } ); // !
  }
  update():void{
    console.log("submit!");
  }

}
