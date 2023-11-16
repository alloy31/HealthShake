package com.jhgpt.model.service;

import java.util.List;

import com.jhgpt.model.dto.Review;

public interface ReviewService {

    List<Review> getAllReviews();

    List<Review> getReviewsByMember(int member_code);

    List<Review> getReviewsByWriter(int review_writer);

    Review selectOneReview(int review_code);

    void addReview(Review review);

    void deleteReview(int review_code);

    void updateReview(Review review);
}
