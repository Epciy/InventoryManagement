import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor( private http: HttpClient ) { }
   

  requestMaterial(materialId: string, userId: string,userRole:string): Observable<any> {
    return this.http.post<any>(AUTH_API+`request/create`, { materialId, userId,userRole }); 
  }
  returnMaterial(materialId: string, userId: string,userRole:string): Observable<any> {
    return this.http.post<any>(AUTH_API+`request/create`, { materialId, userId,userRole }); 
  }
  
  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(AUTH_API + 'requests');
  }
  acceptRequest(requestId: string): Observable<any> {
    return this.http.put<any>(`${AUTH_API}/requests/${requestId}/accept` ,{});
  }

  rejectRequest(requestId:string):Observable<any>{
    return this.http.put<any>(`${AUTH_API}/requests/${requestId}/reject` ,{});
  };
}
