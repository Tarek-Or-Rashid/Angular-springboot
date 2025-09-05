package com.tendersys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
