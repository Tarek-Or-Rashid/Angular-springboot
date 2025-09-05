package com.tendersys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.PaymentRequest;

@Repository
public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, Long> {
   
}
