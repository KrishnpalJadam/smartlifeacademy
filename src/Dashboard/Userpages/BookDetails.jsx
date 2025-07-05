
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BASE_URL from '../../Config';
// import { useAudio } from '../AudioContext';
// import { FaComments } from "react-icons/fa";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import axios from 'axios';
// const BookDetails = () => {
//     const { id } = useParams();
//     const [demoBook, setDemoBook] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [currentModal, setCurrentModal] = useState(null);
//     const [showQuiz, setShowQuiz] = useState(false);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedAnswers, setSelectedAnswers] = useState({});
//     const [scoreData, setScoreData] = useState(null);
//     const [quizCompleted, setQuizCompleted] = useState(false);

//     const [newid, setNewId] = useState("");
//     const [showReviewModal, setShowReviewModal] = useState(false);
//     const [reviewText, setReviewText] = useState("");
//     const [reviewRating, setReviewRating] = useState(0); // ✅ FIX added here
//     const [recapMode, setRecapMode] = useState(false);
//     const [listenProgress, setListenProgress] = useState(0);
//     // const [listenedTime, setListenedTime] = useState(0);
//     const lastSavedSecondRef = useRef(0);


//     const [audioStatus, setAudioStatus] = useState("incomplete"); // default
//     const [buttonClickedWhileDisabled, setButtonClickedWhileDisabled] = useState(false);
//     let lastSentPercent = 0;
//     const lastSentPercentRef = useRef(0); // ✅ Yeh persist karega render ke beech
//     const audioRef = useRef(null);

//     const { setIsAudioPlayerVisible } = useAudio();
//     const { playAudio } = useAudio();
//     const userId = newid?.id || "";

//     const planName = localStorage.getItem("plan_name");
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         centerMode: true,
//         centerPadding: "20px",
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     centerMode: false
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: false
//                 }
//             }
//         ]
//     };

//     useEffect(() => {
//         const usernewid = localStorage.getItem('userdata');
//         if (usernewid) {
//             setNewId(JSON.parse(usernewid))
//         }
//     }, []);
//     useEffect(() => {
//         if (currentModal !== 'flipbook') return;

//         const audio = audioRef.current;
//         if (!audio) return;

//         let interval = null;
//         let lastSavedSecond = 0;

//         const trackListeningTime = () => {
//             setListenedTime(prev => prev + 1);
//         };

//         const handlePlay = () => {
//             interval = setInterval(trackListeningTime, 1000);
//         };

//         const handlePause = () => {
//             clearInterval(interval);
//             saveProgressToBackend(audio.currentTime, audio.duration);
//         };

//         const handleEnded = () => {
//             clearInterval(interval);
//             saveProgressToBackend(audio.currentTime, audio.duration);
//         };

//         const handleTimeUpdate = () => {
//             const percent = (audio.currentTime / audio.duration) * 100;
//             setListenProgress(percent.toFixed(2));

//             const currentSecond = Math.floor(audio.currentTime);
//             if (currentSecond % 10 === 0 && currentSecond !== lastSavedSecond) {
//                 lastSavedSecond = currentSecond;
//                 saveProgressToBackend(audio.currentTime, audio.duration);
//             }
//         };

//         // Attach listeners
//         audio.addEventListener('play', handlePlay);
//         audio.addEventListener('pause', handlePause);
//         audio.addEventListener('ended', handleEnded);
//         audio.addEventListener('timeupdate', handleTimeUpdate);

//         return () => {
//             audio.removeEventListener('play', handlePlay);
//             audio.removeEventListener('pause', handlePause);
//             audio.removeEventListener('ended', handleEnded);
//             audio.removeEventListener('timeupdate', handleTimeUpdate);
//             clearInterval(interval);
//         };
//     }, [currentModal]); 

//     // important to track change

//     const waitUntilComplete = async () => {
//         let attempts = 0;
//         const maxAttempts = 5;

//         while (attempts < maxAttempts) {
//             const response = await axios.get(`${BASE_URL}/getAudioProgress`, {
//                 params: { user_id: userId, book_id: id }
//             });

//             if (response.data?.data?.status === "complete") {
//                 setAudioStatus("complete");
//                 break;
//             }

//             attempts++;
//             await new Promise((res) => setTimeout(res, 1000)); // wait 1 second before retry
//         }
//     };
//     const saveProgressToBackend = async (currentTime, duration) => {
//         const percent_complete = ((currentTime / duration) * 100).toFixed(2);
//         const progressInterval = Math.floor(percent_complete / 10) * 10;

//         if (percent_complete >= progressInterval && percent_complete < 100 && lastSentPercentRef.current < progressInterval) {
//             await axios.post(`${BASE_URL}/adioprogress`, {
//                 user_id: userId,
//                 book_id: id,
//                 progress: percent_complete,
//             });
//             lastSentPercentRef.current = progressInterval;
//         } else if (percent_complete >= 100 && lastSentPercentRef.current < 100) {
//             await axios.post(`${BASE_URL}/adioprogress`, {
//                 user_id: userId,
//                 book_id: id,
//                 progress: percent_complete,
//             });
//             lastSentPercentRef.current = 100;
//             await waitUntilComplete(); // ✅ status complete hone tak wait karo
//         }
//     };




//     // const handleTimeUpdate = () => {
//     //     const percent = (audio.currentTime / audio.duration) * 100;
//     //     const roundedPercent = Math.floor(percent / 10) * 10; // for GET + POST every 10%
//     //     setListenProgress(percent.toFixed(2));

//     //     if (roundedPercent !== lastSentPercent && roundedPercent < 100) {
//     //         saveProgressToBackend(audio.currentTime, audio.duration);
//     //         fetchAudioStatus(); // GET request on every 10%
//     //     }
//     // };


//     useEffect(() => {
//         if (currentModal !== 'flipbook') return;

//         const audio = audioRef.current;
//         if (!audio) return;

//         let interval = null;
//         let progressChecker = null;
//         let lastSavedSecond = 0;

//         const trackListeningTime = () => {
//             setListenedTime(prev => prev + 1);
//         };

//         const handlePlay = () => {
//             interval = setInterval(trackListeningTime, 1000);
//             progressChecker = setInterval(waitUntilComplete, 5000); // ✅ status check every 5s
//         };

//         const handlePause = () => {
//             clearInterval(interval);
//             clearInterval(progressChecker);
//             saveProgressToBackend(audio.currentTime, audio.duration);
//         };

//         const handleEnded = () => {
//             clearInterval(interval);
//             clearInterval(progressChecker);
//             saveProgressToBackend(audio.currentTime, audio.duration);
//         };

//         const handleTimeUpdate = () => {
//             const percent = (audio.currentTime / audio.duration) * 100;
//             setListenProgress(percent.toFixed(2));

//             const currentSecond = Math.floor(audio.currentTime);
//             if (currentSecond % 10 === 0 && currentSecond !== lastSavedSecond) {
//                 lastSavedSecond = currentSecond;
//                 saveProgressToBackend(audio.currentTime, audio.duration);
//             }
//         };

//         // Attach listeners
//         audio.addEventListener('play', handlePlay);
//         audio.addEventListener('pause', handlePause);
//         audio.addEventListener('ended', handleEnded);
//         audio.addEventListener('timeupdate', handleTimeUpdate);

//         return () => {
//             audio.removeEventListener('play', handlePlay);
//             audio.removeEventListener('pause', handlePause);
//             audio.removeEventListener('ended', handleEnded);
//             audio.removeEventListener('timeupdate', handleTimeUpdate);
//             clearInterval(interval);
//             clearInterval(progressChecker);
//         };
//     }, [currentModal]);




//     useEffect(() => {
//         const fetchBookAndQuestions = async () => {
//             try {
//                 const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
//                 if (bookResponse.data && bookResponse.data.data) {
//                     setDemoBook(bookResponse.data.data);
//                     // Save the book ID to local storage
//                     localStorage.setItem('currentBookId', id);
//                 }

//                 const questionResponse = await axios.get(`${BASE_URL}/getquestionanswerbyid/${id}`);
//                 if (questionResponse.data && questionResponse.data.data) {
//                     setQuestions(questionResponse.data.data);

//                 }
//             } catch (error) {
//                 console.error("Error fetching book or questions:", error);
//             }
//         };
//         fetchBookAndQuestions();
//     }, [id]);

//     useEffect(() => {
//         const fetchAudioStatus = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/getAudioProgress`, {
//                     params: { user_id: userId, book_id: id }
//                 });
//                 if (response.data?.data?.status === "complete") {
//                     setAudioStatus("complete");
//                 }
//             } catch (error) {
//                 console.error("Error fetching audio progress:", error);
//             }
//         };

//         if (userId && id) {
//             fetchAudioStatus();
//         }
//     }, [id, userId]);


//     useEffect(() => {
//         const attempted = localStorage.getItem(`testAttempted_${id}_${userId}`);
//         if (attempted === "true") {
//             setQuizCompleted(true);
//             setAudioStatus("complete");  // force button enable after test dene ke baad
//             // don't open recap modal on load
//         }
//     }, [id, userId]);




//     const closeModal = () => {
//         setCurrentModal(null);
//         setShowQuiz(false);
//         setQuizCompleted(false);
//         setCurrentQuestion(0);
//         setSelectedAnswers({});
//         setScoreData(null);
//         if (audioRef.current) {
//             audioRef.current.pause();
//         }
//     };

//     const handleAnswerSelect = (optionIndex) => {
//         const questionId = questions[currentQuestion]?.id;
//         setSelectedAnswers({ ...selectedAnswers, [questionId]: String(optionIndex + 1) });
//     };

//     const handleNext = () => {
//         if (currentQuestion + 1 < questions.length) {
//             setCurrentQuestion(currentQuestion + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (currentQuestion > 0) {
//             setCurrentQuestion(currentQuestion - 1);
//         }
//     };

//     const submitTest = async () => {
//         try {
//             let correctCount = 0;
//             questions.forEach((q) => {
//                 const selected = selectedAnswers[q.id];
//                 const correct = q.correct_option;
//                 if (String(selected) === String(correct)) {
//                     correctCount += 1;
//                 }
//             });

//             const testData = {
//                 book_id: id,
//                 user_id: userId,
//                 correct_answers: correctCount,
//                 total_questions: questions.length
//             };

//             localStorage.setItem("testData", JSON.stringify(testData));

//             const response = await axios.post(`${BASE_URL}/submitChallengeTest`, testData);
//             const { correct_answers, total_questions, message, status, requiredCorrect } = response.data;

//             const scorePercent = ((correct_answers / total_questions) * 100).toFixed(2);

//             setScoreData({
//                 correctAnswers: correct_answers,
//                 totalQuestions: total_questions,
//                 score: scorePercent,
//                 message,
//                 status,
//                 requiredCorrect
//             });
//             setQuizCompleted(true);
//             setRecapMode(false); // Reset recap mode after submission
//             localStorage.setItem(`testAttempted_${id}_${userId}`, "true");


//             toast.success("Test submitted successfully!");

//         } catch (error) {
//             console.error("Error submitting test:", error);
//             toast.error("You have already attempted this book today.");
//         }
//     };


//     const submitReview = async () => {
//         try {
//             await axios.post(`${BASE_URL}/reviews`, {
//                 user_id: userId,
//                 book_id: id,
//                 comment: reviewText,
//                 rating: reviewRating
//             });
//             toast.success("Review submitted successfully!");
//             setShowReviewModal(false);
//             setReviewText("");
//             setReviewRating(0);

//         } catch (error) {
//             console.error("Error submitting review:", error);
//             toast.error("Error submitting review. Please try again.");
//         }
//     };

//     if (!demoBook) {
//         return <div className="text-white text-center py-8">Loading book details...</div>;
//     }
//     // review get


//     return (
//         <div className="bg-custom text-white font-['Inter'] container">
//             <ToastContainer />
//             <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <nav className="flex items-center justify-between mb-12">
//                     <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white text-xxl">
//                         <i className="fa-solid fa-chevron-left me-2 " /> Back to Dashboard
//                     </Link>
//                 </nav>
//                 <div className="grid lg:grid-cols-2 gap-12">
//                     <div className="flex flex-col items-center lg:items-start">
//                         <div className="relative w-full max-w-md aspect-[3/4] mb-8">
//                             <img
//                                 src={demoBook?.image}
//                                 alt={demoBook?.book_name}
//                                 className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
//                                 onClick={() => setCurrentModal('flipbook')}
//                             />
//                         </div>
//                     </div>
//                     <div className="space-y-8">
//                         <h1 className="text-4xl font-bold text-amber-400 mb-4">{demoBook?.book_name}</h1>
//                         <p className="text-xl mb-8">by {demoBook?.author}</p>
//                         <div className="bg-gray-900 rounded-lg p-8 mb-8">
//                             <h2 className="text-2xl font-semibold text-amber-400 mb-4">Book Summary</h2>
//                             <p className="text-gray-300 leading-relaxed">{demoBook?.description}</p>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <button
//                                 onClick={() => setCurrentModal('flipbook')}
//                                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                                 style={{ color: "black" }}
//                             >
//                                 <i className="fas fa-book-open text-2xl"></i>
//                                 <span>Read & Listen</span>
//                             </button>
//                             {planName === "1 Month" && localStorage.getItem("Role") !== "admin" && (
//                                 <button
//                                     onClick={() => {
//                                         const alreadyAttempted = localStorage.getItem(`testAttempted_${id}_${userId}`) === "true";

//                                         if (audioStatus === "complete") {
//                                             if (alreadyAttempted) {
//                                                 setRecapMode(true);
//                                                 setShowQuiz(true);
//                                             } else {
//                                                 setShowQuiz(true);
//                                             }
//                                         } else {
//                                             toast.warn("You did not listen to the book yet. Please complete the book summary to access the test");
//                                         }
//                                     }}
//                                     className={`!rounded-button flex items-center justify-center space-x-3 py-4 px-6 text-lg font-semibold transition-colors ${audioStatus === "complete"
//                                         ? "bg-amber-400 hover:bg-amber-500 text-black cursor-pointer"
//                                         : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                                         }`}
//                                 >
//                                     <i className="fas fa-pencil-alt text-2xl"></i>
//                                     <span>Test Knowledge</span>
//                                 </button>
//                             )}





//                         </div>
//                         {showReviewModal && (
//                             <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 ">
//                                 <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative ">
//                                     <h3 className="text-xl font-bold text-amber-400 mb-4">Write Your Review</h3>
//                                     <div className="flex items-center mb-4  ">
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <button
//                                                 key={star}
//                                                 onClick={() => setReviewRating(star)}
//                                                 className={`text-3xl mx-1 ${reviewRating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
//                                             >
//                                                 ★
//                                             </button>
//                                         ))}
//                                     </div>
//                                     <textarea
//                                         value={reviewText}
//                                         onChange={(e) => setReviewText(e.target.value)}
//                                         className="w-full p-2 text-black"
//                                         rows="4"
//                                         placeholder="Write your review here..."
//                                     ></textarea>
//                                     <div className="flex justify-between mt-4">
//                                         {/* <button onClick={() => setShowReviewModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button> */}
//                                         <button onClick={submitReview} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>



//                 {currentModal === 'flipbook' && (
//                     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" style={{ height: "100%" }}>
//                         <div className="bg-gray-900 p-6 rounded-lg w-full max-w-full relative max-h-full overflow-y-auto">
//                             <h3 className="text-xl font-bold text-amber-400 mb-4">Flipbook & Audio - {demoBook?.book_name}</h3>
//                             <iframe
//                                 src={demoBook?.flip_book_url}
//                                 width="100%"
//                                 height="500"
//                                 className="rounded-lg"
//                                 style={{ border: 'none' }}
//                                 allowFullScreen
//                             ></iframe>
//                             <audio ref={audioRef} controls className="w-full mt-4 mobileaudio" controlsList="nodownload">
//                                 <source src={demoBook?.audio_book_url} type="audio/mp3" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                             <button
//                                 onClick={() => playAudio(demoBook.audio_book_url, demoBook.book_name)}
//                                 className="!rounded-button deskaudio bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 mt-3"
//                                 style={{ color: "black", width: "100%" }}
//                             >
//                                 <i className="fas fa-book-open me-2"></i> Audio Play
//                             </button>
//                             <button
//                                 onClick={closeModal}
//                                 className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                             >
//                                 ✖ Close
//                             </button>
//                         </div>
//                     </div>
//                 )}


//                 {showQuiz && (
//                     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//                         <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">


//                             {!quizCompleted && !recapMode && questions.length > 0 && (
//                                 <>
//                                     <h3 className="text-xl font-bold text-amber-400 mb-4">
//                                         Question {currentQuestion + 1} of {questions.length}
//                                     </h3>
//                                     <h2 className="mb-4 text-lg text-yellow-300">
//                                         {questions[currentQuestion]?.question}
//                                     </h2>

//                                     {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleAnswerSelect(index)}
//                                             className={`block w-full p-3 mb-2 rounded-md text-left ${selectedAnswers[questions[currentQuestion]?.id] === String(index + 1)
//                                                 ? 'bg-blue-500'
//                                                 : 'bg-gray-700'
//                                                 }`}
//                                         >
//                                             {questions[currentQuestion]?.[opt]}
//                                         </button>
//                                     ))}

//                                     <div className="flex justify-between mt-4">
//                                         <button
//                                             onClick={handlePrev}
//                                             disabled={currentQuestion === 0}
//                                             className="bg-gray-500 text-white p-2 rounded-md"
//                                         >
//                                             Previous
//                                         </button>
//                                         {currentQuestion + 1 === questions.length ? (
//                                             <button
//                                                 onClick={submitTest}
//                                                 className="bg-green-500 text-white p-2 rounded-md"
//                                             >
//                                                 Submit
//                                             </button>
//                                         ) : (
//                                             <button
//                                                 onClick={handleNext}
//                                                 className="bg-blue-500 p-2 rounded-md text-white"
//                                             >
//                                                 Next
//                                             </button>
//                                         )}
//                                     </div>
//                                 </>
//                             )}


//                             {quizCompleted && !recapMode && scoreData && (
//                                 <div className="text-center text-white">
//                                     <h3 className="text-3xl font-bold mb-4">{scoreData.message || "Test Result"}</h3>

//                                     <p className="text-lg mb-2">
//                                         ✅ Correct Answers: <span className="text-green-400 font-bold">{scoreData.correctAnswers}</span> / {scoreData.totalQuestions}
//                                     </p>

//                                     <p className="text-lg mb-2">
//                                         📊 Score: <span className="text-blue-400 font-bold">{scoreData.score}%</span>
//                                     </p>

//                                     {/* <p className={`text-lg mb-4 font-bold ${scoreData.status === "completed" ? "text-green-400" : "text-red-400"}`}>
//                                         Status: {scoreData.status === "completed" ? "Passed" : "Not Completed"}
//                                     </p> */}

//                                     <button
//                                         onClick={() => setRecapMode(true)}
//                                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                                     >
//                                         🔁 View Test Recap
//                                     </button>

//                                     <button
//                                         onClick={closeModal}
//                                         className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded"
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
//                             )}


//                             {recapMode && (
//                                 <div className="text-white">
//                                     <h3 className="text-xl font-bold text-amber-400 mb-4">Test Recap</h3>
//                                     {questions.map((q, index) => {
//                                         const userAnswer = selectedAnswers[q.id];
//                                         const correctAnswer = q.correct_option;

//                                         return (
//                                             <div key={q.id} className="mb-6 bg-gray-800 p-4 rounded">
//                                                 <p className="font-bold mb-2">Q{index + 1}. {q.question}</p>

//                                                 {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, i) => {
//                                                     const optionValue = String(i + 1);
//                                                     const isCorrect = optionValue === correctAnswer;
//                                                     const isSelected = optionValue === userAnswer;

//                                                     let bgColor = "bg-gray-700";
//                                                     if (isCorrect) bgColor = "bg-green-600";
//                                                     if (isSelected && !isCorrect) bgColor = "bg-red-600";

//                                                     return (
//                                                         <div
//                                                             key={opt}
//                                                             className={`p-2 rounded mb-2 ${bgColor}`}
//                                                         >
//                                                             {q[opt]}
//                                                             {isCorrect && <span className="ml-2 text-sm text-white">(Correct)</span>}
//                                                             {isSelected && <span className="ml-2 text-sm text-white">(Your Answer)</span>}

//                                                         </div>
//                                                     );
//                                                 })}
//                                                 <div>

//                                                     <p><strong className='' style={{ color: "goldenrod" }}>Qustion Explanation : </strong> {questions[currentQuestion]?.qustionexplanation}</p>
//                                                 </div>

//                                             </div>
//                                         );
//                                     })}
//                                     <div className="text-right">
//                                         <button
//                                             onClick={closeModal}
//                                             className="bg-red-500 text-white px-4 py-2 rounded"
//                                         >
//                                             Close Recap
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             <button onClick={closeModal} className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">✖</button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <section className="testimonials-section" style={{ marginTop: "-140px" }}>
//                 <div className="testimonials-container">
//                     <div className="testimonials-grid">
//                         {!demoBook ? (
//                             <p>Loading...</p>
//                         ) : demoBook.reviews && Array.isArray(demoBook.reviews) && demoBook.reviews.length > 0 ? (
//                             <Slider {...settings}>
//                                 {demoBook.reviews.map((review, index) => (
//                                     <div key={review.review_id || index} className="testimonial-card"  >
//                                         <div className="testimonial-rating">
//                                             {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
//                                         </div>
//                                         <p className="testimonial-text">{review.comment}</p>
//                                         <div className="testimonial-author">
//                                             <img
//                                                 src={`https://i.pravatar.cc/150?img=${index + 1}`}
//                                                 alt="User"
//                                                 className="author-image"
//                                             />
//                                             <div className="author-info">
//                                                 <h4>{review.reviewer_name}</h4>
//                                                 <p>Verified Reader</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </Slider>
//                         ) : (
//                             <p className="no-reviews">No reviews available</p>
//                         )}
//                     </div>
//                 </div>
//             </section>

//             {localStorage.getItem('Role') === 'user' && (
//                 <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative" style={{ marginLeft: "auto", marginRight: "auto" }}>
//                     <h3 className="text-xl font-bold text-amber-400 mb-4">Write Your Review</h3>
//                     <div className="flex items-center mb-4">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                                 key={star}
//                                 onClick={() => setReviewRating(star)}
//                                 className={`text-3xl mx-1 ${reviewRating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
//                             >
//                                 ★
//                             </button>
//                         ))}
//                     </div>
//                     <textarea
//                         value={reviewText}
//                         onChange={(e) => setReviewText(e.target.value)}
//                         className="w-full p-2 text-black"
//                         rows="4"
//                         placeholder="Write your review here..."
//                     ></textarea>
//                     <div className="flex justify-between mt-4">

//                         {/* <button onClick={submitReview}
//                          className="bg-green-500 text-white px-4 py-2 rounded">Submit</button> */}

//                         <button onClick={() => {
//                             if (audioStatus === "complete") {
//                                 submitReview();
//                             } else {
//                                 toast.warn("You did not listen to the book yet. Please complete the book summary to access the review submit.");
//                             }
//                         }}
//                             className={`!rounded-button flex items-center justify-center space-x-3 py-2 px-6 text-lg font-semibold transition-colors ${audioStatus === "complete"
//                                 ? "bg-amber-400 hover:bg-amber-500 text-black cursor-pointer"
//                                 : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                                 }`}>Submit</button>
//                     </div>





//                 </div>
//             )}

//         </div>
//     );
// };

// export default BookDetails;















import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
    const [recapMode, setRecapMode] = useState(false);
    const [listenProgress, setListenProgress] = useState(0);
    // const [listenedTime, setListenedTime] = useState(0);
    const lastSavedSecondRef = useRef(0);


    const [audioStatus, setAudioStatus] = useState("incomplete"); // default
    const [buttonClickedWhileDisabled, setButtonClickedWhileDisabled] = useState(false);
    let lastSentPercent = 0;
    const lastSentPercentRef = useRef(0); // ✅ Yeh persist karega render ke beech
    const audioRef = useRef(null);

    const { setIsAudioPlayerVisible } = useAudio();
    const { playAudio } = useAudio();
    const userId = newid?.id || "";

    const planName = localStorage.getItem("plan_name");
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
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    };

    useEffect(() => {
        const usernewid = localStorage.getItem('userdata');
        if (usernewid) {
            setNewId(JSON.parse(usernewid))
        }
    }, []);


    

    useEffect(() => {
        if (currentModal !== 'flipbook') return;

        const audio = audioRef.current;
        if (!audio) return;

        let interval = null;
        let lastSavedSecond = 0;

        const trackListeningTime = () => {
            setListenedTime(prev => prev + 1);
        };

        const handlePlay = () => {
            interval = setInterval(trackListeningTime, 1000);
        };

        const handlePause = () => {
            clearInterval(interval);
            saveProgressToBackend(audio.currentTime, audio.duration);
        };

        const handleEnded = () => {
            clearInterval(interval);
            saveProgressToBackend(audio.currentTime, audio.duration);
        };

        const handleTimeUpdate = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            setListenProgress(percent.toFixed(2));

            const currentSecond = Math.floor(audio.currentTime);
            if (currentSecond % 10 === 0 && currentSecond !== lastSavedSecond) {
                lastSavedSecond = currentSecond;
                saveProgressToBackend(audio.currentTime, audio.duration);
            }
        };

        // Attach listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            clearInterval(interval);
        };
    }, [currentModal]); 



    // important to track change

    const waitUntilComplete = async () => {
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
            const response = await axios.get(`${BASE_URL}/getAudioProgress`, {
                params: { user_id: userId, book_id: id }
            });

            if (response.data?.data?.status === "complete") {
                setAudioStatus("complete");
                break;
            }

            attempts++;
            await new Promise((res) => setTimeout(res, 1000)); // wait 1 second before retry
        }
    };


  const isPostingRef = useRef(false); 
const saveProgressToBackend = async (currentTime, duration) => {
    if (isPostingRef.current) return; // ⛔ Prevent concurrent call

    const percent_complete = ((currentTime / duration) * 100).toFixed(2);
    const progressInterval = Math.floor(percent_complete / 10) * 10;

    if (percent_complete >= progressInterval && percent_complete < 100 && lastSentPercentRef.current < progressInterval) {
        try {
            isPostingRef.current = true; // 🔐 Lock set
            await axios.post(`${BASE_URL}/adioprogress`, {
                user_id: userId,
                book_id: id,
                progress: percent_complete,
            });
            lastSentPercentRef.current = progressInterval;
        } catch (error) {
            console.error("Error posting audio progress:", error);
        } finally {
            isPostingRef.current = false; // 🔓 Unlock
        }
    } else if (percent_complete >= 100 && lastSentPercentRef.current < 100) {
        try {
            isPostingRef.current = true; // 🔐 Lock set
            await axios.post(`${BASE_URL}/adioprogress`, {
                user_id: userId,
                book_id: id,
                progress: percent_complete,
            });
            lastSentPercentRef.current = 100;
            await waitUntilComplete(); // ✅ wait only after 100%
        } catch (error) {
            console.error("Error posting final audio progress:", error);
        } finally {
            isPostingRef.current = false; // 🔓 Unlock
        }
    }
};





    // const handleTimeUpdate = () => {
    //     const percent = (audio.currentTime / audio.duration) * 100;
    //     const roundedPercent = Math.floor(percent / 10) * 10; // for GET + POST every 10%
    //     setListenProgress(percent.toFixed(2));

    //     if (roundedPercent !== lastSentPercent && roundedPercent < 100) {
    //         saveProgressToBackend(audio.currentTime, audio.duration);
    //         fetchAudioStatus(); // GET request on every 10%
    //     }
    // };


    useEffect(() => {
        if (currentModal !== 'flipbook') return;

        const audio = audioRef.current;
        if (!audio) return;

        let interval = null;
        let progressChecker = null;
        let lastSavedSecond = 0;

        const trackListeningTime = () => {
            setListenedTime(prev => prev + 1);
        };

        const handlePlay = () => {
            interval = setInterval(trackListeningTime, 1000);
            progressChecker = setInterval(waitUntilComplete, 5000); // ✅ status check every 5s
        };

        const handlePause = () => {
            clearInterval(interval);
            clearInterval(progressChecker);
            saveProgressToBackend(audio.currentTime, audio.duration);
        };

        const handleEnded = () => {
            clearInterval(interval);
            clearInterval(progressChecker);
            saveProgressToBackend(audio.currentTime, audio.duration);
        };

        const handleTimeUpdate = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            setListenProgress(percent.toFixed(2));

            const currentSecond = Math.floor(audio.currentTime);
            if (currentSecond % 10 === 0 && currentSecond !== lastSavedSecond) {
                lastSavedSecond = currentSecond;
                saveProgressToBackend(audio.currentTime, audio.duration);
            }
        };

        // Attach listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            clearInterval(interval);
            clearInterval(progressChecker);
        };
    }, [currentModal]);




    useEffect(() => {
        const fetchBookAndQuestions = async () => {
            try {
                const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
                if (bookResponse.data && bookResponse.data.data) {
                    setDemoBook(bookResponse.data.data);
                    // Save the book ID to local storage
                    localStorage.setItem('currentBookId', id);
                }

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

    useEffect(() => {
        const fetchAudioStatus = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getAudioProgress`, {
                    params: { user_id: userId, book_id: id }
                });
                if (response.data?.data?.status === "complete") {
                    setAudioStatus("complete");
                }
            } catch (error) {
                console.error("Error fetching audio progress:", error);
            }
        };

        if (userId && id) {
            fetchAudioStatus();
        }
    }, [id, userId]);


    useEffect(() => {
        const attempted = localStorage.getItem(`testAttempted_${id}_${userId}`);
        if (attempted === "true") {
            setQuizCompleted(true);
            setAudioStatus("complete");  // force button enable after test dene ke baad
            // don't open recap modal on load
        }
    }, [id, userId]);




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

            localStorage.setItem("testData", JSON.stringify(testData));

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
            setRecapMode(false); // Reset recap mode after submission
            localStorage.setItem(`testAttempted_${id}_${userId}`, "true");


            toast.success("Test submitted successfully!");

        } catch (error) {
            console.error("Error submitting test:", error);
            toast.error("You have already attempted this book today.");
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
            <ToastContainer />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center justify-between mb-12">
                    <Link to="/backdashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white text-xxl">
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
                            {planName === "1 Month" && localStorage.getItem("Role") !== "admin" && (
                                <button
                                    onClick={() => {
                                        const alreadyAttempted = localStorage.getItem(`testAttempted_${id}_${userId}`) === "true";

                                        if (audioStatus === "complete") {
                                            if (alreadyAttempted) {
                                                setRecapMode(true);
                                                setShowQuiz(true);
                                            } else {
                                                setShowQuiz(true);
                                            }
                                        } else {
                                            toast.warn("You did not listen to the book yet. Please complete the book summary to access the test");
                                        }
                                    }}
                                    className={`!rounded-button flex items-center justify-center space-x-3 py-4 px-6 text-lg font-semibold transition-colors ${audioStatus === "complete"
                                        ? "bg-amber-400 hover:bg-amber-500 text-black cursor-pointer"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        }`}
                                >
                                    <i className="fas fa-pencil-alt text-2xl"></i>
                                    <span>Test Knowledge</span>
                                </button>
                            )}





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
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" style={{ height: "100%" }}>
                        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-full relative max-h-full overflow-y-auto">
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
                                className="!rounded-button deskaudio bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 mt-3"
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
                        <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">


                            {!quizCompleted && !recapMode && questions.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-amber-400 mb-4">
                                        Question {currentQuestion + 1} of {questions.length}
                                    </h3>
                                    <h2 className="mb-4 text-lg text-yellow-300">
                                        {questions[currentQuestion]?.question}
                                    </h2>

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
                                        <button
                                            onClick={handlePrev}
                                            disabled={currentQuestion === 0}
                                            className="bg-gray-500 text-white p-2 rounded-md"
                                        >
                                            Previous
                                        </button>
                                        {currentQuestion + 1 === questions.length ? (
                                            <button
                                                onClick={submitTest}
                                                className="bg-green-500 text-white p-2 rounded-md"
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNext}
                                                className="bg-blue-500 p-2 rounded-md text-white"
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}


                            {quizCompleted && !recapMode && scoreData && (
                                <div className="text-center text-white">
                                    <h3 className="text-3xl font-bold mb-4">{scoreData.message || "Test Result"}</h3>

                                    <p className="text-lg mb-2">
                                        ✅ Correct Answers: <span className="text-green-400 font-bold">{scoreData.correctAnswers}</span> / {scoreData.totalQuestions}
                                    </p>

                                    <p className="text-lg mb-2">
                                        📊 Score: <span className="text-blue-400 font-bold">{scoreData.score}%</span>
                                    </p>

                                    {/* <p className={`text-lg mb-4 font-bold ${scoreData.status === "completed" ? "text-green-400" : "text-red-400"}`}>
                                        Status: {scoreData.status === "completed" ? "Passed" : "Not Completed"}
                                    </p> */}

                                    <button
                                        onClick={() => setRecapMode(true)}
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        🔁 View Test Recap
                                    </button>

                                    <button
                                        onClick={closeModal}
                                        className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}


                            {recapMode && (
                                <div className="text-white">
                                    <h3 className="text-xl font-bold text-amber-400 mb-4">Test Recap</h3>
                                    {questions.map((q, index) => {
                                        const userAnswer = selectedAnswers[q.id];
                                        const correctAnswer = q.correct_option;

                                        return (
                                            <div key={q.id} className="mb-6 bg-gray-800 p-4 rounded">
                                                <p className="font-bold mb-2">Q{index + 1}. {q.question}</p>

                                                {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, i) => {
                                                    const optionValue = String(i + 1);
                                                    const isCorrect = optionValue === correctAnswer;
                                                    const isSelected = optionValue === userAnswer;

                                                    let bgColor = "bg-gray-700";
                                                    if (isCorrect) bgColor = "bg-green-600";
                                                    if (isSelected && !isCorrect) bgColor = "bg-red-600";

                                                    return (
                                                        <div
                                                            key={opt}
                                                            className={`p-2 rounded mb-2 ${bgColor}`}
                                                        >
                                                            {q[opt]}
                                                            {isCorrect && <span className="ml-2 text-sm text-white">(Correct)</span>}
                                                            {isSelected && <span className="ml-2 text-sm text-white">(Your Answer)</span>}

                                                        </div>
                                                    );
                                                })}
                                                <div>

                                                    <p><strong className='' style={{ color: "goldenrod" }}>Qustion Explanation : </strong> {questions[currentQuestion]?.qustionexplanation}</p>
                                                </div>

                                            </div>
                                        );
                                    })}
                                    <div className="text-right">
                                        <button
                                            onClick={closeModal}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Close Recap
                                        </button>
                                    </div>
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
                <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative" style={{ marginLeft: "auto", marginRight: "auto" }}>
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

                        {/* <button onClick={submitReview}
                         className="bg-green-500 text-white px-4 py-2 rounded">Submit</button> */}

                        <button onClick={() => {
                            if (audioStatus === "complete") {
                                submitReview();
                            } else {
                                toast.warn("You did not listen to the book yet. Please complete the book summary to access the review submit.");
                            }
                        }}
                            className={`!rounded-button flex items-center justify-center space-x-3 py-2 px-6 text-lg font-semibold transition-colors ${audioStatus === "complete"
                                ? "bg-amber-400 hover:bg-amber-500 text-black cursor-pointer"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}>Submit</button>
                    </div>





                </div>
            )}

        </div>
    );
};

export default BookDetails;
















