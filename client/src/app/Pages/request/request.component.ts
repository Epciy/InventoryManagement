import { Component } from '@angular/core';
import { RequestService } from '../../_services/request.service';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
   requests : any [] =[];

   constructor (private requestService:RequestService){
    this.loadRequests();
   }
   loadRequests():void {
    const userId=localStorage.getItem('user_id');
    this.requestService.getAllRequests().subscribe((requests: any []) =>{
      this.requests = requests.filter(request => request.user_id === userId);
  
    })
  }
}
