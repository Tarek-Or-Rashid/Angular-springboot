package com.tendersys.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "source")
@Table(name = "source")
public class Source {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; 

   @Column(name = "source")
    private String source;



public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getSource() {
	return source;
}

public void setSource(String source) {
	this.source = source;
}
}
