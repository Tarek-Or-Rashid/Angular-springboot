package com.tendersys.model;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tender_documents")
public class TenderDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "tender_id")
    @JsonBackReference
    private Tender tender;


    public TenderDocument() {}

    public TenderDocument(String fileName, String fileType, byte[] data, Tender tender) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.tender = tender;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Tender getTender() {
		return tender;
	}

	public void setTender(Tender tender) {
		this.tender = tender;
	}
    

}
