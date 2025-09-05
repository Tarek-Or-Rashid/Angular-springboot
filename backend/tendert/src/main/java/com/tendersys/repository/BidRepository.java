package com.tendersys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tendersys.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {



    List<Bid> findByTenderId(Long tenderId);

  
    List<Bid> findByTenderIdAndStatus(Long tenderId, String status);

   
    List<Bid> findByTenderIdAndStatusNot(@Param("tenderId") Long tenderId,
                                         @Param("excludedStatus") String excludedStatus);
}
