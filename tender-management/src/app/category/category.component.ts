import { Component, OnInit } from '@angular/core';
import { Category } from '../model/Category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = { name: '', code: '' };
  isEditMode = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  saveCategory(): void {
    if (this.isEditMode && this.selectedCategory.id != null) {
      this.categoryService.update(this.selectedCategory.id, this.selectedCategory).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    } else {
      this.categoryService.create(this.selectedCategory).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  editCategory(category: Category): void {
    this.selectedCategory = { ...category };
    this.isEditMode = true;
  }

  deleteCategory(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }

  resetForm(): void {
    this.selectedCategory = { name: '', code: '' };
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
  openSearchModal() {
    // Add your modal open logic here
    console.log('Search modal opened');
  }

}
