

import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../Config';
import { useAudio } from '../AudioContext';
import { FaComments } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
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
    const [reviewRating, setReviewRating] = useState(0); // ✅ FIX added here

    const audioRef = useRef(null);
    const { setIsAudioPlayerVisible } = useAudio();
    const { playAudio } = useAudio();
    const userId = newid?.id || "";
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,   
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "20px",
         
      };
      
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
                if (bookResponse.data && bookResponse.data.data) {
                    setDemoBook(bookResponse.data.data);
                }
                console.log("Farhan - Reviews:", bookResponse.data.data.reviews);
                const questionResponse = await axios.get(`${BASE_URL}/getquestionanswerbyid/${id}`);
                if (questionResponse.data && questionResponse.data.data) {
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
            await axios.post(`${BASE_URL}/reviews`, {
                user_id: userId,
                book_id: id,
                comment: reviewText,
                rating: reviewRating
            });
            toast.success("Review submitted successfully!");
            setShowReviewModal(false);
            setReviewText("");
            setReviewRating(0);

        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Error submitting review. Please try again.");
        }
    };

    if (!demoBook) {
        return <div className="text-white text-center py-8">Loading book details...</div>;
    }
    // review get


    return (
        <div className="bg-custom text-white font-['Inter'] container">
            <ToastContainer/>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center justify-between mb-12">
                    <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white text-xxl">
                        <i className="fa-solid fa-chevron-left me-2 " /> Back to Dashboard
                    </Link>
                </nav>
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
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
    <button
        onClick={() => setShowReviewModal(true)}
        className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
        style={{ color: "black" }}
    >
        <FaComments className="text-2xl" />
        <span>Review</span>
    </button>
</div> */}

                            {/* Display Reviews */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-semibold text-white">review</h4>
                                        <div className="text-yellow-400"> */}
                            {/* {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}>{star <= review.rating ? "★" : "☆"}</span>
                                            ))} */}
                            {/* <span >★★★★★</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm">review.comment</p>
                                </div> 
                            </div>  */}
                        </div>
                        {showReviewModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 ">
                                <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative ">
                                    <h3 className="text-xl font-bold text-amber-400 mb-4">Write Your Review</h3>
                                    <div className="flex items-center mb-4  ">
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
                                        {/* <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button> */}
                                        <button onClick={submitReview} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {currentModal === 'flipbook' && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" style={{ height: "auto" }}>
                        <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
                            <h3 className="text-xl font-bold text-amber-400 mb-4">Flipbook & Audio - {demoBook?.book_name}</h3>
                            <iframe
                                src={demoBook?.flip_book_url}
                                width="100%"
                                height="500"
                                className="rounded-lg"
                                style={{ border: 'none' }}
                                allowFullScreen
                            ></iframe>
                            <audio ref={audioRef} controls className="w-full mt-4 mobileaudio" controlsList="nodownload">
                                <source src={demoBook?.audio_book_url} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                            <button
                                onClick={() => playAudio(demoBook.audio_book_url, demoBook.book_name)}
                                className="!rounded-button deskaudio  bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 mt-3"
                                style={{ color: "black", width: "100%" }}
                            >
                                <i className="fas fa-book-open me-2"></i> Audio Play
                            </button>
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                ✖ Close
                            </button>
                        </div>
                    </div>
                )}
                {showQuiz && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative">
                            {!quizCompleted ? (
                                <>
                                    <h3 className="text-xl font-bold text-amber-400 mb-4">Question {currentQuestion + 1} of {questions.length}</h3>
                                    <h2 className="mb-4 text-lg text-yellow-300">{questions[currentQuestion]?.question}</h2>
                                    {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index)}
                                            className={`block w-full p-3 mb-2 rounded-md text-left ${selectedAnswers[questions[currentQuestion]?.id] === String(index + 1)
                                                ? 'bg-blue-500'
                                                : 'bg-gray-700'
                                                }`}
                                        >
                                            {questions[currentQuestion]?.[opt]}
                                        </button>
                                    ))}
                                    <div className="flex justify-between mt-4">
                                        <button onClick={handlePrev} disabled={currentQuestion === 0} className="bg-gray-500 text-white p-2 rounded-md">Previous</button>
                                        {currentQuestion + 1 === questions.length ? (
                                            <button onClick={submitTest} className="bg-green-500 text-white p-2 rounded-md">Submit</button>
                                        ) : (
                                            <button onClick={handleNext} className="bg-blue-500 p-2 rounded-md text-white">Next</button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-white">
                                    <h3 className="text-3xl font-bold mb-4">{scoreData?.message}</h3>
                                    <p className="text-lg mb-2">
                                        ✅ Correct Answers: <span className="text-green-400 font-bold">{scoreData?.correctAnswers}</span> / {scoreData?.totalQuestions}
                                    </p>
                                    <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                                        Close
                                    </button>
                                </div>
                            )}
                            <button onClick={closeModal} className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">✖</button>
                        </div>
                    </div>
                )}
            </div>

            <section className="testimonials-section" style={{ marginTop: "-140px" }}>
  <div className="testimonials-container">
    <div className="testimonials-grid">
      {!demoBook ? (
        <p>Loading...</p>
      ) : demoBook.reviews && Array.isArray(demoBook.reviews) && demoBook.reviews.length > 0 ? (
        <Slider {...settings}>
          {demoBook.reviews.map((review, index) => (
            <div key={review.review_id || index} className="testimonial-card"  >
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
          ))}
        </Slider>
      ) : (
        <p className="no-reviews">No reviews available</p>
      )}
    </div>
  </div>
</section>

            {localStorage.getItem('Role') === 'user' && (
                <div className="ml-20 bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
                    <h3 className="text-xl font-bold text-amber-400 mb-4">Write Your Review</h3>
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
                        {/* <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button> */}
                        <button onClick={submitReview} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookDetails;























// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { toast ,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BASE_URL from '../../Config';
// import { useAudio } from '../AudioContext';
// import { FaComments } from "react-icons/fa";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

// const BookDetails = () => {
//   const { id } = useParams();
//   const [demoBook, setDemoBook] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentModal, setCurrentModal] = useState(null);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [scoreData, setScoreData] = useState(null);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const [newid, setNewId] = useState("");
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [reviewText, setReviewText] = useState("");
//   const [reviewRating, setReviewRating] = useState(0); // ✅ FIX added here

//   const audioRef = useRef(null);
//   const { setIsAudioPlayerVisible } = useAudio();
//   const { playAudio } = useAudio();
//   const userId = newid?.id || "";

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const usernewid = localStorage.getItem("userdata");
//     if (usernewid) {
//       setNewId(JSON.parse(usernewid));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchBookAndQuestions = async () => {
//       try {
//         const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
//         if (bookResponse.data && bookResponse.data.data) {
//           setDemoBook(bookResponse.data.data);
//         }
//         console.log("Farhan - Reviews:", bookResponse.data.data.reviews);
//         const questionResponse = await axios.get(
//           `${BASE_URL}/getquestionanswerbyid/${id}`
//         );
//         if (questionResponse.data && questionResponse.data.data) {
//           setQuestions(questionResponse.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching book or questions:", error);
//       }
//     };
//     fetchBookAndQuestions();
//   }, [id]);

//   const closeModal = () => {
//     setCurrentModal(null);
//     setShowQuiz(false);
//     setQuizCompleted(false);
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setScoreData(null);
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//   };

//   const handleAnswerSelect = (optionIndex) => {
//     const questionId = questions[currentQuestion]?.id;
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [questionId]: String(optionIndex + 1),
//     });
//   };

//   const handleNext = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const submitTest = async () => {
//     try {
//       let correctCount = 0;
//       questions.forEach((q) => {
//         const selected = selectedAnswers[q.id];
//         const correct = q.correct_option;
//         if (String(selected) === String(correct)) {
//           correctCount += 1;
//         }
//       });

//       const testData = {
//         book_id: id,
//         user_id: userId,
//         correct_answers: correctCount,
//         total_questions: questions.length,
//       };

//       const response = await axios.post(
//         `${BASE_URL}/submitChallengeTest`,
//         testData
//       );
//       const {
//         correct_answers,
//         total_questions,
//         message,
//         status,
//         requiredCorrect,
//       } = response.data;

//       const scorePercent = ((correct_answers / total_questions) * 100).toFixed(
//         2
//       );

//       setScoreData({
//         correctAnswers: correct_answers,
//         totalQuestions: total_questions,
//         score: scorePercent,
//         message,
//         status,
//         requiredCorrect,
//       });
//       setQuizCompleted(true);
//       toast.success("Test submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting test:", error);
//       toast.error("Error submitting test. Please try again.");
//     }
//   };

//   const submitReview = async () => {
//     try {
//       await axios.post(`${BASE_URL}/reviews`, {
//         user_id: userId,
//         book_id: id,
//         comment: reviewText,
//         rating: reviewRating,
//       });
//       toast.success("Review submitted successfully!");
//       setShowReviewModal(false);
//       setReviewText("");
//       setReviewRating(0);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       toast.error("Error submitting review. Please try again.");
//     }
//   };

//   if (!demoBook) {
//     return (
//       <div className="text-white text-center py-8">Loading book details...</div>
//     );
//   }
//   // review get

//   return (
//     <div className="bg-custom text-white font-['Inter'] container">
//       <ToastContainer />
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <nav className="flex items-center justify-between mb-12">
//           <Link
//             to="/Dashboard"
//             className="d-flex align-items-center mb-4 text-decoration-none text-white text-xxl"
//           >
//             <i className="fa-solid fa-chevron-left me-2 " /> Back to Dashboard
//           </Link>
//         </nav>
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="flex flex-col items-center lg:items-start">
//             <div className="relative w-full max-w-md aspect-[3/4] mb-8">
//               <img
//                 src={demoBook?.image}
//                 alt={demoBook?.book_name}
//                 className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
//                 onClick={() => setCurrentModal("flipbook")}
//               />
//             </div>
//           </div>
//           <div className="space-y-8">
//             <h1 className="text-4xl font-bold text-amber-400 mb-4">
//               {demoBook?.book_name}
//             </h1>
//             <p className="text-xl mb-8">by {demoBook?.author}</p>
//             <div className="bg-gray-900 rounded-lg p-8 mb-8">
//               <h2 className="text-2xl font-semibold text-amber-400 mb-4">
//                 Book Summary
//               </h2>
//               <p className="text-gray-300 leading-relaxed">
//                 {demoBook?.description}
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <button
//                 onClick={() => setCurrentModal("flipbook")}
//                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                 style={{ color: "black" }}
//               >
//                 <i className="fas fa-book-open text-2xl"></i>
//                 <span>Read & Listen</span>
//               </button>
//               <button
//                 onClick={() => setShowQuiz(true)}
//                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                 style={{ color: "black" }}
//               >
//                 <i className="fas fa-pencil-alt text-2xl"></i>
//                 <span>Test Knowledge</span>
//               </button>
//                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
//     <button
//         onClick={() => setShowReviewModal(true)}
//         className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//         style={{ color: "black" }}
//     >
//         <FaComments className="text-2xl" />
//         <span>Review</span>
//     </button>
// </div>  */}

//               {/* Display Reviews */}
//               {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                                 <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <h4 className="text-lg font-semibold text-white">review</h4>
//                                         <div className="text-yellow-400"> */}
//               {/* {[1, 2, 3, 4, 5].map((star) => (
//                                                 <span key={star}>{star <= review.rating ? "★" : "☆"}</span>
//                                             ))} */}
//               {/* <span >★★★★★</span>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-300 text-sm">review.comment</p>
//                                 </div> 
//                             </div>  */}
//             </div>
//             {showReviewModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 ">
//                 <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative ">
//                   <h3 className="text-xl font-bold text-amber-400 mb-4">
//                     Write Your Review
//                   </h3>
//                   <div className="flex items-center mb-4  ">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() => setReviewRating(star)}
//                         className={`text-3xl mx-1 ${
//                           reviewRating >= star
//                             ? "text-yellow-400"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         ★
//                       </button>
//                     ))}
//                   </div>
//                   <textarea
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     className="w-full p-2 text-black"
//                     rows="4"
//                     placeholder="Write your review here..."
//                   ></textarea>
//                   <div className="flex justify-between mt-4">
//                     {/* <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button> */}
//                     <button
//                       onClick={submitReview}
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {currentModal === "flipbook" && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
//             style={{ height: "auto" }}
//           >
//             <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
//               <h3 className="text-xl font-bold text-amber-400 mb-4">
//                 Flipbook & Audio - {demoBook?.book_name}
//               </h3>
//               <iframe
//                 src={demoBook?.flip_book_url}
//                 width="100%"
//                 height="500"
//                 className="rounded-lg"
//                 style={{ border: "none" }}
//                 allowFullScreen
//               ></iframe>
//               <audio
//                 ref={audioRef}
//                 controls
//                 className="w-full mt-4 mobileaudio"
//                 controlsList="nodownload"
//               >
//                 <source src={demoBook?.audio_book_url} type="audio/mp3" />
//                 Your browser does not support the audio element.
//               </audio>
//               <button
//                 onClick={() =>
//                   playAudio(demoBook.audio_book_url, demoBook.book_name)
//                 }
//                 className="!rounded-button deskaudio  bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 mt-3"
//                 style={{ color: "black", width: "100%" }}
//               >
//                 <i className="fas fa-book-open me-2"></i> Audio Play
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 ✖ Close
//               </button>
//             </div>
//           </div>
//         )}
//         {showQuiz && (
//           <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//             <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative">
//               {!quizCompleted ? (
//                 <>
//                   <h3 className="text-xl font-bold text-amber-400 mb-4">
//                     Question {currentQuestion + 1} of {questions.length}
//                   </h3>
//                   <h2 className="mb-4 text-lg text-yellow-300">
//                     {questions[currentQuestion]?.question}
//                   </h2>
//                   {["option_1", "option_2", "option_3", "option_4"].map(
//                     (opt, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleAnswerSelect(index)}
//                         className={`block w-full p-3 mb-2 rounded-md text-left ${
//                           selectedAnswers[questions[currentQuestion]?.id] ===
//                           String(index + 1)
//                             ? "bg-blue-500"
//                             : "bg-gray-700"
//                         }`}
//                       >
//                         {questions[currentQuestion]?.[opt]}
//                       </button>
//                     )
//                   )}
//                   <div className="flex justify-between mt-4">
//                     <button
//                       onClick={handlePrev}
//                       disabled={currentQuestion === 0}
//                       className="bg-gray-500 text-white p-2 rounded-md"
//                     >
//                       Previous
//                     </button>
//                     {currentQuestion + 1 === questions.length ? (
//                       <button
//                         onClick={submitTest}
//                         className="bg-green-500 text-white p-2 rounded-md"
//                       >
//                         Submit
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleNext}
//                         className="bg-blue-500 p-2 rounded-md text-white"
//                       >
//                         Next
//                       </button>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center text-white">
//                   <h3 className="text-3xl font-bold mb-4">
//                     {scoreData?.message}
//                   </h3>
//                   <p className="text-lg mb-2">
//                     ✅ Correct Answers:{" "}
//                     <span className="text-green-400 font-bold">
//                       {scoreData?.correctAnswers}
//                     </span>{" "}
//                     / {scoreData?.totalQuestions}
//                   </p>
//                   <button
//                     onClick={closeModal}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     Close
//                   </button>
//                 </div>
//               )}
//               <button
//                 onClick={closeModal}
//                 className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 ✖
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <section className="testimonials-section" style={{ marginTop: "-140px" }}>
//         <div className="testimonials-container">
//           <div className="tesimonials-grid">
//             {!demoBook ? (
//               <p>Loading...</p>
//             ) : demoBook.reviews?.length > 0 ? (
//               <Slider {...settings}>
//                 {demoBook.reviews.map((review, index) => (
//                   <div
//                     key={review.review_id || index}
//                     className="testimonial-card"
//                   >
//                     <div className="testimonial-rating">
//                       {"★".repeat(review.rating)}
//                       {"☆".repeat(5 - review.rating)}
//                     </div>
//                     <p className="testimonial-text">{review.comment}</p>
//                     <div className="testimonial-author">
//                       <img
//                         src={`https://i.pravatar.cc/150?img=${index + 1}`}
//                         alt="User"
//                         className="author-image"
//                       />
//                       <div className="author-info">
//                         <h4>{review.reviewer_name}</h4>
//                         <p>Verified Reader</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <p className="no-reviews">No reviews available</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {localStorage.getItem("Role") === "user" && (
//         <div className="ml-20 bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
//           <h3 className="text-xl font-bold text-amber-400 mb-4">
//             Write Your Review
//           </h3>
//           <div className="flex items-center mb-4">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 onClick={() => setReviewRating(star)}
//                 className={`text-3xl mx-1 ${
//                   reviewRating >= star ? "text-yellow-400" : "text-gray-500"
//                 }`}
//               >
//                 ★
//               </button>
//             ))}
//           </div>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             className="w-full p-2 text-black"
//             rows="4"
//             placeholder="Write your review here..."
//           ></textarea>
//           <div className="flex justify-between mt-4">
//             {/* <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button> */}
//             <button
//               onClick={submitReview}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookDetails;
