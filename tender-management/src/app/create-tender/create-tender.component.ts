import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenderService } from '../service/tender.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tender } from '../model/tender.model';
import { Category } from '../model/Category.model';
import { Source } from '../model/source.model';
import { TenderLocation } from '../model/location.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TenderDocument } from '../model/TenderDocument.model';

@Component({
  selector: 'app-create-tender',
  templateUrl: './create-tender.component.html',
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {
tender: Tender = {
    title: '',
    totalAmount: 0,
    deadline: new Date().toISOString().substring(0, 10),
    description: '',
    budget: 0,
    status: 'Open',
    category: { id: 0, name: '', code: '' },
    location: { id: 0, state: '', district: '', address: '', },
    source: { id: 0, source: '' },
    documents: []
  };

  categories: Category[] = [];
  locations: TenderLocation[] = [];
  sources: Source[] = [];
  tenders: Tender[] = [];
  selectedFiles: FileList | null = null;

  constructor(private tenderService: TenderService) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadAllTenders();
  }

  loadDropdownData() {
    this.tenderService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Failed to load categories', err)
    });

    this.tenderService.getLocations().subscribe({
      next: data => this.locations = data,
      error: err => console.error('Failed to load locations', err)
    });

    this.tenderService.getSources().subscribe({
      next: data => this.sources = data,
      error: err => console.error('Failed to load sources', err)
    });
  }

  loadAllTenders() {
    this.tenderService.getAllTenders().subscribe({
      next: data => this.tenders = data,
      error: err => console.error('Failed to load tenders', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  submitTender() {
    if (!this.tender.title || !this.tender.deadline) {
      alert('Please fill in required fields.');
      return;
    }

    this.tenderService.createTenderWithDocuments(this.tender, this.selectedFiles).subscribe({
      next: () => {
        alert('Tender and documents uploaded successfully!');
        this.resetForm();
        this.loadAllTenders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create tender');
      }
    });
  }

  resetForm() {
    this.tender = {
      title: '',
      totalAmount: 0,
      deadline: new Date().toISOString().substring(0, 10),
      description: '',
      budget: 0,
      status: 'Open',
      category: { id: 0, name: '', code: '' },
      location: { id: 0, state: '', district: '', address: '',  },
      source: { id: 0, source: '' },
      documents: []
    };
    this.selectedFiles = null;
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
  }}