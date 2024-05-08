import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }
  getAllOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(AUTH_API+'organizations'); 
  }

  updateOrganization(organizationId: string, updatedOrganization: any): Observable<any> {
    return this.http.put(AUTH_API + `organization/${organizationId}`, updatedOrganization)
  }


  deleteAllOrganizations(): Observable<any> {
    return this.http.delete<any>(AUTH_API+'organizations'); 
  }
  loginOrganization(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'organization/login', { email, password }); 
  }
  logoutOrganization(): Observable<any> {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('user_id'); 
      window.localStorage.removeItem('user_role');
    }
    return this.http.post<any>(AUTH_API + 'organization/logout', {}).pipe(
      tap(response  => {
        console.log('Logged out successfully!', response);
      })
    );
  }
  getOrganizationDetail(organizationId: string): Observable<any> {
    return this.http.get<any>(AUTH_API + `organization/${organizationId}`);
  }
}
