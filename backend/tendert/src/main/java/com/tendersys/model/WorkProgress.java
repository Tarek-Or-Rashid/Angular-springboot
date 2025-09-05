package com.tendersys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_progress")
public class WorkProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenderId;    
    private Long bidId;       

    private Double progressPercentage;  
    private Double payableAmount;      

    private String updatedBy;  
    private LocalDateTime updatedDate;

    @PrePersist
    public void onCreate() {
        this.updatedDate = LocalDateTime.now();
    }

    
    public WorkProgress() {}

    public WorkProgress(Long tenderId, Long bidId, Double progressPercentage, Double payableAmount, String updatedBy) {
        this.tenderId = tenderId;
        this.bidId = bidId;
        this.progressPercentage = progressPercentage;
        this.payableAmount = payableAmount;
        this.updatedBy = updatedBy;
    }

 
    public Long getId() { return id; }
    public Long getTenderId() { return tenderId; }
    public void setTenderId(Long tenderId) { this.tenderId = tenderId; }

    public Long getBidId() { return bidId; }
    public void setBidId(Long bidId) { this.bidId = bidId; }

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public Double getPayableAmount() { return payableAmount; }
    public void setPayableAmount(Double payableAmount) { this.payableAmount = payableAmount; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }

    public LocalDateTime getUpdatedDate() { return updatedDate; }
    public void setUpdatedDate(LocalDateTime updatedDate) { this.updatedDate = updatedDate; }
}
