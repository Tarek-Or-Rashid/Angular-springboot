import { Component, OnInit } from '@angular/core';
import { AdminWallet } from '../model/adminwallet.model';
import { AdminWalletService } from '../service/adminwallet.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-wallet',
  templateUrl: './admin-wallet.component.html',
  styleUrls: ['./admin-wallet.component.css']
})
export class AdminWalletComponent implements OnInit {
  currentBalance: number = 0;
  message: string = '';

  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOverallBalance(); // অথবা specificTenderBalance(tenderId);
  }

  getOverallBalance(): void {
    this.http.get<number>('http://localhost:8080/api/admin-wallet/balance')
      .subscribe(
        (balance) => {
          this.currentBalance = balance;
          this.message = `মোট ব্যালেন্স: ৳ ${balance.toFixed(2)}`;
        },
        (error) => {
          console.error('Balance load failed:', error);
          this.message = 'ব্যালেন্স লোড করতে ব্যর্থ হয়েছে';
        }
      );
  }

  // (Optional) Tender-wise balance
  getTenderBalance(tenderId: number): void {
    this.http.get<number>(`http://localhost:8080/api/admin-wallet/balance/${tenderId}`)
      .subscribe(
        (balance) => {
          this.currentBalance = balance;
          this.message = `Tender ID ${tenderId} এর ব্যালেন্স: ৳ ${balance.toFixed(2)}`;
        },
        (error) => {
          console.error('Tender Balance load failed:', error);
          this.message = 'Tender Balance লোড করতে ব্যর্থ হয়েছে';
        }
      );
  }

currentCompany: string = 'My Company Ltd.';

  activeTendersCount: number = 0;

  unreadNotifications: number = 0;
  isSidebarCollapsed: boolean = false;
  dropdownStates: { [key: string]: boolean } = {};
  showProfileDropdown: boolean = false;
  isMobileMenuOpen: boolean = false;



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

  openSearchModal(): void {
    console.log('Search modal opened');
  }



  
}
