import { Component, OnInit } from '@angular/core';
import { Source } from '../model/source.model';
import { SourceService } from '../service/source.service';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {
sources: Source[] = [];
  currentSource: Source = { source: '' };
  isEditMode = false;

  constructor(private sourceService: SourceService) {}

  ngOnInit(): void {
    this.loadSources();
  }

  loadSources() {
    this.sourceService.getSources().subscribe(data => {
      this.sources = data;
    });
  }

  saveSource() {
    if (!this.currentSource.source.trim()) {
      alert('Source name cannot be empty');
      return;
    }

    if (this.isEditMode && this.currentSource.id) {
      this.sourceService.updateSource(this.currentSource.id, this.currentSource).subscribe(() => {
        this.resetForm();
        this.loadSources();
      });
    } else {
      this.sourceService.createSource(this.currentSource).subscribe(() => {
        this.resetForm();
        this.loadSources();
      });
    }
  }

  editSource(source: Source) {
    this.currentSource = { ...source };
    this.isEditMode = true;
  }

  deleteSource(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this source?')) {
      this.sourceService.deleteSource(id).subscribe(() => {
        this.loadSources();
      });
    }
  }

  resetForm() {
    this.currentSource = { source: '' };
    this.isEditMode = false;
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
