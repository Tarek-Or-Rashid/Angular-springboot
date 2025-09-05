package com.tendersys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin_wallet")
public class AdminWallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenderId;     
    private Long bidId;        

    private String bidderName;  

    private double amount;      
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;
    public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	private String paymentMethod;        
    private String mobilePaymentMethod;  // bkash, nagad, upay (if mobile)

    private String accountNumber;  
    private String cardNumber;    
    private String expiryDate;
    private String cvv;

    private String mobileNumber; 

    private LocalDateTime paymentDate;

   
    @PrePersist
    public void prePersist() {
        this.paymentDate = LocalDateTime.now();
    }

    
    public AdminWallet() {}

    public AdminWallet(Long tenderId, Long bidId, String bidderName, double amount,
                       String paymentMethod, String mobilePaymentMethod,
                       String accountNumber, String cardNumber, String expiryDate, String cvv,
                       String mobileNumber) {
        this.tenderId = tenderId;
        this.bidId = bidId;
        this.bidderName = bidderName;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.mobilePaymentMethod = mobilePaymentMethod;
        this.accountNumber = accountNumber;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.mobileNumber = mobileNumber;
        this.paymentDate = LocalDateTime.now();
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTenderId() { return tenderId; }
    public void setTenderId(Long tenderId) { this.tenderId = tenderId; }

    public Long getBidId() { return bidId; }
    public void setBidId(Long bidId) { this.bidId = bidId; }

    public String getBidderName() { return bidderName; }
    public void setBidderName(String bidderName) { this.bidderName = bidderName; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getMobilePaymentMethod() { return mobilePaymentMethod; }
    public void setMobilePaymentMethod(String mobilePaymentMethod) { this.mobilePaymentMethod = mobilePaymentMethod; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public String getCvv() { return cvv; }
    public void setCvv(String cvv) { this.cvv = cvv; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
}
