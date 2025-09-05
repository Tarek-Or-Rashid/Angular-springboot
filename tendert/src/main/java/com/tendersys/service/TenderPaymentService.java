package com.tendersys.service;

import com.tendersys.model.AdminFeePayment;
import com.tendersys.model.AdminWallet;
import com.tendersys.model.Tender;
import com.tendersys.repository.AdminFeePaymentRepository;
import com.tendersys.repository.AdminWalletRepository;
import com.tendersys.repository.TenderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TenderPaymentService {

    private final AdminFeePaymentRepository adminFeePaymentRepository;
    private final AdminWalletRepository adminWalletRepository;
    private final TenderRepository tenderRepository;

    public TenderPaymentService(AdminFeePaymentRepository adminFeePaymentRepository,
                                AdminWalletRepository adminWalletRepository,
                                TenderRepository tenderRepository) {
        this.adminFeePaymentRepository = adminFeePaymentRepository;
        this.adminWalletRepository = adminWalletRepository;
        this.tenderRepository = tenderRepository;
    }

    public AdminFeePayment makeAdminFeePayment(Long tenderId, double amount, String paymentMethod,
                                               String description, String bidderName,
                                               String mobilePaymentMethod, String accountNumber,
                                               String cardNumber, String expiryDate, String cvv,
                                               String mobileNumber) {

        // Find the Tender by ID or throw exception if not found
        Tender tender = tenderRepository.findById(tenderId)
                .orElseThrow(() -> new RuntimeException("Tender not found with ID: " + tenderId));

        
        LocalDateTime now = LocalDateTime.now();

        // Save payment details to AdminFeePayment
        AdminFeePayment feePayment = new AdminFeePayment(tender, amount, paymentMethod, description, now);
        adminFeePaymentRepository.save(feePayment);

        // Save payment info to AdminWallet for record
        AdminWallet walletEntry = new AdminWallet();
        walletEntry.setTenderId(tenderId);
        walletEntry.setBidId(null); 
        walletEntry.setBidderName(bidderName);
        walletEntry.setAmount(amount);
        walletEntry.setPaymentMethod(paymentMethod);
        walletEntry.setMobilePaymentMethod(mobilePaymentMethod);
        walletEntry.setAccountNumber(accountNumber);
        walletEntry.setCardNumber(cardNumber);
        walletEntry.setExpiryDate(expiryDate);
        walletEntry.setCvv(cvv);
        walletEntry.setMobileNumber(mobileNumber);
        walletEntry.setPaymentDate(now);

        adminWalletRepository.save(walletEntry);

        return feePayment;
    }
}
