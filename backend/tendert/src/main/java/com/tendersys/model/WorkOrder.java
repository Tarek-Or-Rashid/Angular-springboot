package com.tendersys.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "work_orders")
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bidId;

    private Long tenderId;

    private String bidderName;

    private String contactNumber;

    private String email;

    @Temporal(TemporalType.TIMESTAMP)
    private Date workOrderDate;

    

  
    public WorkOrder() {}

   
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBidId() { return bidId; }
    public void setBidId(Long bidId) { this.bidId = bidId; }

    public Long getTenderId() { return tenderId; }
    public void setTenderId(Long tenderId) { this.tenderId = tenderId; }

    public String getBidderName() { return bidderName; }
    public void setBidderName(String bidderName) { this.bidderName = bidderName; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Date getWorkOrderDate() { return workOrderDate; }
    public void setWorkOrderDate(Date workOrderDate) { this.workOrderDate = workOrderDate; }
}
