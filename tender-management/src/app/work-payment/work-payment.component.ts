import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-payment',
  templateUrl: './work-payment.component.html',
  styleUrls: ['./work-payment.component.css']
})
export class WorkPaymentComponent implements OnInit {

   tenderId: number = 0;
  bidId: number = 0;
  message: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

 releasePayment() {
  const url = `http://localhost:8080/api/workprogress/pay/${this.tenderId}/${this.bidId}`;
  const userId = 'user_101'; // You should get this from a logged-in user context

  this.http.post(url, {}, { responseType: 'text' }).subscribe({
    next: (res) => {
      this.message = res;
      this.error = '';

      // Step: Update wallet balance (locally)
      const currentBalance = parseFloat(localStorage.getItem(`wallet_${userId}`) || '0');
      const releasedAmount = 5000; // ← You should ideally get this from API

      const newBalance = currentBalance + releasedAmount;
      localStorage.setItem(`wallet_${userId}`, newBalance.toString());
    },
    error: (err) => {
      this.error = err.error || 'Error occurred';
      this.message = '';
    }
  });
}


  ngOnInit(): void {
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

  // Method to open search modal (stub)
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }


}
