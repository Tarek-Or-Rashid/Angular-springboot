package com.tendersys.dto;

public class PaymentRequest {
    private double amount;
    private String paymentMethod;
    private String description;
    private String bidderName;
    private String mobilePaymentMethod;
    private String accountNumber;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String mobileNumber;

  
    public double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getDescription() { return description; }
    public String getBidderName() { return bidderName; }
    public String getMobilePaymentMethod() { return mobilePaymentMethod; }
    public String getAccountNumber() { return accountNumber; }
    public String getCardNumber() { return cardNumber; }
    public String getExpiryDate() { return expiryDate; }
    public String getCvv() { return cvv; }
    public String getMobileNumber() { return mobileNumber; }

   
    public void setAmount(double amount) { this.amount = amount; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setDescription(String description) { this.description = description; }
    public void setBidderName(String bidderName) { this.bidderName = bidderName; }
    public void setMobilePaymentMethod(String mobilePaymentMethod) { this.mobilePaymentMethod = mobilePaymentMethod; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public void setCvv(String cvv) { this.cvv = cvv; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
}
