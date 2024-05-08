import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  // Method to fetch all members from the backend
  getAllMembers(): Observable<any[]> {
    return this.http.get<any[]>(AUTH_API+'individuals'); 
  }

  updateMember(memberId: string, updatedMember: any): Observable<any> {
    
    return this.http.put(AUTH_API + `individual/${memberId}`, updatedMember);
    
  }


  deleteAllMembers(): Observable<any> {
    return this.http.delete<any>(AUTH_API+'individuals'); 
  }

  loginMember(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'individual/login', { email, password }); 
  }
  logoutMember(): Observable<any> {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('user_id'); 
      window.localStorage.removeItem('user_role');
    }
    return this.http.post<any>(AUTH_API + 'individual/logout', {}).pipe(
      tap(response => {
        console.log('Logged out successfully!', response);
      })
    );
    
  }


  getMemberDetail(memberId: string): Observable<any> {
    return this.http.get<any>(AUTH_API + `individual/${memberId}`);
  }
 
}


