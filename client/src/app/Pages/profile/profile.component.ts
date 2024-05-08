import { Component ,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule , Router , ActivatedRoute ,Params } from '@angular/router';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AuthService } from '../../_services/auth.service';
import { MemberService } from '../../_services/member.service';
import {OrganizationService } from '../../_services/organization.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userType: string;
  user: any = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    role: '',
  };

  constructor(private authService: AuthService, private route: ActivatedRoute,private memberService:MemberService,private organizationService:OrganizationService) {
    this.userType = '';
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const userTypeParam = params.get('userType');
      if (userTypeParam !== null) {
        this.userType = userTypeParam;
      } else {
        console.log('error')
      } 
    });
    // Retrieve user details based on user ID from localStorage
    const userId = localStorage.getItem('user_id');
    console.log("user_id:", userId);

    if (userId) {
      if (this.userType === 'admin') {
        this.authService.getAdminDetail(userId).subscribe((user: any) => {
          this.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role === 'administrator' ? 'administrateur' : ''
          };
          console.log(this.user);
        });
      } else if (this.userType === 'member') {
        this.memberService.getMemberDetail(userId).subscribe((user: any) => {
          this.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role === 'individual' ? 'membre' : ''
          };
          console.log(this.user);
        });
      } else if (this.userType === 'organization') {
         this.organizationService.getOrganizationDetail(userId).subscribe((user: any) => {
          this.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role 
          };
          console.log(this.user);
        });
      } else {

        
        console.error('Invalid user type for profile');
        console.error(this.userType);
      }
    }
  




  }
}

