import { Component, OnInit } from '@angular/core';
import { TenderService } from '../service/tender.service';
import { BidService } from '../service/bid.service';
import { Tender } from '../model/tender.model';
import { Bid } from '../model/bid.model';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
//import { TenderService } from '../services/tender.service';
//import { BidsService } from '../services/bids.service';

@Component({
  selector: 'app-bid-evaluation',
  templateUrl: './bid-evaluation.component.html',
  styleUrls: ['./bid-evaluation.component.css']
})
export class BidEvaluationComponent implements OnInit {
  tenders: Tender[] = [];
  bids: Bid[] = [];
  acceptedBids: Bid[] = [];
  rejectedBids: Bid[] = [];
  selectedTenderId: number | null = null;
  

  constructor(
    private tenderService: TenderService,
    private bidService: BidService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders(): void {
    this.tenderService.getAllTenders().subscribe({
      next: data => {
        this.tenders = data;
      },
      error: err => {
        console.error('Error loading tenders:', err);
        alert('Failed to load tenders');
      }
    });
  }

  onTenderChange(tenderId: number | null): void {
    this.selectedTenderId = tenderId;
    if (tenderId === null) {
      this.bids = [];
      this.acceptedBids = [];
      this.rejectedBids = [];
      return;
    }

    this.bidService.getBidsByTenderId(tenderId).subscribe({
      next: data => {
        this.bids = data;
        this.acceptedBids = this.bids.filter(bid => bid.status === 'ACCEPTED');
        this.rejectedBids = this.bids.filter(bid => bid.status === 'REJECTED');
      },
      error: err => {
        console.error('Error loading bids:', err);
        alert('Failed to load bids');
      }
    });
  }

  acceptBid(bidId: number): void {
    if (this.selectedTenderId !== null) {
      // Step 1: Accept selected bid
      this.bidService.updateBidStatus(bidId, 'ACCEPTED').subscribe({
        next: () => {
          // Step 2: Reject all other bids for this tender
          const otherBids = this.bids.filter(bid => bid.id !== bidId && bid.status !== 'REJECTED');
          const rejectRequests = otherBids.map(bid =>
            this.bidService.updateBidStatus(bid.id!, 'REJECTED')
          );

          if (rejectRequests.length > 0) {
            forkJoin(rejectRequests).subscribe({
              next: () => this.onTenderChange(this.selectedTenderId),
              error: err => {
                console.error('Error rejecting other bids:', err);
                alert('Error rejecting other bids');
                this.onTenderChange(this.selectedTenderId);
              }
            });
          } else {
            // No other bids to reject, just refresh bids
            this.onTenderChange(this.selectedTenderId);
          }
        },
        error: err => {
          alert('Error accepting bid');
          console.error(err);
        }
      });
    }
  }

  rejectBid(bidId: number): void {
    if (this.selectedTenderId !== null) {
      this.bidService.updateBidStatus(bidId, 'REJECTED').subscribe({
        next: () => this.onTenderChange(this.selectedTenderId),
        error: err => {
          alert('Error rejecting bid');
          console.error(err);
        }
      });
    }
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
// createWorkOrder(bidId: number | undefined): void {
//   if (bidId === undefined) {
//     console.error('Invalid bid ID');
//     return;
//   }

//   this.router.navigate(['/workorder', bidId]);
// }

createWorkOrder(bidId: number | undefined): void {
  if (!bidId) {
    console.error('Invalid bid ID');
    return;
  }

  localStorage.setItem('selectedBidId', bidId.toString());
  this.router.navigate(['/workorder',bidId]);
}


  // Method to open search modal (stub)
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }
  }

