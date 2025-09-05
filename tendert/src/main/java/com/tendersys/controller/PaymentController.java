package com.tendersys.controller;

import com.tendersys.model.Payment;
import com.tendersys.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        payment.setPaymentDate(LocalDateTime.now());
        Payment savedPayment = paymentRepository.save(payment);
        return ResponseEntity.ok(savedPayment);
    }

   
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }


    @GetMapping("/latest")
    public ResponseEntity<Payment> getLatestPayment() {
        Payment latest = paymentRepository.findTopByOrderByPaymentDateDesc();
        if (latest != null) {
            return ResponseEntity.ok(latest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @GetMapping("/tender/{tenderId}")
    public List<Payment> getPaymentsByTenderId(@PathVariable Long tenderId) {
        return paymentRepository.findByTenderId(tenderId);
    }

    
    @GetMapping("/tender/{tenderId}/total")
    public Double getTotalAmountByTenderId(@PathVariable Long tenderId) {
        return paymentRepository.getTotalAmountByTenderId(tenderId);
    }

    
    @GetMapping("/total")
    public Double getTotalAmount() {
        return paymentRepository.getTotalAmount();
    }
}
