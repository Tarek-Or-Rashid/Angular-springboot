package com.tendersys.service;

import com.tendersys.model.AdminWallet;
import com.tendersys.repository.AdminWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminWalletService {

    @Autowired
    private AdminWalletRepository adminWalletRepository;

    public double getTotalBalance() {
        return adminWalletRepository.getOverallBalance();
    }

    public double getTenderBalance(Long tenderId) {
        return adminWalletRepository.getTenderBalance(tenderId);
    }

    public List<AdminWallet> getPaymentsByTender(Long tenderId) {
        return adminWalletRepository.findByTenderId(tenderId);
    }

    public AdminWallet savePayment(AdminWallet payment) {
        return adminWalletRepository.save(payment);
    }

    public AdminWallet addToAdminWallet(AdminWallet wallet) {
        // Any business logic if needed
        return adminWalletRepository.save(wallet);
    }
    public AdminWallet creditAmount(Double amount) {
    	
            // Fetch latest wallet record or calculate current total balance
            Double currentTotal = adminWalletRepository.getOverallBalance();
            if (currentTotal == null) {
                currentTotal = 0.0;
            }

            Double newTotal = currentTotal + amount;

            AdminWallet payment = new AdminWallet();
            payment.setAmount(amount);
            payment.setTotalAmount(newTotal);
            payment.setPaymentDate(LocalDateTime.now());

            // Set other optional fields if you want
            // payment.setBidderName("System");
            // payment.setPaymentMethod("Credit");

            return adminWalletRepository.save(payment);
        }

	
		// TODO Auto-generated method stub

}
