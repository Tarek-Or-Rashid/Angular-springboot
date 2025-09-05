package com.tendersys.controller;

import com.tendersys.model.AdminWallet;
import com.tendersys.repository.AdminWalletRepository;
import com.tendersys.service.AdminWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin-wallet")
public class AdminWalletController {
	 @Autowired
	    private AdminWalletRepository adminWalletRepository;
    @Autowired
    private AdminWalletService adminWalletService;
    @GetMapping("/balance")
    public ResponseEntity<Double> getOverallBalance() {
        double balance = adminWalletRepository.getOverallBalance();
        return ResponseEntity.ok(balance);
    }
//    @GetMapping("/total-balance")
//    public ResponseEntity<Double> getTotalBalance() {
//        return ResponseEntity.ok(adminWalletService.getTotalBalance());
//    }
//
//    @GetMapping("/tender-balance/{tenderId}")
//    public ResponseEntity<Double> getTenderBalance(@PathVariable Long tenderId) {
//        return ResponseEntity.ok(adminWalletService.getTenderBalance(tenderId));
//    }
//
//    @GetMapping("/payments/{tenderId}")
//    public ResponseEntity<List<AdminWallet>> getPaymentsByTender(@PathVariable Long tenderId) {
//        return ResponseEntity.ok(adminWalletService.getPaymentsByTender(tenderId));
//    }
//
//    @PostMapping("/payment")
//    public ResponseEntity<AdminWallet> savePayment(@RequestBody AdminWallet payment) {
//        AdminWallet savedPayment = adminWalletService.savePayment(payment);
//        return ResponseEntity.ok(savedPayment);
//    }
//
    @PostMapping("/credit")
    public ResponseEntity<?> creditToWallet(@RequestBody AdminWallet wallet) {
        AdminWallet savedWallet = adminWalletService.addToAdminWallet(wallet);
        return ResponseEntity.ok(savedWallet);
    }
    
    
}
