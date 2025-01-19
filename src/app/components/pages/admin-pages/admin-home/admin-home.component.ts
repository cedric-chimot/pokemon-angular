import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from "../../../commons/admin/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
