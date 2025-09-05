package com.tendersys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tendersys.model.AdminWallet;

@Repository
public interface AdminWalletRepository extends JpaRepository<AdminWallet, Long> {
	@Query("SELECT COALESCE(SUM(a.amount), 0) FROM AdminWallet a WHERE a.tenderId = :tenderId")
    double getTenderBalance(@Param("tenderId") Long tenderId);

    // Sum of all payments (overall balance)
    @Query("SELECT COALESCE(SUM(a.amount), 0) FROM AdminWallet a")
    double getOverallBalance();
    List<AdminWallet> findByTenderId(Long tenderId);
    List<AdminWallet> findByBidId(Long bidId);
    
}
