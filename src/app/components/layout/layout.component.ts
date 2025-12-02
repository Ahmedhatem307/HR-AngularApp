import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarCollapsed = false;

  // Event from navbar: receives the CURRENT open state before toggle.
  // When navbar reports "open = true", user is clicking to close → collapse sidebar.
  toggleSidebar(isCurrentlyOpen: boolean): void {
    this.sidebarCollapsed = isCurrentlyOpen;
  }

}

