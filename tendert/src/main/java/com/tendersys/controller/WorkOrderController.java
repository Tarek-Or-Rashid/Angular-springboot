package com.tendersys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tendersys.model.Bid;
import com.tendersys.model.WorkOrder;
import com.tendersys.repository.BidRepository;
import com.tendersys.repository.WorkOrderRepository;
import com.tendersys.service.WorkOrderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

  private final WorkOrderService workOrderService;
  private final BidRepository bidRepository;
	
  @Autowired
  private WorkOrderRepository workOrderRepository;
	
	    public WorkOrderController(WorkOrderService workOrderService, BidRepository bidRepository) {
	        this.workOrderService = workOrderService;
	        this.bidRepository = bidRepository;
	    }

   @PostMapping("/createFromBid/{bidId}")
	public ResponseEntity<?> createWorkOrder(@PathVariable Long bidId) {
	        Optional<Bid> bidOpt = bidRepository.findById(bidId);
	        if (!bidOpt.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid not found");
	        }
	        WorkOrder workOrder = workOrderService.createWorkOrderFromBid(bidOpt.get());
	        return ResponseEntity.ok(workOrder);
	    }
	    @GetMapping("/all")
	    public ResponseEntity<List<WorkOrder>> getAllWorkOrders() {
	        List<WorkOrder> workOrders = workOrderService.getAllWorkOrders();
	        return ResponseEntity.ok(workOrders);
	    }

	    @GetMapping("/tender/{tenderId}/workorders")
	    public List<WorkOrder> getWorkOrdersByTenderId(@PathVariable Long tenderId) {
	        return workOrderRepository.findByTenderId(tenderId);
	    }
	    

}
