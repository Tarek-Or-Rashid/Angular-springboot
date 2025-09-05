import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../service/workorder.service';
import { WorkOrder } from '../model/work-order.model';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
 bidId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  workOrders: WorkOrder[] = [];

  isSidebarCollapsed: boolean = false;
  dropdownStates: { [key: string]: boolean } = {};
  showProfileDropdown: boolean = false;
  isMobileMenuOpen: boolean = false;
  unreadNotifications: number = 0;
  activeTendersCount: number = 0;
  currentCompany: string = 'Your Company Name';

  constructor(private workOrderService: WorkOrderService) {}

  ngOnInit(): void {
    const storedBidId = localStorage.getItem('selectedBidId');
    this.bidId = storedBidId ? +storedBidId : null;

    if (this.bidId === null) {
      this.errorMessage = '❌ No Bid ID found in localStorage.';
      console.error('No Bid ID found in localStorage');
      return;
    }

    console.log('Loaded Bid ID from localStorage:', this.bidId);
    this.createWorkOrder(); // Auto-create work order from stored bid ID
    this.loadAllWorkOrders(); // Load existing work orders
  }

  createWorkOrder(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.bidId || this.bidId <= 0) {
      this.errorMessage = '❌ Invalid Bid ID.';
      return;
    }

    this.workOrderService.createWorkOrderFromBid(this.bidId).subscribe({
      next: (workOrder) => {
        this.successMessage = '✅ Work order created successfully!';
        console.log('Created work order:', workOrder);
        this.loadAllWorkOrders();
        // Optionally clear the selectedBidId after success
        localStorage.removeItem('selectedBidId');
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to create work order. ' + (err.error?.message || '');
        console.error(err);
      }
    });
  }

  loadAllWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe({
      next: (data) => {
        this.workOrders = data;
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to load work orders.';
        console.error(err);
      }
    });
  }

  // UI Logic (unchanged)
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleDropdown(menu: string): void {
    this.dropdownStates[menu] = !this.dropdownStates[menu];
  }

  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}