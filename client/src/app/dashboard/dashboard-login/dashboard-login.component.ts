import { Component } from '@angular/core';
import {CommonModule } from '@angular/common';
import { RouterModule ,Router} from '@angular/router';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard-login.component.html',
  styleUrl: './dashboard-login.component.css'
})
export class DashboardLoginComponent {

  cards = [
    {"title": "Administrateur", "role":"admin"},
    {"title": "Membre", "role":"member"},
    {"title": "Organization", "role":"organization"}
  ];
  constructor(private router: Router) {}
  selectUserType(userType: string): void {
    this.router.navigate(['/login', userType.toLowerCase()]);
  }
}
