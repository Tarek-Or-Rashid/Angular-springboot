package com.tendersys.repository;

import com.tendersys.model.Payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	// Get all payments by tender ID
    List<Payment> findByTenderId(Long tenderId);

    // Sum of payments by tender ID
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.tenderId = :tenderId")
    Double getTotalAmountByTenderId(Long tenderId);

    // Total sum of all payments (admin wallet total balance)
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    Double getTotalAmount();
    Payment findTopByOrderByPaymentDateDesc();

}
