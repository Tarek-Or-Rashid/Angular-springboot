package com.tendersys.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.tendersys.model.Bid;

public class BidDTO {
    private Long id;
    private Long tenderId;
    private String tenderTitle;
    private String bidderName;
    private String contactNumber;
    private String email;
    private double amount;
    private String remarks;
    private String status;
    private Date submissionDate;
    private List<String> documents;

    // Constructor with all parameters
    public BidDTO(Long id, Long tenderId, String tenderTitle, String bidderName, String contactNumber,
                  String email, double amount, String remarks, String status, Date submissionDate,
                  List<String> documents) {
        this.id = id;
        this.tenderId = tenderId;
        this.tenderTitle = tenderTitle;
        this.bidderName = bidderName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.amount = amount;
        this.remarks = remarks;
        this.status = status;
        this.submissionDate = submissionDate;
        this.documents = documents;
    }

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

	public String getTenderTitle() {
		return tenderTitle;
	}

	public void setTenderTitle(String tenderTitle) {
		this.tenderTitle = tenderTitle;
	}

	public String getBidderName() {
		return bidderName;
	}

	public void setBidderName(String bidderName) {
		this.bidderName = bidderName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}

	public List<String> getDocuments() {
		return documents;
	}

	public void setDocuments(List<String> documents) {
		this.documents = documents;
	}

   
}

