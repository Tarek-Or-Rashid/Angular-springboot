package com.tendersys.service;

import com.tendersys.model.Bid;
import com.tendersys.model.WorkOrder;
import com.tendersys.repository.WorkOrderRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;

    public WorkOrderService(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    public WorkOrder createWorkOrderFromBid(Bid bid) {
        WorkOrder workOrder = new WorkOrder();

        workOrder.setBidId(bid.getId());
        workOrder.setTenderId(bid.getTender().getId());
        workOrder.setBidderName(bid.getBidderName());
        workOrder.setContactNumber(bid.getContactNumber());
        workOrder.setEmail(bid.getEmail());
        workOrder.setWorkOrderDate(new Date());

        return workOrderRepository.save(workOrder);
    }
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }
}
