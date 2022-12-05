package com.rmit.sept.bk_reviewservices.services;

import com.rmit.sept.bk_reviewservices.model.Review;
import com.rmit.sept.bk_reviewservices.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByUsername(String username) {
        Map<Long, Review> map = new HashMap<>();
        for (Review review : reviewRepository.getReviewsByUserReviewedIgnoreCase(username)) {
            map.put(review.getId(), review);
        }
        List<Review> list = new ArrayList<>(map.values());
        return list;
    }

    public List<Review> getReviewsByBookID(Long bookID) {
        Map<Long, Review> map = new HashMap<>();
        for (Review review : reviewRepository.getReviewsByBookReviewedID(bookID)) {
            map.put(review.getId(), review);
        }
        List<Review> list = new ArrayList<>(map.values());
        return list;
    }

    public void addNewReview(Review review) {
        reviewRepository.save(review);
    }
}
