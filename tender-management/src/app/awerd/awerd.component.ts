import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../model/work-order.model';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../service/workorder.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-awerd',
  templateUrl: './awerd.component.html',
  styleUrls: ['./awerd.component.css']
})
export class AwerdComponent implements OnInit {

    workOrders: WorkOrder[] = [];

  constructor(private workOrderService: WorkOrderService) {}

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  loadWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe({
      next: (data: WorkOrder[]) => {
        this.workOrders = data;
      },
      error: (err) => {
        console.error('Error fetching work orders:', err);
      }
    });
  }

  downloadRowAsPDF(order: WorkOrder): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: [
        ['Work Order ID', order.id],
        ['Bid ID', order.bidId],
        ['Tender ID', order.tenderId],
        ['Bidder Name', order.bidderName],
        ['Contact Number', order.contactNumber],
        ['Email', order.email],
        ['Work Order Date', new Date(order.workOrderDate).toLocaleString()],
      ],
    });
    doc.save(`WorkOrder_${order.id}.pdf`);
  }

  isSidebarCollapsed: boolean = false;

  // Dropdown open states
  dropdownStates: { [key: string]: boolean } = {};

  // User profile dropdown state
  showProfileDropdown: boolean = false;
   isMobileMenuOpen: boolean = false;

  // Existing properties and methods here...

  // Add this method to toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;}

  // Other example properties
  unreadNotifications: number = 0;
  activeTendersCount: number = 0;
  currentCompany: string = 'Your Company Name';
 toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Method to toggle dropdown menus
  toggleDropdown(menu: string) {
    this.dropdownStates[menu] = !this.dropdownStates[menu];
  }

  // Method to toggle profile dropdown
  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }
}
