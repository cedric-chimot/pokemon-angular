import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  selectedItem: string | undefined;

  // Définir les éléments avec leurs icônes
  items = [
    { name: 'Dashboard', route: '/admin-home', icon: 'fa-solid fa-tachometer-alt' },
    { name: 'Pokedex', route: '/admin-pokedex', icon: 'fa-solid fa-book' },
    { name: 'Shiny', route: '/admin-shiny', icon: 'fa-solid fa-star' },
    { name: 'Dresseurs', route: '/admin-dresseurs', icon: 'fa-solid fa-user' },
    { name: 'Natures', route: '/admin-natures', icon: 'fa-solid fa-theater-masks' },
    { name: 'Types', route: '/admin-types', icon: 'fa-solid fa-fire' },
    { name: 'Sexe', route: '/admin-sexe', icon: 'fa-solid fa-venus-mars' }
  ];

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.selectedItem = this.sidebarService.getSelectedItem();
    this.router.events.subscribe(() => {
      this.updateSelectedItem();
    });
  }

  updateSelectedItem(): void {
    const path = this.router.url;
    const matchingItem = this.items.find(item => item.route === path);
    this.selectedItem = matchingItem ? matchingItem.name : undefined;
  }

  onItemClick(item: { name: string; route: string }): void {
    this.sidebarService.setSelectedItem(item.name);
    this.updateSelectedItem();
    this.router.navigate([item.route]);
  }
}
