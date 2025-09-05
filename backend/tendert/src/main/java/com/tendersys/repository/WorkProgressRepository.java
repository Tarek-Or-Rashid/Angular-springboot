package com.tendersys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tendersys.model.WorkProgress;

import java.util.List;
import java.util.Optional;
@Repository
public interface WorkProgressRepository extends JpaRepository<WorkProgress, Long> {
   
    List<WorkProgress> findByTenderId(Long tenderId);
    List<WorkProgress> findByBidId(Long bidId);
    List<WorkProgress> findByTenderIdAndBidId(Long tenderId, Long bidId);
    WorkProgress findTopByTenderIdOrderByUpdatedDateDesc(Long tenderId);
    //Optional<WorkProgress> findByTenderIdAndBidId(Long tenderId, Long bidId);
}
