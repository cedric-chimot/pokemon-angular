// sidebar.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private selectedItem: string;

  constructor() {
    // Récupérer l'élément sélectionné du localStorage (si disponible)
    this.selectedItem = localStorage.getItem('selectedItem') || 'Dashboard';
  }

  getSelectedItem(): string {
    return this.selectedItem;
  }

  setSelectedItem(item: string): void {
    this.selectedItem = item;
    localStorage.setItem('selectedItem', item);
  }
}
