package com.tendersys.controller;

import com.tendersys.dto.PaymentRequest;
import com.tendersys.model.AdminFeePayment;
import com.tendersys.service.TenderPaymentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/tenders")
public class TenderPaymentController {

    private final TenderPaymentService tenderPaymentService;

    public TenderPaymentController(TenderPaymentService tenderPaymentService) {
        this.tenderPaymentService = tenderPaymentService;
    }

    @PostMapping("/{tenderId}/payments")
    public ResponseEntity<?> makePayment(
            @PathVariable Long tenderId,
            @RequestBody PaymentRequest paymentRequest) {
        try {
            AdminFeePayment payment = tenderPaymentService.makeAdminFeePayment(
                    tenderId,
                    paymentRequest.getAmount(),
                    paymentRequest.getPaymentMethod(),
                    paymentRequest.getDescription(),
                    paymentRequest.getBidderName(),
                    paymentRequest.getMobilePaymentMethod(),
                    paymentRequest.getAccountNumber(),
                    paymentRequest.getCardNumber(),
                    paymentRequest.getExpiryDate(),
                    paymentRequest.getCvv(),
                    paymentRequest.getMobileNumber()
            );

            return new ResponseEntity<>(payment, HttpStatus.CREATED);

        } catch (ResponseStatusException e) {
           
            return new ResponseEntity<>(e.getReason() != null ? e.getReason() : "Error processing payment",
                    HttpStatus.NOT_FOUND);
        } catch (Exception e) {
          
            return new ResponseEntity<>("Internal Server Error: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
