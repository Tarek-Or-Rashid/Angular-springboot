package com.tendersys.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "location")
@Table(name = "location")
	
public class Location {	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
    @Column(name = "state")
    private String state;
    @Column(name = "district")
    private String district;
    @Column(name = "address")
    private String address;

    private Long id;

   public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}
