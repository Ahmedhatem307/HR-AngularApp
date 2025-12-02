import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges{
  @Input() collapsed: boolean = false;
  // Emits whenever the sidebar collapse state is toggled from within the sidebar
  expandedComponents: Record<string, boolean> = {};

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'bi bi-speedometer2' },
    {
      label: 'Company Data',
      route: '/company-data',
      icon: 'bi bi-building',
      children: [
        { label: 'Company Info', route: '/company-data/company-info', icon: 'bi bi-info-circle' },
        { label: 'Departments', route: '/company-data/departments', icon: 'bi bi-diagram-3' },
        { label: 'Positions', route: '/company-data/positions', icon: 'bi bi-briefcase' }
      ]
    },
    { label: 'Contracts', route: '/contracts', icon: 'bi bi-file-earmark-text' },
    { label: 'Leaves & Holidays', route: '/leaves-holidays', icon: 'bi bi-calendar2-week' },
    { label: 'Employees Data', route: '/employees-data', icon: 'bi bi-people' },
    { label: 'Payroll', route: '/payroll', icon: 'bi bi-cash-stack' },
    { label: 'Attendance', route: '/attendance', icon: 'bi bi-clock-history' },
    { label: 'Vacancies', route: '/vacancies', icon: 'bi bi-clipboard-check' },
    { label: 'Reports', route: '/reports', icon: 'bi bi-bar-chart-line' }
  ];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['collapsed'].firstChange){
      this.collapsed = changes['collapsed'].currentValue;
    }
  }


  toggleSection(item: MenuItem): void {
    if (item.children) 
      this.expandedComponents[item.label] = !this.expandedComponents[item.label];
    
  }

  isExpanded(item: MenuItem): boolean {
    if (item.children)
      return this.expandedComponents[item.label];
    return false;
  }
}

