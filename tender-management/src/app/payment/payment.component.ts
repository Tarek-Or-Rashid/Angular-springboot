import { Component, OnInit } from '@angular/core';
import { Payment } from '../model/payment.model';
//import { PaymentService } from '../service/payment.service';
import Swal from 'sweetalert2';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  payment: Payment = {
    tenderId: 0,
    bidId: 0,
    bidderName: '',
    amount: 0,
    paymentMethod: 'card',
    mobilePaymentMethod: null,
    accountNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mobileNumber: '',
    paymentDate: ''
  };

  latestPayment: Payment | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchLatestPayment();
  }

  fetchLatestPayment(): void {
    this.paymentService.getLatestPayment().subscribe({
      next: (data) => {
        this.latestPayment = data;
      },
      error: (err) => {
        console.error('Error fetching latest payment', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.payment.tenderId || !this.payment.bidId || !this.payment.bidderName || !this.payment.amount) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    this.paymentService.makePayment(this.payment).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Your payment has been processed.'
        });
        this.fetchLatestPayment();  // Refresh latest payment view
        this.resetForm();
      },
      error: (error) => {
        console.error('Payment error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong. Please try again.'
        });
      }
    });
  }

  resetForm(): void {
    this.payment = {
      tenderId: 0,
      bidId: 0,
      bidderName: '',
      amount: 0,
      paymentMethod: 'card',
      mobilePaymentMethod: null,
      accountNumber: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      mobileNumber: '',
      paymentDate: ''
    };
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
