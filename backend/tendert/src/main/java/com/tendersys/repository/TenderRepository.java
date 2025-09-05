package com.tendersys.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.Tender;

@Repository
public interface TenderRepository extends JpaRepository<Tender, Long> {
	
}