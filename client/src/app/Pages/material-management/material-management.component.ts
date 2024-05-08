import { Component ,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import{RouterModule,Router} from '@angular/router';
import { MaterialService } from '../../_services/material.service';
import { EditModeService } from '../../_services/edit-mode.service';
@Component({
  selector: 'app-material-management',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css'
})


export class MaterialManagementComponent implements  OnInit {
  

  materials: any[] = [];
  
  totalEntries: number = this.materials.length;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number[] = [];

  constructor(private editModeService: EditModeService,private materialService: MaterialService,private router:Router) { }

  ngOnInit(): void {
    this.loadMaterials();
    this.calculateTotalPages();
  }


  editMaterial(materialId: string) {
    this.editModeService.setEditMode(true);
    this.router.navigate(['/edit-material', materialId]);
  }

  addMaterial(){
    this.editModeService.setEditMode(false);
    this.router.navigate(['/add-material']);
  }


  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe((materials: any[]) => {
      this.materials = materials.map((material: any) => ({
        _id: material._id,
        name: material.name,
        type: material.type,
        status: material.status === 'stored' ? 'stocké' : 'en utilisation',
        entrusted_to: material.entrusted_to === null ? "Aucun" : material.entrusted_to,
        statusClass: material.status === 'stored' ? 'success' : 'warning'
      }));
      console.log(this.materials);
    });
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

  deleteMaterial(materialId: string) {
    this.materialService.deleteMaterial(materialId).subscribe(
      (response:any) => {
        console.log('User deleted successfully!', response);
        this.loadMaterials();
      },
      (error:any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  deleteAll(){

    /*
    this.materialService.deleteAllMaterials().subscribe(
      (response:any)=>{
        console.log("successfully deleted!")
        this.loadMaterials();
      },
      (error:any)=>{
        console.error(error);
      }

    )
    */
  }


  

  


}
