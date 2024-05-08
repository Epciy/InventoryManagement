import { Component } from '@angular/core';
import {RouterModule,Router, NavigationEnd} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {OrganizationService } from '../../_services/organization.service';
import { MemberService } from '../../_services/member.service';
import { MaterialService } from '../../_services/material.service';
import { RequestService } from '../../_services/request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  {
  users: any[] = [];
  materials:any[]=[];
  organizations : any []=[];
  requests : any [] =[];

  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor (private authService:AuthService,private router:Router,private organizationService:OrganizationService,private memberService:MemberService,private materialService: MaterialService,private requestService:RequestService){
    this.loadMembers();
    this.loadMaterials();
    this.loadOrganizations();
    this.loadRequests();
  }
  loadMembers(): void {
    this.memberService.getAllMembers().subscribe((users: any[]) => {
      this.users = users;
      //console.log(this.users);
    });
  }
  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe((materials: any[]) => {
      this.materials = materials;
      //console.log(this.materials);
    });
  }

  loadOrganizations(): void {
    this.organizationService.getAllOrganizations().subscribe((organizations: any[]) => {
      this.organizations =organizations;
    });
  }
  loadRequests():void {
    this.requestService.getAllRequests().subscribe((requests: any []) =>{
      this.requests=requests;
      this.loadMaterialNamesForRequests();
    })
  }

  loadMaterialNamesForRequests(): void {
    this.requests.forEach(request => {
      this.materialService.getMaterialDetailById(request.material_id).subscribe((material: any) => {
        request.material_name = material.name; 
      });
    });
  }


  accept_Request(requestId: string): void {
      this.requestService.acceptRequest(requestId).subscribe(() => {
          alert('Request accepted successfully');
        },
        (error:any) => {
          
          console.error('Error accepting request:', error);
          alert('An error occurred while accepting request');
        }

        
      );
  }
  reject_Request(requestId: string): void {
    this.requestService.rejectRequest(requestId).subscribe(() => {
        alert('Request rejected successfully');
      },
      (error:any) => {
        
        console.error('Error rejecting request:', error);
        alert('An error occurred while rejecting request');
      }
    );
  }


  adminLogout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully!');
        
        this.router.navigate(['/login']);
      },
      (error:any) => {
        console.error('Logout failed:', error);
      
      }
    );
  }

 
}
