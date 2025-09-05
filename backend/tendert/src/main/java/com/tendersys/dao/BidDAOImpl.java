package com.tendersys.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tendersys.model.Bid;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional
public class BidDAOImpl implements BidDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Bid> getAllBids() {
        return entityManager.createQuery("FROM Bid", Bid.class).getResultList();
    }

    @Override
    public Bid getBidById(Long id) {
        return entityManager.find(Bid.class, id);
    }

    @Override
    public Bid saveBid(Bid bid) {
        entityManager.persist(bid);
        return bid;
    }

    @Override
    public List<Bid> getBidsByTenderId(Long tenderId) {
        return entityManager
                .createQuery("FROM Bid b WHERE b.tender.id = :tenderId", Bid.class)
                .setParameter("tenderId", tenderId)
                .getResultList();
    }
}
