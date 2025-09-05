package com.tendersys.controller;

import com.tendersys.dto.BidDTO;
import com.tendersys.model.Bid;
import com.tendersys.model.Tender;
import com.tendersys.repository.BidRepository;
import com.tendersys.repository.TenderRepository;

import jakarta.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "http://localhost:4200")
public class BidController {

    private final BidRepository bidRepository;
    private final TenderRepository tenderRepository;

    public BidController(BidRepository bidRepository, TenderRepository tenderRepository) {
        this.bidRepository = bidRepository;
        this.tenderRepository = tenderRepository;
    }

   
    @GetMapping
    public List<BidDTO> getAllBids() {
        List<Bid> bids = bidRepository.findAll();
        return bids.stream().map(this::convertToDTO).toList();
    }

 
    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<BidDTO>> getBidsByTenderId(@PathVariable Long tenderId) {
        List<Bid> bids = bidRepository.findByTenderId(tenderId);
        return ResponseEntity.ok(bids.stream().map(this::convertToDTO).toList());
    }

    // ✅ Submit a new bid
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> submitBid(
            @RequestParam Long tenderId,
            @RequestParam String bidderName,
            @RequestParam(required = false) String contactNumber,
            @RequestParam(required = false) String email,
            @RequestParam double amount,
            @RequestParam(required = false) String remarks,
            @RequestParam(required = false) List<MultipartFile> documents
    ) {
        Optional<Tender> tenderOpt = tenderRepository.findById(tenderId);
        if (!tenderOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tender not found");
        }

        Bid bid = new Bid();
        bid.setTender(tenderOpt.get());
        bid.setBidderName(bidderName);
        bid.setContactNumber(contactNumber);
        bid.setEmail(email);
        bid.setAmount(amount);
        bid.setRemarks(remarks);
        bid.setStatus("PENDING");
        bid.setSubmissionDate(new Date());

        if (documents != null && !documents.isEmpty()) {
            List<String> docNames = documents.stream().map(MultipartFile::getOriginalFilename).toList();
            bid.setDocuments(docNames);
           
        }

        Bid savedBid = bidRepository.save(bid);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedBid));
    }
    @Transactional
    @PutMapping("/{bidId}/status")
    public ResponseEntity<String> updateBidStatus(
            @PathVariable Long bidId,
            @RequestBody StatusUpdateRequest statusUpdate) {

        String newStatus = statusUpdate.getStatus();

        if (newStatus == null || 
           !(newStatus.equals("ACCEPTED") || newStatus.equals("REJECTED") || newStatus.equals("PENDING"))) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }

        Optional<Bid> bidOpt = bidRepository.findById(bidId);
        if (!bidOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid not found");
        }

        Bid bid = bidOpt.get();
        bid.setStatus(newStatus);
        bidRepository.save(bid);

       
        if (newStatus.equals("ACCEPTED")) {
            Long tenderId = bid.getTender().getId();
            List<Bid> otherBids = bidRepository.findByTenderId(tenderId);
            for (Bid otherBid : otherBids) {
                if (!otherBid.getId().equals(bidId)) {
                    otherBid.setStatus("REJECTED");
                    bidRepository.save(otherBid);
                }
            }
        }

        return ResponseEntity.ok("Bid status updated successfully");
    }

  
    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

  
    @PutMapping("/reject/{bidId}")
    public ResponseEntity<String> rejectBid(@PathVariable Long bidId) {
        Optional<Bid> bidOpt = bidRepository.findById(bidId);
        if (!bidOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid not found");
        }

        Bid bid = bidOpt.get();
        bid.setStatus("REJECTED");
        bidRepository.save(bid);

        return ResponseEntity.ok("Bid rejected");
    }

   
    @GetMapping("/tender/{tenderId}/accepted")
    public ResponseEntity<List<BidDTO>> getAcceptedBids(@PathVariable Long tenderId) {
        List<Bid> bids = bidRepository.findByTenderIdAndStatus(tenderId, "ACCEPTED");
        return ResponseEntity.ok(bids.stream().map(this::convertToDTO).toList());
    }

    
    @GetMapping("/tender/{tenderId}/rejected")
    public ResponseEntity<List<BidDTO>> getRejectedBids(@PathVariable Long tenderId) {
        List<Bid> bids = bidRepository.findByTenderIdAndStatus(tenderId, "REJECTED");
        return ResponseEntity.ok(bids.stream().map(this::convertToDTO).toList());
    }

    
    @GetMapping("/tender/{tenderId}/accepted-rejected")
    public ResponseEntity<List<BidDTO>> getAcceptedAndRejectedBids(@PathVariable Long tenderId) {
        List<Bid> bids = bidRepository.findByTenderIdAndStatusNot(tenderId, "PENDING");
        return ResponseEntity.ok(bids.stream().map(this::convertToDTO).toList());
    }

    
    @GetMapping("/tender/{tenderId}/raw")
    public ResponseEntity<List<Bid>> getRawBids(@PathVariable Long tenderId) {
        return ResponseEntity.ok(bidRepository.findByTenderId(tenderId));
    }

   
    private BidDTO convertToDTO(Bid bid) {
        return new BidDTO(
                bid.getId(),
                bid.getTender().getId(),
                bid.getTender().getTitle(), 
                bid.getBidderName(),
                bid.getContactNumber(),
                bid.getEmail(),
                bid.getAmount(),
                bid.getRemarks(),
                bid.getStatus(),
                bid.getSubmissionDate(),
                bid.getDocuments()
        );
    }
}
