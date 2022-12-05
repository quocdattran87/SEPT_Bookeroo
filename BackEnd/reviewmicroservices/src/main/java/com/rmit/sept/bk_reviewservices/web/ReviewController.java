package com.rmit.sept.bk_reviewservices.web;

import com.rmit.sept.bk_reviewservices.model.Review;
import com.rmit.sept.bk_reviewservices.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.NumberUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "https://www.bookeroo.net")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping()
    public List<Review> getReviews() {
        return reviewService.getReviews();
    }

    @GetMapping(path = "/user/{username}")
    public List<Review> getUserReviews(@PathVariable("username") String username) {
        return reviewService.getReviewsByUsername(username);
    }

    @GetMapping(path = "/book/{bookID}")
    public List<Review> getBookReviews(@PathVariable("bookID") Long bookID) {
        return reviewService.getReviewsByBookID(bookID);
    }

    @PostMapping("/review")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review){
        reviewService.addNewReview(review);
        return  new ResponseEntity<>(HttpStatus.CREATED);
    }
}
