import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-top',
  imports: [CommonModule, RouterModule],
  templateUrl: './button-top.component.html',
  styleUrls: ['./button-top.component.css']
})
export class ButtonTopComponent {

  // Fonction pour remonter en haut
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  
  
}
