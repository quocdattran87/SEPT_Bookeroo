package com.rmit.sept.bk_reviewservices.repository;

import com.rmit.sept.bk_reviewservices.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> getReviewsByBookReviewedID(Long bookId);
    List<Review> getReviewsByUserReviewedIgnoreCase(String username);
}