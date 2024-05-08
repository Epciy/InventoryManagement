import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const AUTH_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) {}
  

  hasAnyRole(allowedRole: string): boolean {
    const userRole = this.getUserRole(); 
    return allowedRole === userRole;
  }

  private getUserRole(): string {
    const rolesString = window.localStorage.getItem('user_role');
    if (rolesString){
      return rolesString;
    }
    return '';
   

  }
   

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(AUTH_API + 'login', body)
      .pipe(
        tap(response => {
          
          console.log('response',response)

        })
      );
  }
  storeToken(token: string,userId:string,user_role:string) {
    if (typeof window !== 'undefined') { 
      window.localStorage.setItem('auth_token', token);
      window.localStorage.setItem('user_id', userId);
      window.localStorage.setItem('httpOnly', 'true'); 
      window.localStorage.setItem('user_role',user_role);
      //Storage {auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…zc2fQ.3aA7_fg_4ekEEFOJGfzH_rhkSf9Ca3e9jYY0NVZqQbU', length: 1}


    }
  }

  register(firstName: string,lastName:string,username:string, email: string, password: string) {
    const body = { firstName,lastName,username, email, password};
    return this.http.post(AUTH_API+'register', body)
      .pipe(
        tap(response => {
          
          console.log('Registration successful!', response);
        })
      );
  }

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('user_id'); 
      window.localStorage.removeItem('user_role');
    }
    
    return this.http.post(AUTH_API + 'logout', {}).pipe(
      tap(response => {
        console.log('Logged out successfully!', response);
      })
    );
  }

  getAdminDetail(adminId: string) {
    return this.http.get(AUTH_API + `admin/${adminId}`)
      .pipe(
        tap(admin => {
          console.log('Admin details:', admin);
          
        })
      );
  }
  
  updateAdminDetail(adminId: string, updates: any) {
    return this.http.put(AUTH_API + `admin/${adminId}`, updates)
      .pipe(
        tap(response => {
          console.log('Admin details updated successfully!', response);
        })
      );
  }


  addUser(userDetails: any, role: string) {
    let body;
    if (role === 'individual') {
      const { firstName, lastName, username, email, password, imageUrl } = userDetails;
      body = { firstName, lastName, username, email, password, imageUrl, role };
    } else  {
      const { name, email, password } = userDetails;
      body = { name, email, password, role };
    } 

    return this.http.post(AUTH_API + 'addUser', body).pipe(
      tap(response => {
        console.log('User added successfully!', response);
      })
    );
  }

  removeUser(userId: string,role:string) {
    return this.http.delete(AUTH_API + `user/${userId}?role=${role}`)
      .pipe(
        tap(response => {
          console.log('User removed successfully!', response);
          
        })
      );
  }



  modifyUser(userId: string, role: string, userDetails: any) {
    const body = { role, userDetails };
    return this.http.put(AUTH_API + `user/${userId}`, body)
      .pipe(
        tap(response => {
          console.log('User details modified successfully!', response);
          
        })
      );
  }
}













