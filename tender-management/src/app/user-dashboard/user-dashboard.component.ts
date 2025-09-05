import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  dropdownStates: { [key: string]: boolean } = { tender: false };
  showProfileDropdown = false;

  @ViewChild('tenderChart') tenderChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mobileMenu') mobileMenuRef?: ElementRef;
 tender: any[] = []; 
  private tenderChart!: Chart;

  activeTendersCount = 42;
  activeBidsCount = 7;
  awardedBidsCount = 3;
  pendingApprovalsCount = 2;
  totalBidValue = 1250000;
  unreadNotifications = 5;
  currentCompany = 'Acme Corporation';

  upcomingDeadlines = [
    {
      name: 'City Infrastructure Project',
      date: this.addDays(3),
      priority: 'high',
      daysRemaining: 3
    },
    {
      name: 'School IT Upgrade',
      date: this.addDays(8),
      priority: 'medium',
      daysRemaining: 8
    },
    {
      name: 'Hospital Supplies',
      date: this.addDays(13),
      priority: 'low',
      daysRemaining: 13
    }
  ];

  recentAwards = [
    {
      tenderName: 'Regional Road Maintenance',
      awardDate: this.addDays(-10),
      amount: 450000
    },
    {
      tenderName: 'Office Cleaning Services',
      awardDate: this.addDays(-25),
      amount: 120000
    },
    {
      tenderName: 'Software License Renewal',
      awardDate: this.addDays(-32),
      amount: 85000
    }
  ];

  requiredActions = [
    {
      id: 1,
      title: 'Submit Bid Documents',
      description: 'Final documents required for Metro Rail Project',
      icon: 'file-signature',
      buttonText: 'Upload Now',
      dueDate: this.addDays(2)
    },
    {
      id: 2,
      title: 'Update Company Profile',
      description: 'Your company profile is 60% complete',
      icon: 'user-edit',
      buttonText: 'Complete Profile',
      dueDate: this.addDays(4)
    }
  ];

  recommendedTenders = [
    {
      id: 101,
      title: 'Construction of Community Health Centre',
      category: 'construction',
      location: 'NSW - Western Sydney',
      deadline: this.addDays(3),
      organization: 'NSW Health Infrastructure',
      description:
        'Design and construction of a new community health centre including specialist consulting rooms, treatment areas, and associated infrastructure.'
    },
    {
      id: 102,
      title: 'Provision of IT Managed Services',
      category: 'it',
      location: 'VIC - Melbourne',
      deadline: this.addDays(6),
      organization: 'City of Melbourne',
      description:
        'Seeking experienced provider for comprehensive IT managed services including helpdesk, network management, and cloud services for a 3-year period.'
    },
    {
      id: 103,
      title: 'Solar Panels for Schools Program',
      category: 'energy',
      location: 'QLD - Statewide',
      deadline: this.addDays(10),
      organization: 'Queensland Department of Education',
      description:
        'Bulk procurement of solar panel systems for installation across 150 state schools. Includes 5-year maintenance agreement.'
    }
  ];

  watchlistItems = [
    {
      id: 201,
      tenderName: 'Waste Collection Contract',
      deadline: this.addDays(15),
      location: 'SA - Adelaide'
    },
    {
      id: 202,
      tenderName: 'Defence Facility Maintenance',
      deadline: this.addDays(25),
      location: 'NT - Darwin'
    }
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initTenderChart();
  }

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
    if (this.mobileMenuRef?.nativeElement) {
      this.mobileMenuRef.nativeElement.classList.toggle('active');
    }
  }

  initTenderChart(): void {
    const ctx = this.tenderChartRef?.nativeElement?.getContext('2d');
    if (ctx) {
      if (this.tenderChart) {
        this.tenderChart.destroy(); // Avoid memory leaks
      }

      this.tenderChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Submitted Bids',
              data: [12, 19, 15, 8, 14, 9],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1
            },
            {
              label: 'Awarded Bids',
              data: [3, 5, 2, 4, 6, 3],
              backgroundColor: '#18bc9c',
              borderColor: '#15a589',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      });
    }
  }

  refreshTenderData(): void {
    console.log('Refreshing tender data...');
    this.activeTendersCount = Math.floor(Math.random() * 50) + 30;
    this.activeBidsCount = Math.floor(Math.random() * 10) + 1;
  }

  customizeRecommendations(): void {
    console.log('Opening recommendation customization...');
  }

  addToWatchlist(tenderId: number): void {
    const tender = this.recommendedTenders.find(t => t.id === tenderId);
    if (tender && !this.watchlistItems.some(item => item.id === tenderId)) {
      this.watchlistItems.push({
        id: tender.id,
        tenderName: tender.title,
        deadline: tender.deadline,
        location: tender.location
      });
    }
  }

  removeFromWatchlist(itemId: number): void {
    this.watchlistItems = this.watchlistItems.filter(item => item.id !== itemId);
  }

  startBidProcess(tenderId: number): void {
    console.log(`Starting bid process for tender ${tenderId}`);
  }

  handleAction(actionId: number): void {
    this.requiredActions = this.requiredActions.filter(
      action => action.id !== actionId
    );
  }

  openSearchModal(): void {
    console.log('Opening advanced search modal');
  }

  truncateText(text: string, limit: number = 150): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  private addDays(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

}
