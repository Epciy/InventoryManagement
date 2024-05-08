import { Component } from '@angular/core';
import { MaterialService } from '../../_services/material.service';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';

import { EditModeService } from '../../_services/edit-mode.service';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.css'
})
export class AddMaterialComponent {

   materialDetails: any = {
    name: '',
    type: '',
    status: '',
    entrusted_to: null 
  };
  isEditMode: boolean = false;
  constructor( private route: ActivatedRoute,private editModeService: EditModeService,private http:HttpClient ,private materialService: MaterialService,private router:Router) {}

  ngOnInit(): void {
    //this.editModeService.setEditMode(false); 
    this.isEditMode = this.editModeService.isEditMode;
    this.route.params.subscribe(params => {
      const materialId = params['id'];
    });
  }
  addMaterials() {
    const {name,type,status,entrusted_to} = this.materialDetails;
    if (entrusted_to === 'null') {
      this.materialDetails.entrusted_to = null;
    }


    this.materialService.addMaterial(this.materialDetails)
      .subscribe(
        (response) => {
          //console.log('material added successfully!', response);
          
          this.router.navigate(['/admin-dashboard/material']);
        },
        (error) => {
          console.error('Error adding material:', error);
          
        }
    );

  }


  updateMaterial() {
    const { name, type, status, entrusted_to } = this.materialDetails;


    this.route.params.subscribe(params => {
      const materialId = params['id'];
      if (materialId) {
        this.materialService.updateMaterial(materialId, this.materialDetails)
          .subscribe(
            (response) => {
              console.log('material updated successfully!', response);
              this.router.navigate(['/admin-dashboard/material']);
            },
            (error) => {
              console.error('Error updating material:', error);
            }
          );
      }
    });

   
  }

}
