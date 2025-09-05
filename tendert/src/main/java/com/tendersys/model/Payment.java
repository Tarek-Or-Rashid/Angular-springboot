package com.tendersys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;




@Entity
@Table(name = "payments")
public class Payment {

@Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long tenderId;
 private Long bidId;
 private String bidderName;
 private Double amount;

 private String paymentMethod; 
 private String mobilePaymentMethod; 

 private String accountNumber;
 private String cardNumber;
 private String expiryDate;
 private String cvv;
 private String mobileNumber;

 private LocalDateTime paymentDate;

 public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getTenderId() {
		return tenderId;
	}

	public void setTenderId(Long tenderId) {
		this.tenderId = tenderId;
	}

	public Long getBidId() {
		return bidId;
	}

	public void setBidId(Long bidId) {
		this.bidId = bidId;
	}

	public String getBidderName() {
		return bidderName;
	}

	public void setBidderName(String bidderName) {
		this.bidderName = bidderName;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getMobilePaymentMethod() {
		return mobilePaymentMethod;
	}

	public void setMobilePaymentMethod(String mobilePaymentMethod) {
		this.mobilePaymentMethod = mobilePaymentMethod;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}
}
