import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from "../../../commons/admin/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-pokedex',
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-pokedex.component.html',
  styleUrls: ['./admin-pokedex.component.css']
})
export class AdminPokedexComponent {

}
