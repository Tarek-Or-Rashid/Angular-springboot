import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenderPaymentService } from '../service/tender-payment.service';
import { AdminWalletService } from '../service/adminwallet.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tender-payment',
  templateUrl: './tender-payment.component.html',
  styleUrls: ['./tender-payment.component.css']
})
export class TenderPaymentComponent implements OnInit {
 
  walletForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.walletForm = this.fb.group({
      tenderId: [null, Validators.required],
      bidId: [null],
      bidderName: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      totalAmount: [null, [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required],
      mobilePaymentMethod: [''],
      accountNumber: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      mobileNumber: ['']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.walletForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid input',
        text: 'Please fill all required fields correctly.'
      });
      return;
    }

    this.submitting = true;

    this.http.post('http://localhost:8080/api/admin-wallet/credit', this.walletForm.value)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Payment credited successfully.'
          });
          this.walletForm.reset();
          this.submitting = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Payment failed',
            text: error.error?.message || 'An unexpected error occurred.'
          });
          this.submitting = false;
        }
      });
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

