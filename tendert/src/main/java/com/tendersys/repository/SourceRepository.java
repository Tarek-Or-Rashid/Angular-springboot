package com.tendersys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.Source;
@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
}

