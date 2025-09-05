package com.tendersys.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment_requests")
public class PaymentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenderId;

    private Double amount;

    private String status;

    private String paymentMethod;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestDate;

   
    public PaymentRequest() {}

    public PaymentRequest(Long tenderId, Double amount, String status, Date requestDate,String paymentMethod) {
        this.tenderId = tenderId;
        this.amount = amount;
        this.status = status;
        this.requestDate = requestDate;
    }

   

    public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTenderId() { return tenderId; }
    public void setTenderId(Long tenderId) { this.tenderId = tenderId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getRequestDate() { return requestDate; }
    public void setRequestDate(Date requestDate) { this.requestDate = requestDate; }
}
