package com.tendersys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tendersys.model.BidderWallet;

public interface BidderWalletRepository extends JpaRepository<BidderWallet, Long> {
    List<BidderWallet> findByUserId(Long userId);
}

