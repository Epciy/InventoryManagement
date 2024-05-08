import { Component,OnInit } from '@angular/core';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { RouterModule , Router , Route , ActivatedRoute ,Params } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MemberService } from '../_services/member.service';
import {OrganizationService } from '../_services/organization.service';

import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginObj: Login;
  userType: string;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute,private memberService:MemberService,private organizationService:OrganizationService) {
    this.loginObj = new Login();
    this.userType = '';
  }

  ngOnInit(): void {
    this.initMDB();

    this.route.paramMap.subscribe(params => {
      const userTypeParam = params.get('userType');
      if (userTypeParam !== null) {
        this.userType = userTypeParam;
      } else {
        console.log('error')
      } 
    });
  }

  initMDB(): void {
    initMDB({ Input, Ripple });
  }

  onLogin(): void {
    
    if (this.userType === 'admin') {
      this.http.post('http://localhost:8000/api/login', this.loginObj).subscribe((res: any) => {
        if (res.result) {
          alert("Connexion réussie");
          console.log(res.data);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_id', res.data.admin._id);
          localStorage.setItem('user_role',res.data.admin.role==='administrator'?'admin':'');
          this.router.navigateByUrl('/admin-dashboard');
        } else {
          alert(res.message);
        }
      });
    } else if (this.userType === 'member') {
      this.memberService.loginMember(this.loginObj.email,this.loginObj.password).subscribe((res: any) => {
        if (res.result) {
          alert("Connexion réussie");
          console.log(res.data);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_id', res.data.individual._id);
          localStorage.setItem('user_role',res.data.individual.role==='individual'?'member':'')
          this.router.navigateByUrl('/member-dashboard');
        } else {
          alert(res.message);
        }
      });
    } else if (this.userType === 'organization') {
      this.organizationService.loginOrganization(this.loginObj.email,this.loginObj.password).subscribe((res: any) => {
        if (res.result) {
          alert("Connexion réussie");
          console.log(res.data);
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_id', res.data.organization._id);
          localStorage.setItem('user_role',res.data.organization.role);
          this.router.navigateByUrl('/organization-dashboard');
        } else {
          alert(res.message);
        }
      });
    } else {
      console.log(this.userType)
      console.error('Invalid user type');
    }
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
