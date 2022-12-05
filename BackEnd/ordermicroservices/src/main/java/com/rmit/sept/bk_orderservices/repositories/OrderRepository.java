package com.rmit.sept.bk_orderservices.repositories;

import com.rmit.sept.bk_orderservices.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order getOrderById(Long id);
    List<Order> getOrdersByBuyerIgnoreCase(String buyer);
    List<Order> getOrdersBySellerIgnoreCase(String seller);
}
