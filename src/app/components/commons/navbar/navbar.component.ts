import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
