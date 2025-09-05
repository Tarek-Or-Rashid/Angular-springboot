package com.tendersys.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tendersys.model.Bid;


public interface BidDAO {
    List<Bid> getAllBids();
    Bid getBidById(Long id);
    Bid saveBid(Bid bid);
    List<Bid> getBidsByTenderId(Long tenderId);
}
