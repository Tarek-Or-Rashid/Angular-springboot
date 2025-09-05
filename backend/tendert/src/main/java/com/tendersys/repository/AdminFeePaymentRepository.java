package com.tendersys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.AdminFeePayment;

@Repository
public interface AdminFeePaymentRepository extends JpaRepository<AdminFeePayment, Long> {
	
	
}