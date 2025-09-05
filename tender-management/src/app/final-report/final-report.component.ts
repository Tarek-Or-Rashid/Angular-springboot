import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})
export class FinalReportComponent implements OnInit {

    reportData: any[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Tender Budget (৳)', backgroundColor: '#0d6efd' },
      { data: [], label: 'Bid Amount (৳)', backgroundColor: '#20c997' },
      { data: [], label: 'Profit (৳)', backgroundColor: '#ffc107' }
    ]
  };

  ngOnInit(): void {
    this.reportData = [
      { date: '2025-06-24', tenders: 3, budget: 300000, bidSecurity: 15000, bidAmount: 330000 },
      { date: '2025-06-23', tenders: 2, budget: 200000, bidSecurity: 10000, bidAmount: 210000 },
      { date: '2025-06-22', tenders: 4, budget: 400000, bidSecurity: 20000, bidAmount: 420000 },
      { date: '2025-06-21', tenders: 1, budget: 150000, bidSecurity: 7500, bidAmount: 170000 },
      { date: '2025-06-20', tenders: 3, budget: 350000, bidSecurity: 17500, bidAmount: 390000 },
      { date: '2025-06-19', tenders: 2, budget: 180000, bidSecurity: 9000, bidAmount: 200000 },
      { date: '2025-06-18', tenders: 5, budget: 500000, bidSecurity: 25000, bidAmount: 530000 },
      { date: '2025-06-17', tenders: 2, budget: 220000, bidSecurity: 11000, bidAmount: 240000 },
      { date: '2025-06-16', tenders: 1, budget: 100000, bidSecurity: 5000, bidAmount: 110000 },
      { date: '2025-06-15', tenders: 4, budget: 410000, bidSecurity: 20500, bidAmount: 450000 }
    ];

    // Add profit
    this.reportData.forEach(row => row.profit = row.bidAmount - row.budget);

    // Chart labels and data
    this.barChartLabels = this.reportData.map(row => row.date);
    this.barChartData.labels = this.barChartLabels;

    this.barChartData.datasets[0].data = this.reportData.map(row => row.budget);
    this.barChartData.datasets[1].data = this.reportData.map(row => row.bidAmount);
    this.barChartData.datasets[2].data = this.reportData.map(row => row.profit);
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
 openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }

  }


