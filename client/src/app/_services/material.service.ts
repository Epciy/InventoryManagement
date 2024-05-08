
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8000/api/';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  
  getAllMaterials(): Observable<any[]> {
    return this.http.get<any[]>(AUTH_API+'materials'); 
  }

  addMaterial(material: any): Observable<any> {
    return this.http.post<any>(AUTH_API+'material/addMaterial', material);
  }

  // Method to delete a material by its ID
  deleteMaterial(materialId: string): Observable<any> {
    return this.http.delete<any>(AUTH_API+`material/delete/${materialId}`); 
  }

  // Method to update a material
  updateMaterial(materialId: string, updatedMaterial: any): Observable<any> {
    return this.http.put<any>(AUTH_API+`material/edit/${materialId}`, updatedMaterial);
  }

  
  deleteAllMaterials(): Observable<any> {
    return this.http.delete<any>( AUTH_API+'material/deleteAll'); 
  }
  getMaterialDetailById(materialId: string): Observable<any> {
    return this.http.get<any>(AUTH_API + `material/${materialId}`);
  }
}
