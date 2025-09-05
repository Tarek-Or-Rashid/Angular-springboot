package com.tendersys.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tendersys.model.Tender;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class TenderDAO {
	@PersistenceContext
    private EntityManager em;

    
    public Tender save(Tender tender) {
        em.persist(tender);
        return tender;
    }


    public Tender update(Tender tender) {
        return em.merge(tender);
    }

    
    public void deleteById(Long id) {
        Tender tender = em.find(Tender.class, id);
        if (tender != null) {
            em.remove(tender);
        }
    }

   
    public Tender findById(Long id) {
        TypedQuery<Tender> query = em.createQuery(
            "SELECT t FROM Tender t LEFT JOIN FETCH t.documents WHERE t.id = :id", Tender.class);
        query.setParameter("id", id);
        List<Tender> result = query.getResultList();
        return result.isEmpty() ? null : result.get(0);
    }

    
    public List<Tender> findAll() {
        return em.createQuery("SELECT DISTINCT t FROM Tender t LEFT JOIN FETCH t.documents", Tender.class)
                 .getResultList();
    }

}