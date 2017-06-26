import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./dataTables.scss'],
})
export class DoctorsComponent implements OnInit {
  docters: any;
  selectedUser: string;
  imgUrl: string;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.getDoctors();
   this.imgUrl = './timg.jpg';
  }

  getDoctors(): void {
    this.loginService.getuser().then((data) => {
      this.docters = data;
      console.log(this.docters);
    });
  }
  onSelect(item: any): void {
    this.selectedUser = item.name;
  }

  gotoDetail(): void {
    console.log(this.selectedUser);
    this.router.navigate(['../doctor', this.selectedUser], { relativeTo: this.route });
  }
}
