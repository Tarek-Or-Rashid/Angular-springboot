import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  // ngOnInit(): void {
  //   this.user = {
  //     id: localStorage.getItem('id'),
  //     username: localStorage.getItem('username'),
  //     email: localStorage.getItem('email'),
  //     role: localStorage.getItem('role')
  //   };
  // }
  
  constructor() { }



 ngOnInit(): void {
    const randomImageId = Math.floor(Math.random() * 70) + 1; // From 1 to 70 (pravatar.cc supports this)
    const randomPicUrl = `https://i.pravatar.cc/150?img=${randomImageId}`;

    this.user = {
      id: localStorage.getItem('id') ,
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      phone: localStorage.getItem('phone') || this.getRandomPhone(),
      address: localStorage.getItem('address') || this.getRandomAddress(),
      profilePic: randomPicUrl
    };
  }

 

  getRandomPhone(): string {
    return '01' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  }

  getRandomAddress(): string {
    const addresses = ['Dhaka', 'Chattogram', 'Khulna', 'Sylhet', 'Rajshahi', 'Barisal'];
    return addresses[Math.floor(Math.random() * addresses.length)] + ', Bangladesh';
  }}