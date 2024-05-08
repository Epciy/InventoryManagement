import { Component } from '@angular/core';
import {RouterModule,Router} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MemberService } from '../../_services/member.service';
import { OrganizationService } from '../../_services/organization.service';
import {CommonModule} from '@angular/common';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-customize-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './customize-profile.component.html',
  styleUrl: './customize-profile.component.css'
})
export class CustomizeProfileComponent {
  userRole:string="";
  constructor(private authService: AuthService,private memberService:MemberService,private organizationService:OrganizationService,private router:Router) {
    const userRole = localStorage.getItem('user_role');
    if (userRole) {
      this.userRole = userRole;
    }
 
  } 
  
  userDetails: any = {
    firstName:'',
    lastName:'',
    username:'',
    email:'', 
    password:'',
  };



  updateAdminDetails() {
    
    const userId = localStorage.getItem('user_id');
    
    const {firstName, lastName, username, email, password} = this.userDetails;
   
    if (userId && this.userRole==='admin'){
      this.authService.updateAdminDetail(userId, this.userDetails).subscribe(
        () => {
          console.log('Admin details updated successfully!');
          this.router.navigate([`/profile/${this.userRole}`])

        },
        (error) => {
          console.error('Error updating admin details:', error);
        }
      );

    }else if (userId && this.userRole==='member'){
      this.memberService.updateMember(userId, this.userDetails).subscribe(
        () => {
          console.log('Member details updated successfully!');
          this.router.navigate([`/profile/${this.userRole}`])

        },
        (error) => {
          console.error('Error updating member details:', error);
        }
      );
    }else if (userId && this.userRole==="organization"){
      this.organizationService.updateOrganization(userId, this.userDetails).subscribe(
        () => {
          console.log('organization details updated successfully!');
          this.router.navigate([`/profile/${this.userRole}`])

        },
        (error) => {
          console.error('Error updating organization details:', error);
        }
      );
    }
    
  }
}