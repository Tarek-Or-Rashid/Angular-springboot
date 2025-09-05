package com.tendersys.controller;

import com.tendersys.model.Wallet;
import com.tendersys.model.WalletTransaction;
import com.tendersys.service.WalletService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/{username}")
    public Wallet getWallet(@PathVariable String username) {
        return walletService.getWalletForUser(username);
    }

    @PostMapping("/add/{username}")
    public String addMoney(@PathVariable String username, @RequestBody WalletTransaction tx) {
        return walletService.addMoney(username, tx);
    }

    @PostMapping("/withdraw/{username}")
    public String withdrawMoney(@PathVariable String username, @RequestBody WalletTransaction tx) {
        return walletService.withdrawMoney(username, tx);
    }
//    @GetMapping("/transactions/{username}")
//    public ResponseEntity<List<WalletTransaction>> getUserTransactions(@PathVariable String username) {
//        List<WalletTransaction> transactions = walletService.getTransactionsByUsername(username);
//        return ResponseEntity.ok(transactions);
//    }

}
