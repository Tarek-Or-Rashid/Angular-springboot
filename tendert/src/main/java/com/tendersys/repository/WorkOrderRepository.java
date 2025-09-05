package com.tendersys.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.WorkOrder;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
	List<WorkOrder> findByTenderId(Long tenderId);
	Optional<WorkOrder> findByBidId(Long bidId);

    
}
