package com.tendersys.repository;

import com.tendersys.model.User;
import com.tendersys.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    Wallet findByUser(User user);
}
