import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
//import { BidService } from '../service/bid.service';
import { Bid } from '../model/bid.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tender } from '../model/tender.model';
import { BidService } from '../service/bid.service';
import { TenderService } from '../service/tender.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {





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


      bidForm!: FormGroup;
  tenders: Tender[] = [];
  bids: (Bid & { tender?: Tender })[] = [];

  constructor(
    private fb: FormBuilder,
    private bidService: BidService,
    private tenderService: TenderService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      tenderId: ['', Validators.required],
      bidderName: ['', Validators.required],
      contactNumber: [''],
      email: [''],
      amount: ['', Validators.required],
      remarks: ['']
    });

    this.loadTendersAndBids();
  }

  loadTendersAndBids(): void {
    this.tenderService.getAllTenders().subscribe({
      next: (tenders) => {
        this.tenders = tenders;
        this.bidService.getAllBids().subscribe({
          next: (bids) => {
            this.bids = bids.map(bid => ({
              ...bid,
              tender: this.tenders.find(t => t.id === bid.tenderId)
            }));
          },
          error: (err) => {
            console.error('Error loading bids:', err);
            Swal.fire('Error', 'Failed to load bids.', 'error');
          }
        });
      },
      error: (err) => {
        console.error('Error loading tenders:', err);
        Swal.fire('Error', 'Failed to load tenders.', 'error');
      }
    });
  }

  submitBid(): void {
  if (this.bidForm.invalid) {
    Swal.fire('Warning', 'Please fill in all required fields.', 'warning');
    return;
  }

  const bidAmount = parseFloat(this.bidForm.value.amount);
  const securityMoney = bidAmount * 0.05; // 5% of bid amount

  const formData = new FormData();
  formData.append('tenderId', this.bidForm.value.tenderId);
  formData.append('bidderName', this.bidForm.value.bidderName);
  formData.append('contactNumber', this.bidForm.value.contactNumber || '');
  formData.append('email', this.bidForm.value.email || '');
  formData.append('amount', this.bidForm.value.amount);
  formData.append('remarks', this.bidForm.value.remarks || '');

  this.bidService.submitBid(formData).subscribe({
    next: (response) => {
      Swal.fire({
        title: 'Bid Submitted Successfully!',
        html: `Please pay the security money: <strong>${securityMoney.toFixed(2)}</strong>`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Pay Security Money',
        cancelButtonText: 'Pay Later'
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to payment route with query param for amount
          this.router.navigate(['/payment'], { queryParams: { amount: securityMoney.toFixed(2) } });
        }
      });

      this.bidForm.reset();
      this.loadTendersAndBids();
    },
    error: (error) => {
      console.error('Error submitting bid:', error);
      Swal.fire('Error', 'Failed to submit bid. Please try again.', 'error');
    }
  });
}
}