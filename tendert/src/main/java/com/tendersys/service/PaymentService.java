package com.tendersys.service;

import com.tendersys.model.Bid;
import com.tendersys.model.Payment;
import com.tendersys.model.AdminWallet;
import com.tendersys.repository.BidRepository;
import com.tendersys.repository.PaymentRepository;
import com.tendersys.repository.AdminWalletRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AdminWalletRepository adminWalletRepository;

    @Transactional
    public Payment savePayment(Payment payment) {
       
        Payment savedPayment = paymentRepository.save(payment);

        // 2. AdminWallet e oi payment add korbo
        
        AdminWallet walletEntry = new AdminWallet();
        walletEntry.setTenderId(savedPayment.getTenderId());
        walletEntry.setBidId(savedPayment.getBidId());
        walletEntry.setBidderName(savedPayment.getBidderName());
        walletEntry.setAmount(savedPayment.getAmount());
        walletEntry.setPaymentMethod(savedPayment.getPaymentMethod());
        walletEntry.setMobilePaymentMethod(savedPayment.getMobilePaymentMethod());
        walletEntry.setAccountNumber(savedPayment.getAccountNumber());
        walletEntry.setCardNumber(savedPayment.getCardNumber());
        walletEntry.setExpiryDate(savedPayment.getExpiryDate());
        walletEntry.setCvv(savedPayment.getCvv());
        walletEntry.setMobileNumber(savedPayment.getMobileNumber());
        walletEntry.setPaymentDate(savedPayment.getPaymentDate());

        adminWalletRepository.save(walletEntry);

        return savedPayment;
    }
    public Payment findLatestPayment() {
        return paymentRepository.findTopByOrderByPaymentDateDesc();  // adjust as needed
    }
}


