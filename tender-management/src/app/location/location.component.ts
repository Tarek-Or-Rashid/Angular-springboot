import { Component, OnInit } from '@angular/core';
import { LocationService } from '../service/location.service';
import { TenderLocation } from '../model/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

 locations: TenderLocation[] = [];

  // Initialize with empty fields and optional id undefined
  selectedLocation: TenderLocation = { id: undefined, state: '', district: '', address: '' };

  isEditMode = false;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getAll().subscribe(data => {
      this.locations = data;
    });
  }

  saveLocation() {
    if (this.isEditMode) {
      if (!this.selectedLocation.id) {
        console.error('Edit mode but no location id set!');
        return;
      }
      this.locationService.update(this.selectedLocation.id, this.selectedLocation)
        .subscribe(() => {
          this.loadLocations();
          this.resetForm();
        });
    } else {
      this.locationService.create(this.selectedLocation).subscribe(() => {
        this.loadLocations();
        this.resetForm();
      });
    }
  }

  editLocation(location: TenderLocation) {
    this.selectedLocation = { ...location };
    this.isEditMode = true;
  }

  deleteLocation(id?: number) {
    if (!id) return;
    if (confirm('Are you sure to delete this location?')) {
      this.locationService.delete(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }

  resetForm() {
    this.selectedLocation = { id: undefined, state: '', district: '', address: '' };
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
createWorkOrder(bidId: number | undefined): void {
  if (bidId === undefined) {
    console.error('Invalid bid ID');
    return;
  }

  
}

  // Method to open search modal (stub)
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }


}
