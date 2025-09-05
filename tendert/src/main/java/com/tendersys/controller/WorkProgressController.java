package com.tendersys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tendersys.model.WorkProgress;
import com.tendersys.repository.WorkProgressRepository;
import com.tendersys.service.WorkPaymentService;


@RestController
@RequestMapping("/api/workprogress")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkProgressController {

	@Autowired
    private WorkProgressRepository progressRepository;

	@Autowired
    private WorkPaymentService workPaymentService;
	
    // Save progress
    @PostMapping
    public WorkProgress saveProgress(@RequestBody WorkProgress progress) {
        return progressRepository.save(progress);
    }

    // Get progress by tender
    @GetMapping("/tender/{tenderId}")
    public List<WorkProgress> getByTender(@PathVariable Long tenderId) {
        return progressRepository.findByTenderId(tenderId);
    }

    // Get latest progress for a tender
    @GetMapping("/latest/{tenderId}")
    public WorkProgress getLatestProgress(@PathVariable Long tenderId) {
        return progressRepository.findTopByTenderIdOrderByUpdatedDateDesc(tenderId);
    }
    @PostMapping("/pay/{tenderId}/{bidId}")
    public ResponseEntity<String> releasePayment(@PathVariable Long tenderId, @PathVariable Long bidId) {
        try {
            String message = workPaymentService.releasePaymentToBidder(tenderId, bidId);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
