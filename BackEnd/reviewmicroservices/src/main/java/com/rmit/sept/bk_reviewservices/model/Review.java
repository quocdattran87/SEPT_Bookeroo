package com.rmit.sept.bk_reviewservices.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "ReviewTable")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data
@Builder
public class Review {

    @Id
    @SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "reviewer", nullable = false, columnDefinition = "TEXT")
    private String reviewer;

    @Column(name = "review", nullable = false, columnDefinition = "TEXT")
    private String review;

    @Column(name = "score", nullable = false, columnDefinition = "TEXT")
    private String score;

    @Column(name = "userReviewed", columnDefinition = "TEXT")
    private String userReviewed;

    @Column(name = "bookReviewedID")
    private Long bookReviewedID;

    private Date create_At;

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }
}