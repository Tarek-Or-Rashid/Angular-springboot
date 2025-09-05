import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Tender } from 'src/app/model/tender.model';
import { TenderService } from 'src/app/service/tender.service';
//import { Tender } from '../model/tender.model';
//import { TenderService } from '../service/tender.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  currentCompany: string = 'ABC Corporation';
  unreadNotifications: number = 3;
  showProfileDropdown: boolean = false;
  isMobileMenuOpen: boolean = false;

  // Sidebar Variables
  isOpen = {
    tender: false,
    bid: false,
    evaluation: false,
    user: false,
    report: false,
    settings: false
  };

  constructor(private router: Router) {}

  // --- Header Functions ---
  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  openSearchModal(): void {
    console.log('Search modal opened');
    // Implement search logic or open a modal
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  // --- Sidebar Functions ---
  toggleDropdown(menu: string): void {
    // Close other dropdowns when opening a new one
    Object.keys(this.isOpen).forEach(key => {
      if (key !== menu) {
        this.isOpen[key as keyof typeof this.isOpen] = false;
      }
    });
    // Toggle the selected menu
    this.isOpen[menu as keyof typeof this.isOpen] = 
      !this.isOpen[menu as keyof typeof this.isOpen];
  }

  // --- Navigation Helper ---
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false; // Close mobile menu on navigation
  }

  // --- Stats Data (for the stats section) ---
  stats = [
    { value: '500+', label: 'Tenders Managed' },
    { value: '1200+', label: 'Registered Vendors' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  // --- Testimonials Data ---
  testimonials = [
    {
      quote: 'TenderPro has revolutionized our procurement process. The transparency and efficiency have saved us countless hours and reduced errors significantly.',
      author: 'Sarah Johnson',
      role: 'Procurement Manager, ABC Corp',
      image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      quote: 'As a small business, TenderPro has given us access to opportunities we never would have found otherwise. The bidding process is straightforward and fair.',
      author: 'Michael Chen',
      role: 'CEO, XYZ Supplies',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      quote: 'The audit trail and reporting features have made compliance so much easier for our organization. Highly recommended for any public sector entity.',
      author: 'Amina Diallo',
      role: 'Director, National Procurement Authority',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];
// Scroll animation trigger
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('visible');
//     }
//   });
// }, { threshold: 0.1 });





}
