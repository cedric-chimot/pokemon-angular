import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  selectedItem: string | undefined;

  // Définir les éléments avec leurs icônes
  items = [
    { name: 'Dashboard', route: '/admin-home', icon: 'fa-solid fa-tachometer-alt' },
    { name: 'Pokedex', route: '/admin-pokedex', icon: 'fa-solid fa-book' },
    { name: 'Pokedex-Boites', route: '/admin-boite-pokedex', icon: 'fa-solid fa-box' },
    { name: 'Shiny', route: '/admin-shiny', icon: 'fa-regular fa-star' },
    { name: 'Shiny-Boites', route: '/admin-boite-shiny', icon: 'fa-solid fa-box-archive' },
    { name: 'Attaques', route: '/admin-attaques', icon: 'fa-solid fa-hand-fist' },
    { name: 'Dresseurs', route: '/admin-dresseurs', icon: 'fa fa-address-card' },
    { name: 'Natures', route: '/admin-natures', icon: 'fa-solid fa-theater-masks' },
    { name: 'Pokeballs', route: '/admin-pokeballs', icon: 'fa-solid fa-compact-disc' },
    { name: 'Régions', route: '/admin-regions', icon: 'fa-solid fa-globe' },
    { name: 'Sexe', route: '/admin-sexes', icon: 'fa-solid fa-venus-mars' },
    { name: 'Types', route: '/admin-types', icon: 'fa-solid fa-fire' }
  ];

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Mettre à jour l'élément sélectionné au chargement initial
    this.updateSelectedItem();

    // Écouter les changements de route pour garder l'élément actif à jour
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedItem();
      }
    });
  }

  // Mettre à jour l'élément sélectionné
  updateSelectedItem(): void {
    const currentRoute = this.router.url;
    const matchingItem = this.items.find(item => item.route === currentRoute);
    this.selectedItem = matchingItem ? matchingItem.name : undefined;

    // Mettre à jour dans le service pour persister l'état
    if (this.selectedItem) {
      this.sidebarService.setSelectedItem(this.selectedItem);
    }
  }

  // Gestion du clic sur un élément de la sidebar
  onItemClick(item: { name: string; route: string }): void {
    this.sidebarService.setSelectedItem(item.name);
    this.selectedItem = item.name;
    this.router.navigate([item.route]);
  }
}
