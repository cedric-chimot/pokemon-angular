import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  toggleNavbar = true;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.toggleNavbar = true;
    });
  }
  
  toggleNav() {
    this.toggleNavbar = !this.toggleNavbar;
  }
}
