import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditModeService } from '../../_services/edit-mode.service';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent {




  userDetails: any = {
    name:'', 
    email:'',
    password:''
  };
  isEditMode: boolean = false;
  constructor(private route: ActivatedRoute,private editModeService: EditModeService,private http:HttpClient ,private authService: AuthService,private router:Router) {}
   ngOnInit(): void {

    this.isEditMode = this.editModeService.isEditMode;
    this.route.params.subscribe(params => {
      const materialId = params['id'];
    });
  }
  addOrganization() {
    const {name, email, password} = this.userDetails;

    this.authService.addUser(this.userDetails, 'organization')
        .subscribe(
          (response) => {
            console.log('organization added successfully!', response);
            
            this.router.navigate(['/admin-dashboard/organization']);
          },
          (error) => {
            console.error('Error adding organization:', error);
            
          }
        );

  }


  updateOrganization() {
    const {name, email, password} = this.userDetails;


    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.authService.modifyUser(userId,'organization', this.userDetails)
          .subscribe(
            (response) => {
              console.log('organization updated successfully!', response);
              this.router.navigate(['/admin-dashboard/organization']);
            },
            (error) => {
              console.error('Error updating organization:', error);
            }
          );
      }
    });

   
  }


}
