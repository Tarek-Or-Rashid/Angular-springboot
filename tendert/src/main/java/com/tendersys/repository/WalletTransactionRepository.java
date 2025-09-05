package com.tendersys.repository;

import com.tendersys.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Integer> {
	

}
