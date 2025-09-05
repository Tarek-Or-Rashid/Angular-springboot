package com.tendersys.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tendersys.model.PaymentRequest;
import com.tendersys.service.PaymentRequestService;

@RestController
@RequestMapping("/api/payment-requests")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentRequestController {

    @Autowired
    private PaymentRequestService paymentRequestService;

    
    @PostMapping
    public ResponseEntity<PaymentRequest> createRequest(@RequestBody PaymentRequest request) {
        request.setStatus("PENDING");
        request.setRequestDate(new Date());
        PaymentRequest savedRequest = paymentRequestService.saveRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

  
    @GetMapping
    public List<PaymentRequest> getAllRequests() {
        return paymentRequestService.getAllRequests();
    }

   
    @PutMapping("/{id}/status")
    public ResponseEntity<PaymentRequest> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<PaymentRequest> optional = paymentRequestService.getRequestById(id);
        if (optional.isPresent()) {
            PaymentRequest request = optional.get();
            request.setStatus(status);
            PaymentRequest updated = paymentRequestService.saveRequest(request);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
}
