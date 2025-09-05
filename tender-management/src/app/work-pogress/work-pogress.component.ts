import { Component, OnInit } from '@angular/core';
import { WorkProgress } from '../model/work-pogress.model';
import { WorkProgressService } from '../service/work-pogress.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-work-pogress',
  templateUrl: './work-pogress.component.html',
  styleUrls: ['./work-pogress.component.css']
})
export class WorkPogressComponent implements OnInit {

 progressList: any[] = [];
  latestProgress: any;

  progressForm = {
    tenderId: 0,               // better to keep numbers
    bidId: 0,
    progressPercentage: 0,
    payableAmount: 0,
    updatedBy: ''
  };

  tenderIdForSearch: number = 0;

  private baseUrl = 'http://localhost:8080/api/workprogress';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  saveProgress() {
    // Make sure to send correct types to backend (numbers)
    this.http.post<any>(`${this.baseUrl}`, this.progressForm)
      .subscribe(
        res => {
          alert("Progress Saved Successfully");
          this.clearForm();
        },
        err => {
          console.error(err);
          alert("Failed to save progress");
        }
      );
  }

  getProgressListByTender() {
    if (!this.tenderIdForSearch) {
      alert('Please enter a valid Tender ID');
      return;
    }

    this.http.get<any[]>(`${this.baseUrl}/tender/${this.tenderIdForSearch}`)
      .subscribe(
        data => {
          this.progressList = data;
        },
        err => {
          console.error(err);
          alert('Failed to fetch progress list');
        }
      );
  }

  getLatestProgress() {
    if (!this.tenderIdForSearch) {
      alert('Please enter a valid Tender ID');
      return;
    }

    this.http.get<any>(`${this.baseUrl}/latest/${this.tenderIdForSearch}`)
      .subscribe(
        data => {
          this.latestProgress = data;
        },
        err => {
          console.error(err);
          alert('Failed to fetch latest progress');
        }
      );
  }

  clearForm() {
    this.progressForm = {
      tenderId: 0,
      bidId: 0,
      progressPercentage: 0,
      payableAmount: 0,
      updatedBy: ''
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
