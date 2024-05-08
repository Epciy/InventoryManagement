import { Component } from '@angular/core';
import {RouterModule,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MaterialService } from '../../_services/material.service';
import { AuthService } from '../../_services/auth.service';
import { RequestService } from '../../_services/request.service';
import { MemberService } from '../../_services/member.service';
@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css'
})
export class MemberDashboardComponent {
  materials:any[]=[];
  myRequests : any [] =[];
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor (private authService:AuthService,private router:Router,private materialService: MaterialService,private requestService:RequestService,private memberService:MemberService){
   
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
    const userRole=localStorage.getItem('user_role')==='member'?'individual':'';
    if (userId){
      this.requestService.requestMaterial(materialId, userId,userRole).subscribe((response: any) => {
      alert('success')
    });
    }
    
  }

  returnMaterial(materialId: string): void {
    const userId = localStorage.getItem('user_id');
    const userRole=localStorage.getItem('user_role')==='member'?'individual':'';
    if (userId){
      this.requestService.returnMaterial(materialId, userId,userRole).subscribe((response: any) => {
      alert('success')
    });
    }
    
  }
  memberLogout() {
    this.memberService.logoutMember().subscribe(
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
