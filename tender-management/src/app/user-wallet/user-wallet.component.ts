import { Component, OnInit } from '@angular/core';
import { Wallet } from '../model/wallet.model';
import { WalletService } from '../service/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent implements OnInit {
  username = localStorage.getItem('username') || '';
  amount: number = 0;
  action: 'add' | 'withdraw' = 'add';

  wallet: Wallet = {
    userId: 0,
    balance: 0,
    method: 'MOBILE',
    number: ''
  };

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadWallet();
  }

  loadWallet(): void {
    this.walletService.getUserWallet(this.username).subscribe({
      next: (data) => {
        this.wallet = data;
      },
      error: () => {
        this.wallet = { userId: 0, balance: 0, method: 'MOBILE', number: '' };
        Swal.fire('Error', 'Wallet not found or failed to load.', 'error');
      }
    });
  }

  performAction(): void {
    if (this.amount <= 0) {
      Swal.fire('Invalid Amount', 'Amount must be greater than 0.', 'warning');
      return;
    }

    if (this.action === 'add') {
      this.walletService.addBalance(this.username, this.amount).subscribe({
        next: () => {
          this.loadWallet();
          Swal.fire('Failed', 'Failed to add money.', 'error');
        },
        error: () => {
          Swal.fire('Success', 'Money added successfully.', 'success');
        }
      });
    } else {
      this.walletService.withdrawBalance(this.username, this.amount).subscribe({
        next: () => {
          this.loadWallet();
          Swal.fire('Failed', 'Failed to withdraw money.', 'error');
        },
        error: () => {
          Swal.fire('Success', 'Money withdrawn successfully.', 'success');
        }
      });
    }
  }
}
