import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user.service';
import { CheckInOutComponent } from "../pages/check-in-out-component/check-in-out-component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, CheckInOutComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  @Output() toggleSidebar = new EventEmitter<boolean>();
  isSidebarOpen: boolean = false;
  
  constructor(
    public navigationService: NavigationService,
    public userService: UserService
  ) { }
  ngOnInit(): void {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if(window.innerWidth >= 768){
      this.isSidebarOpen = false;
      this.toggleSidebar.emit(this.isSidebarOpen);
    }
  }
  onToggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleSidebar.emit(this.isSidebarOpen);
  }



  onLogout(): void {
    this.userService.logout();
  }
}

