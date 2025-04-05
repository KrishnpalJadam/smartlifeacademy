// sab imports wahi rehenge
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../Config';
import { useAudio } from '../AudioContext';

const BookDetails = () => {
    const { id } = useParams();
    const [demoBook, setDemoBook] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentModal, setCurrentModal] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [scoreData, setScoreData] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [newid, setNewId] = useState("");
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0); // ⭐ new state

    const audioRef = useRef(null);
    const { setIsAudioPlayerVisible } = useAudio();
    const { playAudio } = useAudio();
    const userId = newid?.id || "";

    useEffect(() => {
        const usernewid = localStorage.getItem('userdata');
        if (usernewid) {
            setNewId(JSON.parse(usernewid))
        }
    }, []);

    useEffect(() => {
        const fetchBookAndQuestions = async () => {
            try {
                const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
                if (bookResponse.data?.data) {
                    setDemoBook(bookResponse.data.data);
                }

                const questionResponse = await axios.get(`${BASE_URL}/getquestionanswerbyid/${id}`);
                if (questionResponse.data?.data) {
                    setQuestions(questionResponse.data.data);
                }
            } catch (error) {
                console.error("Error fetching book or questions:", error);
            }
        };
        fetchBookAndQuestions();
    }, [id]);

    const closeModal = () => {
        setCurrentModal(null);
        setShowQuiz(false);
        setQuizCompleted(false);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setScoreData(null);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        const questionId = questions[currentQuestion]?.id;
        setSelectedAnswers({ ...selectedAnswers, [questionId]: String(optionIndex + 1) });
    };

    const handleNext = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const submitTest = async () => {
        try {
            let correctCount = 0;
            questions.forEach((q) => {
                const selected = selectedAnswers[q.id];
                const correct = q.correct_option;
                if (String(selected) === String(correct)) {
                    correctCount += 1;
                }
            });

            const testData = {
                book_id: id,
                user_id: userId,
                correct_answers: correctCount,
                total_questions: questions.length
            };

            const response = await axios.post(`${BASE_URL}/submitChallengeTest`, testData);
            const { correct_answers, total_questions, message, status, requiredCorrect } = response.data;
            const scorePercent = ((correct_answers / total_questions) * 100).toFixed(2);

            setScoreData({
                correctAnswers: correct_answers,
                totalQuestions: total_questions,
                score: scorePercent,
                message,
                status,
                requiredCorrect
            }); 
            setQuizCompleted(true);
            toast.success("Test submitted successfully!");
        } catch (error) {
            console.error("Error submitting test:", error);
            toast.error("Error submitting test. Please try again.");
        }
    };

    const submitReview = async () => {
        try {
            await axios.post(`${BASE_URL}/submitReview`, {
                book_id: id,
                review: reviewText,
                rating: reviewRating
            });
            toast.success("Review submitted successfully!");
            setShowReviewModal(false);
            setReviewText("");
            setReviewRating(0); // reset after submit
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Error submitting r eview. Please try again.");
        }
    };

    if (!demoBook) {
        return <div className="text-white text-center py-8">Loading book details...</div>;
    }

    return (
        <div className="bg-custom text-white font-['Inter'] container">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Nav */}
                <nav className="flex items-center justify-between mb-12">
                    <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                        <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
                    </Link>
                </nav>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="relative w-full max-w-md aspect-[3/4] mb-8">
                            <img
                                src={demoBook?.image}
                                alt={demoBook?.book_name}
                                className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
                                onClick={() => setCurrentModal('flipbook')}
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-amber-400 mb-4">{demoBook?.book_name}</h1>
                        <p className="text-xl mb-8">by {demoBook?.author}</p>

                        <div className="bg-gray-900 rounded-lg p-8 mb-8">
                            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Book Summary</h2>
                            <p className="text-gray-300 leading-relaxed">{demoBook?.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => setCurrentModal('flipbook')}
                                className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
                                style={{ color: "black" }}
                            >
                                <i className="fas fa-book-open text-2xl"></i>
                                <span>Read & Listen</span>
                            </button>

                            <button
                                onClick={() => setShowQuiz(true)}
                                className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
                                style={{ color: "black" }}
                            >
                                <i className="fas fa-pencil-alt text-2xl"></i>
                                <span>Test Knowledge</span>
                            </button>

                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
                                style={{ color: "black" }}
                            >
                                <i className="fas fa-star text-2xl"></i>
                                <span>Review</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ⭐ Review Modal */}
                {showReviewModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative">
                            <h3 className="text-xl font-bold text-amber-400 mb-4">Write Your Review</h3>

                            {/* Star Rating */}
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setReviewRating(star)}
                                        className={`text-3xl mx-1 ${reviewRating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="w-full p-2 text-black"
                                rows="4"
                                placeholder="Write your review here..."
                            ></textarea>

                            <div className="flex justify-between mt-4">
                                <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                                <button onClick={submitReview} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rest of your flipbook and quiz modal code yahi same rehenge */}
                {/* ... */}

            </div>
        </div>
    );
};

export default BookDetails;
















































import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../Config';


const Testimonial = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [challengeUsers, setChallengeUsers] = useState([]);
    const navigate = useNavigate();

    // ✅ Move this function outside useEffect so we can call it anytime
    const getChallengeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getReviews`);
            console.log("challengeData", response.data);

            if (response.data && Array.isArray(response.data.data)) {
                setChallengeUsers(response.data.data);
            } else {
                setChallengeUsers([]);
            }
        } catch (error) {
            console.error("Error fetching challenge data:", error);
            setChallengeUsers([]);
        }
    };

    useEffect(() => {
        getChallengeData();
    }, []);

    const filteredChallengeUsers = Array.isArray(challengeUsers)
        ? challengeUsers.filter((user) =>
            (user.firstname || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
    return (
        <div>
            <section className="testimonials-section">
            <div className="testimonials-container">
  <div className="testimonials-grid" >
      {/* Agar data load ho raha hai toh "Loading" dikhaye */}
      {!demoBook ? (
        <p>Loading...</p>
      ) : demoBook.reviews && Array.isArray(demoBook.reviews) && demoBook.reviews.length > 0 ? (
        demoBook.reviews.map((review, index) => (
          <div key={review.review_id || index} className="testimonial-card">
            <div className="testimonial-rating">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
            <p className="testimonial-text">{review.comment}</p>
            <div className="testimonial-author">
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt="User"
                className="author-image"
              />
              <div className="author-info">
                <h4>{review.reviewer_name}</h4>
                <p>Verified Reader</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews available</p>
      )}
    </div>

  </div>
            </section>
        </div>
    )
}

export default Testimonial
