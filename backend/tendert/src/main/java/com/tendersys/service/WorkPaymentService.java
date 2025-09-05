package com.tendersys.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tendersys.model.AdminWallet;
import com.tendersys.model.BidderWallet;
import com.tendersys.model.WorkProgress;
import com.tendersys.repository.AdminWalletRepository;
import com.tendersys.repository.BidderWalletRepository;
import com.tendersys.repository.WorkProgressRepository;

import jakarta.transaction.Transactional;

@Service
public class WorkPaymentService {

    @Autowired
    private WorkProgressRepository workProgressRepository;

    @Autowired
    private AdminWalletRepository adminWalletRepository;

    @Autowired
    private BidderWalletRepository bidderWalletRepository;

    @Transactional
    public String releasePaymentToBidder(Long tenderId, Long bidId) {
      
        List<WorkProgress> wpList = workProgressRepository.findByTenderIdAndBidId(tenderId, bidId);
        if (wpList.isEmpty()) {
            throw new RuntimeException("Work progress not found");
        }

        
        WorkProgress wp = wpList.get(wpList.size() - 1);

        double amountToPay = wp.getPayableAmount();

       
        double availableBalance = adminWalletRepository.getTenderBalance(tenderId);

        if (availableBalance < amountToPay) {
            throw new RuntimeException("Admin wallet balance is insufficient");
        }

       
        AdminWallet payment = new AdminWallet();
        payment.setTenderId(tenderId);
        payment.setBidId(bidId);
        payment.setBidderName("Paid to bidder for work progress");
        payment.setAmount(-amountToPay);
        payment.setTotalAmount(amountToPay);
        payment.setPaymentMethod("system");
        payment.setPaymentDate(LocalDateTime.now());

        adminWalletRepository.save(payment);

       
        BidderWallet bidderWallet = new BidderWallet();
        bidderWallet.setUserId(wp.getBidId());
        bidderWallet.setTenderId(tenderId);
        bidderWallet.setBidId(bidId);
        bidderWallet.setAmount(amountToPay);  
        bidderWallet.setPaymentMethod("system");
        bidderWallet.setTransactionDate(LocalDateTime.now());

        bidderWalletRepository.save(bidderWallet);

        return "Bidder  " + amountToPay + " Taka pray  (Tender ID: " + tenderId + ")";
    }
}
