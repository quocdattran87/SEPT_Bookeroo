package com.rmit.sept.bk_orderservices.services;

import com.rmit.sept.bk_orderservices.model.Order;
import com.rmit.sept.bk_orderservices.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) { return orderRepository.getOrderById(id); }

    public void addNewOrder(Order order) {
        orderRepository.save(order);
    }

    public List<Order> getOrdersByUsername(String username) {
        Map<Long, Order> map = new HashMap<>();
        for (Order order : orderRepository.getOrdersByBuyerIgnoreCase(username)) {
            map.put(order.getId(), order);
        }
        for (Order order : orderRepository.getOrdersBySellerIgnoreCase(username)) {
            map.put(order.getId(), order);
        }
        List<Order> list = new ArrayList<>(map.values());
        return list;
    }

    @Transactional
    public void orderShipped(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));
        order.setStatus("Shipped");
    }

    @Transactional
    public void orderDelivered(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));
        order.setStatus("Delivered");
    }

    @Transactional
    public void orderCancelled(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));
        order.setStatus("CANCELLED");
    }
}
