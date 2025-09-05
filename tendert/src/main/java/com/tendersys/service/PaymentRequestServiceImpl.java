package com.tendersys.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tendersys.model.PaymentRequest;
import com.tendersys.repository.PaymentRequestRepository;
import com.tendersys.service.PaymentRequestService;

@Service
public class PaymentRequestServiceImpl implements PaymentRequestService {

    private final PaymentRequestRepository paymentRequestRepository;

    @Autowired
    public PaymentRequestServiceImpl(PaymentRequestRepository paymentRequestRepository) {
        this.paymentRequestRepository = paymentRequestRepository;
    }

    @Override
    public PaymentRequest saveRequest(PaymentRequest paymentRequest) {
        return paymentRequestRepository.save(paymentRequest);
    }

    @Override
    public List<PaymentRequest> getAllRequests() {
        return paymentRequestRepository.findAll();
    }

    @Override
    public Optional<PaymentRequest> getRequestById(Long id) {
        return paymentRequestRepository.findById(id);
    }
}
