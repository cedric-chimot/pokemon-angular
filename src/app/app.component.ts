import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/commons/navbar/navbar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AdminNavbarComponent } from "./components/commons/admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, RouterOutlet, NavbarComponent, NgbCollapseModule, AdminNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon-angular';
  isAdminRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // On écoute les changements de route pour mettre à jour la navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Si l'URL contient '/admin', on affiche la navbar admin
      this.isAdminRoute = this.router.url.includes('/admin');
    });
  }
}
