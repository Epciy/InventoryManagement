import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MemberService } from '../../_services/member.service';
import { EditModeService } from '../../_services/edit-mode.service';
import {RouterModule,Router} from'@angular/router';
import {AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  
  users: any[] = [];

  totalEntries: number = this.users.length;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number[] = [];

  constructor(private authService:AuthService,private editModeService: EditModeService,private memberService:MemberService,private router:Router) { }

  ngOnInit(): void {
    this.loadMembers();
    this.calculateTotalPages();
  }


  loadMembers(): void {
    this.memberService.getAllMembers().subscribe((users: any[]) => {
      this.users = users.map((user: any) => ({
        _id: user._id,
        firsName: user.firstName,
        lastName: user.lastName,
        role:user.role
        
      }));
      console.log(this.users);
    });
  }

  editUser(userId: string) {
    this.editModeService.setEditMode(true);
    this.router.navigate(['/edit-user', userId]);
  }

  addUser(){
    this.editModeService.setEditMode(false);
    this.router.navigate(['/add-user']);
  }



  calculateTotalPages() {
    const totalPages = Math.ceil(this.totalEntries / this.pageSize);
    const maxPagesToShow = 5; // Maximum number of pages to show
    const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    this.totalPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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

  deleteUser(userId: string) {
    this.authService.removeUser(userId,'individual').subscribe(
      (response:any) => {
        console.log('User deleted successfully!', response);
        this.loadMembers();
      },
      (error:any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  deleteAllUsers(){
    this.memberService.deleteAllMembers().subscribe(
      (response:any)=>{
        console.log("successfully deleted!")
         this.loadMembers();
      },
      (error:any)=>{
        console.error(error);
      }

    )
  }

}
