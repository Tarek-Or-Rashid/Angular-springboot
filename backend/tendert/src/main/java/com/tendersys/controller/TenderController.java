package com.tendersys.controller;



import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tendersys.dao.TenderDAO;
import com.tendersys.model.Tender;
import com.tendersys.model.TenderDocument;



//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tenders")
public class TenderController {

    @Autowired
    private TenderDAO tenderDao;

    public TenderController(TenderDAO tenderDao) {
        this.tenderDao = tenderDao;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Tender> createTenderWithDocuments(
            @RequestPart("tender") Tender tender,
            @RequestPart("documents") MultipartFile[] documents) throws IOException {

        List<TenderDocument> tenderDocs = new ArrayList<>();
        for (MultipartFile file : documents) {
            TenderDocument doc = new TenderDocument();
            doc.setFileName(file.getOriginalFilename());
            doc.setFileType(file.getContentType());
            doc.setData(file.getBytes());
            doc.setTender(tender);
            tenderDocs.add(doc);
        }
        tender.setDocuments(tenderDocs);

        Tender savedTender = tenderDao.save(tender);
        return ResponseEntity.ok(savedTender);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tender> updateTender(@PathVariable Long id, @RequestBody Tender tender) {
        Tender existingTender = tenderDao.findById(id);
        if (existingTender == null) {
            return ResponseEntity.notFound().build();
        }
        tender.setId(id);
        Tender updatedTender = tenderDao.update(tender);
        return ResponseEntity.ok(updatedTender);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTender(@PathVariable Long id) {
        Tender existingTender = tenderDao.findById(id);
        if (existingTender == null) {
            return ResponseEntity.notFound().build();
        }
        tenderDao.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tender> getTender(@PathVariable Long id) {
        Tender tender = tenderDao.findById(id);
        if (tender == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tender);
    }


    @GetMapping
    public ResponseEntity<List<Tender>> getAllTenders() {
        List<Tender> tenders = tenderDao.findAll();
        return ResponseEntity.ok(tenders);
    }
}


