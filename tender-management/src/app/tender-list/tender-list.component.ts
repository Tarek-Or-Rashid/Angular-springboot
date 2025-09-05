import { Component, OnInit } from '@angular/core';
import { Tender } from '../model/tender.model';
import { TenderService } from '../service/tender.service';
import { Router } from '@angular/router';
import { Bid } from '../model/bid.model';
import { BidService } from '../service/bid.service';
import { TenderDocument } from '../model/TenderDocument.model';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {

   tenders: Tender[] = [];
  bidsByTenderId: { [key: number]: Bid[] } = {};


  constructor(private tenderService: TenderService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllTenders();
  }

  loadAllTenders() {
    this.tenderService.getAllTenders().subscribe({
      next: data => this.tenders = data,
      error: err => console.error('Failed to load tenders', err)
    });
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    switch(status.toLowerCase()) {
      case 'open': return 'status-open';
      case 'closed': return 'status-closed';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  downloadDocument(doc: TenderDocument) {
    const blob = this.base64ToBlob(doc.data, doc.fileType);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  base64ToBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  }

  onBidNow(tenderId?: number) {
    if (tenderId != null) {
      this.router.navigate(['/bidding', tenderId]);
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

  // Method to open search modal (stub)
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }
  
}
