package com.tendersys.service;

import java.util.List;
import java.util.Optional;

import com.tendersys.model.PaymentRequest;

public interface PaymentRequestService {

    PaymentRequest saveRequest(PaymentRequest paymentRequest);

    List<PaymentRequest> getAllRequests();

    Optional<PaymentRequest> getRequestById(Long id);
}
