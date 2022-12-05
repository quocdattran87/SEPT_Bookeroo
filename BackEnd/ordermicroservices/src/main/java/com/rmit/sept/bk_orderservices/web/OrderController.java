package com.rmit.sept.bk_orderservices.web;

import com.rmit.sept.bk_orderservices.model.Order;
import com.rmit.sept.bk_orderservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "https://www.bookeroo.net")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping()
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder(@Valid @RequestBody Order order){
        orderService.addNewOrder(order);
        return  new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/userOrders")
    public List<Order> getUserOrders(@Valid @RequestBody Map<String, Object> query) {
        return orderService.getOrdersByUsername((String)query.get("username"));
    }

    @PutMapping(path = "/shipped/{orderId}")
    public List<Order> orderShipped(@PathVariable("orderId") Long orderId) {
        orderService.orderShipped(orderId);
        Order order = orderService.getOrderById(orderId);
        return orderService.getOrdersByUsername(order.getSeller());
    }

    @PutMapping(path = "/delivered/{orderId}")
    public List<Order> orderDelivered(@PathVariable("orderId") Long orderId) {
        orderService.orderDelivered(orderId);
        Order order = orderService.getOrderById(orderId);
        return orderService.getOrdersByUsername(order.getSeller());
    }

    @PutMapping(path = "/cancelled/{orderId}")
    public List<Order> orderCancelled(@PathVariable("orderId") Long orderId) {
        orderService.orderCancelled(orderId);
        Order order = orderService.getOrderById(orderId);
        return orderService.getOrdersByUsername(order.getBuyer());
    }
}
