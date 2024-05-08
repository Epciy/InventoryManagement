import { Component } from '@angular/core';
import {RouterModule,Router} from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MaterialService } from '../../_services/material.service';
import { AuthService } from '../../_services/auth.service';
import { RequestService } from '../../_services/request.service';
import { OrganizationService } from '../../_services/organization.service';
@Component({
  selector: 'app-organization-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './organization-dashboard.component.html',
  styleUrl: './organization-dashboard.component.css'
})
export class OrganizationDashboardComponent {
  materials:any[]=[];
  myRequests : any [] =[];
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor (private requestService:RequestService ,private authService:AuthService,private router:Router,private materialService: MaterialService,private organizationService:OrganizationService){
   
    this.loadMaterials();
    this.loadRequests();
    
  }
  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe((materials: any[]) => {
      this.materials = materials;
      console.log(this.materials);
    });
  }

  loadRequests():void {
    const userId=localStorage.getItem('user_id');
    this.requestService.getAllRequests().subscribe((requests: any []) =>{
      this.myRequests = requests.filter(request => request.user_id === userId);
  
    })
  }
  isMaterialInMyRequests(materialId: string): boolean {
    return this.myRequests.some(request => request.material_id === materialId);
  }


  requestMaterial(materialId: string): void {
    const userId = localStorage.getItem('user_id');
    const userRole=localStorage.getItem('user_role')==='organization'?'organization':'';
    if (userId){
      this.requestService.requestMaterial(materialId, userId,userRole).subscribe((response: any) => {
        this.loadRequests()
        alert('success')
    });
    }
    
  }

  returnMaterial(materialId: string): void {
    const userId = localStorage.getItem('user_id');
    const userRole=localStorage.getItem('user_role')==='organization'?'organization':'';
    if (userId){
      this.requestService.returnMaterial(materialId, userId,userRole).subscribe((response: any) => {
        this.loadRequests()
        alert('success')
    });
    }
    
  }
  organizationLogout() {
    this.organizationService.logoutOrganization().subscribe(
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
