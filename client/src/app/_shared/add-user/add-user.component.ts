import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditModeService } from '../../_services/edit-mode.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userDetails: any = {
    firstName:'',
    lastName:'',
    username:'',
    email:'', 
    password:'',
    imageUrl:''
  };
  isEditMode: boolean = false;
  constructor(private route: ActivatedRoute,private editModeService: EditModeService,private http:HttpClient ,private authService: AuthService,private router:Router) {}
  ngOnInit(): void {

    this.isEditMode = this.editModeService.isEditMode;
    this.route.params.subscribe(params => {
      const materialId = params['id'];
    });
  }
  addUsers() {
    const {imageUrl, firstName, lastName, username, email, password} = this.userDetails;
    /*if (!firstName || !lastName || !username || !email || !password) {
      console.error('All fields are required!');
      return;
    }
    */
    

    this.authService.addUser(this.userDetails, 'individual')
        .subscribe(
          (response) => {
            console.log('User added successfully!', response);
            
            this.router.navigate(['/admin-dashboard/member']);
          },
          (error) => {
            console.error('Error adding user:', error);
            
          }
        );

  }


   updateUser() {
    const {imageUrl, firstName, lastName, username, email, password} = this.userDetails;


    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.authService.modifyUser(userId,'individual', this.userDetails)
          .subscribe(
            (response) => {
              console.log('member updated successfully!', response);
              this.router.navigate(['/admin-dashboard/member']);
            },
            (error) => {
              console.error('Error updating member:', error);
            }
          );
      }
    });

   
  }


}
