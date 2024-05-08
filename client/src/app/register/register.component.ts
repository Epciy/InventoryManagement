import { Component,OnInit} from '@angular/core';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule,Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {
  userData: any = {
    firstName:'',
    lastName:'',
    username:'',
    email:'',
    password:''
 
  };
  
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.initMDB(); 
  }

  initMDB(): void {
   

    initMDB({ Input, Ripple });
  }
 
  onSubmit(): void { 

  const { firstName, lastName,username, email, password } = this.userData;
  this.authService.register(firstName, lastName, username,email, password)
      .subscribe(
        (data) => {
          console.log(data)
          
          this.router.navigate(['/login']); 
        },
        (error) => {
          
          console.error(error);
        }
      );
  }

  
 



}



