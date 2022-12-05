package com.rmit.sept.bk_orderservices.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "OrderTable")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data //Builds all getters and setters
@Builder
public class Order {

    @Id
    @SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "seller", nullable = false, columnDefinition = "TEXT")
    private String seller;

    @Column(name = "buyer", nullable = false, columnDefinition = "TEXT")
    private String buyer;

    @Column(name = "book", nullable = false, columnDefinition = "TEXT")
    private String book;

    @Column(name = "bookID", nullable = false)
    private Long bookID;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "status", nullable = false, columnDefinition = "TEXT")
    private String status;

    private Date create_At;

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }
}
