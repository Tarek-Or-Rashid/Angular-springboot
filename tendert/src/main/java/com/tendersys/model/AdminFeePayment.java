package com.tendersys.model;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin_fee_payments")
public class AdminFeePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to Tender entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    
    @Column(nullable = false)
    private double amount;  

    @Column(nullable = false)
    private String paymentMethod;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

   
    public AdminFeePayment() {}

    public AdminFeePayment(Tender tender, double amount, String paymentMethod, String description, LocalDateTime paymentDate) {
        this.tender = tender;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.description = description;
        this.paymentDate = paymentDate;
    }

   

    public Long getId() {
        return id;
    }

    public Tender getTender() {
        return tender;
    }

    public void setTender(Tender tender) {
        this.tender = tender;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}

