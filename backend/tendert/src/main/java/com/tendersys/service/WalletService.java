package com.tendersys.service;

import com.tendersys.model.*;
import com.tendersys.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletTransactionRepository transactionRepository;

    public Wallet getWalletForUser(String username) {
        User user = userRepository.findByUsername(username);
        Wallet wallet = walletRepository.findByUser(user);
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO);
            walletRepository.save(wallet);
        }
        return wallet;
    }

    public String addMoney(String username, WalletTransaction tx) {
        Wallet wallet = getWalletForUser(username);
        wallet.setBalance(wallet.getBalance().add(tx.getAmount()));
        walletRepository.save(wallet);

        tx.setWallet(wallet);
        tx.setType("ADD");
        transactionRepository.save(tx);

        return "Amount added successfully.";
    }

    public String withdrawMoney(String username, WalletTransaction tx) {
        Wallet wallet = getWalletForUser(username);

        if (wallet.getBalance().compareTo(tx.getAmount()) < 0) {
            return "Insufficient balance!";
        }

        wallet.setBalance(wallet.getBalance().subtract(tx.getAmount()));
        walletRepository.save(wallet);

        tx.setWallet(wallet);
        tx.setType("WITHDRAW");
        transactionRepository.save(tx);

        return "Amount withdrawn successfully.";
    }
    
}
