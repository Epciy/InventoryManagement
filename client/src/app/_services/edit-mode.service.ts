import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private _isEditMode: boolean = false;

  constructor() { }

  
  get isEditMode(): boolean {
    return this._isEditMode;
  }

  setEditMode(value: boolean) {
    this._isEditMode = value;
  }

}
