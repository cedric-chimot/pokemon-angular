import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  toggleNavbar = true;
  
  constructor() { }

  ngOnInit() {
  }
  
  toggleNav() {
    this.toggleNavbar =!this.toggleNavbar;
  }
}
