import { Component ,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationService } from '../../_services/organization.service';
import {AuthService } from '../../_services/auth.service';
import { EditModeService } from '../../_services/edit-mode.service';
import {RouterModule,Router} from'@angular/router';
@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent implements OnInit {

  
  users: any[] = [];

  totalEntries: number = this.users.length;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number[] = [];

  constructor(private authService:AuthService,private editModeService: EditModeService,private router:Router,private organizationService:OrganizationService) { }

  ngOnInit(): void {
    this.loadOrganizations();
    this.calculateTotalPages();
  }

  loadOrganizations(): void {
    this.organizationService.getAllOrganizations().subscribe((users: any[]) => {
      this.users = users.map((user: any) => ({
        _id: user._id,
       name: user.name,
        email: user.email,
        role:user.role
        
      }));

    });
  }


  editOrganization(organizationId: string) {
    this.editModeService.setEditMode(true);
    this.router.navigate(['/edit-organization', organizationId]);
  }

  addOrganization(){
    this.editModeService.setEditMode(false);
    this.router.navigate(['/add-organization']);
  }
  calculateTotalPages() {
    const totalPages = Math.ceil(this.totalEntries / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
    }
  }


  deleteOrganization(userId: string) {
    this.authService.removeUser(userId,'organization').subscribe(
      (response:any) => {
        console.log('User deleted successfully!', response);
        this.loadOrganizations();
      },
      (error:any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  deleteAll(){
    this.organizationService.deleteAllOrganizations().subscribe(
      (response:any)=>{
        console.log("successfully deleted!")
        this.loadOrganizations();
      },
      (error:any)=>{
        console.error(error);
      }

    )
  }

}
