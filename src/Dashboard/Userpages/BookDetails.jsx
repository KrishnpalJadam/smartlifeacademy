

// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import BASE_URL from '../../Config';
// import Chatbot from '../Chatbot';
// import TestKnowledgeChatbot from './TestKnowledgeChatbot';


// const BookDetails = () => {
//     const { id } = useParams();
//     const [demoBook, setDemoBook] = useState([]);
//     const [currentModal, setCurrentModal] = useState(null);
//     const [showChatbot, setShowChatbot] = useState(false); // Chatbot State
//     const audioRef = useRef(null);

//     useEffect(() => {
//         const fetchAllBooks = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/book/${id}`);
//                 if (response.data && response.data.data) {
//                     setDemoBook(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching books:", error);
//             }
//         };
//         fetchAllBooks();
//     }, [id]);

//     // Close all modals
//     const closeModal = () => {
//         setCurrentModal(null);
//         setShowChatbot(false); // Chatbot bhi close ho
//         if (audioRef.current) {
//             audioRef.current.pause();
//         }
//     };

// // fetch all qustion by id
// const qustionData = axios.get(`${BASE_URL}/getquestionanswerbyid/${id}`);


//     return (
//         <div className="bg-custom text-white font-['Inter'] container">
//             <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Top Navigation */}
//                 <nav className="flex items-center justify-between mb-12">
//                     <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
//                         <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//                     </Link>
//                 </nav>

//                 {/* Main Book Section */}
//                 <div className="grid lg:grid-cols-2 gap-12">
//                     {/* Book Cover */}
//                     <div className="flex flex-col items-center lg:items-start">
//                         <div className="relative w-full max-w-md aspect-[3/4] mb-8">
//                             <img
//                                 src={demoBook[0]?.image}
//                                 alt={demoBook[0]?.book_name}
//                                 className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
//                                 onClick={() => setCurrentModal('flipbook')}
//                             />
//                         </div>
//                     </div>

//                     {/* Book Details */}
//                     <div className="space-y-8">
//                         <h1 className="text-4xl font-bold text-amber-400 mb-4">{demoBook[0]?.book_name}</h1>
//                         <p className="text-xl mb-8">by {demoBook[0]?.author}</p>

//                         {/* Progress Bar */}
//                         <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
//                             <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${demoBook.progress}%` }}></div>
//                         </div>

//                         {/* Book Summary */}
//                         <div className="bg-gray-900 rounded-lg p-8 mb-8">
//                             <h2 className="text-2xl font-semibold text-amber-400 mb-4">Book Summary</h2>
//                             <p className="text-gray-300 leading-relaxed">{demoBook[0]?.description}</p>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <button
//                                 onClick={() => setCurrentModal('flipbook')}
//                                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                                 style={{ color: "black" }}
//                             >
//                                 <i className="fas fa-book-open text-2xl"></i>
//                                 <span>Read & Listen</span>
//                             </button>

//                             {/* "Test Knowledge" Button to Open Chatbot */}
//                             <button
//                                 onClick={() => setShowChatbot(true)} // Chatbot Open
//                                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                                 style={{ color: "black" }}
//                             >
//                                 <i className="fas fa-pencil-alt text-2xl"></i>
//                                 <span>Test Knowledge</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Flipbook Modal */}
//                 {currentModal === 'flipbook' && (
//                     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//                         <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
//                             <h3 className="text-xl font-bold text-amber-400 mb-4">Flipbook & Audio - {demoBook[0]?.book_name}</h3>
//                             <iframe
//                                 src={demoBook[0]?.flip_book_url}
//                                 width="100%"
//                                 height="500"
//                                 className="rounded-lg"
//                                 style={{ border: 'none' }}
//                                 allowFullScreen
//                             ></iframe>
//                             <audio ref={audioRef} controls className="w-full mt-4" controlsList="nodownload">
//                                 <source src={demoBook[0]?.audio_book_url} type="audio/mp3" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                             <button
//                                 onClick={closeModal}
//                                 className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                             >
//                                 ✖ Close
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Chatbot Modal */}
//                 {showChatbot && (
//                     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//                         <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative">
//                             <h3 className="text-xl font-bold text-amber-400 mb-4">Chatbot - Test Your Knowledge</h3>
//                             <Chatbot /> {/* Chatbot Component Render */}
//                             <button
//                                 onClick={closeModal}
//                                 className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                             >
//                                 ✖ Close
//                             </button>
//                             <h2 className='text-primary'>{demoBook[0]?.question_text}</h2>

//                             <p>{demoBook[0]?.text}</p>
//                         </div>

//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookDetails;










// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import BASE_URL from '../../Config';

// const BookDetails = () => {
//     const { id } = useParams();
//     const [demoBook, setDemoBook] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [currentModal, setCurrentModal] = useState(null);
//     const [showQuiz, setShowQuiz] = useState(false);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [score, setScore] = useState(0);
//     const [quizCompleted, setQuizCompleted] = useState(false);
//     const audioRef = useRef(null);

//     useEffect(() => {
//         const fetchBookAndQuestions = async () => {
//             try {
//                 const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
//                 if (bookResponse.data && bookResponse.data.data) {
//                     setDemoBook(bookResponse.data.data);
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

//     const closeModal = () => {
//         setCurrentModal(null);
//         setShowQuiz(false);
//         setQuizCompleted(false);
//         setCurrentQuestion(0);
//         setScore(0);
//         if (audioRef.current) {
//             audioRef.current.pause();
//         }
//     };

//     const handleAnswerSelect = (optionIndex) => {
//         if (questions[currentQuestion]?.correct_option === String(optionIndex + 1)) {
//             setScore(score + 1);
//         }
//         setSelectedAnswer(optionIndex);
//         setTimeout(() => {
//             if (currentQuestion + 1 < questions.length) {
//                 setCurrentQuestion(currentQuestion + 1);
//                 setSelectedAnswer(null);
//             } else {
//                 setQuizCompleted(true);
//             }
//         }, 1000);
//     };



//     const submitTest = async () => {
//         const testData = await axios.post(`${BASE_URL}/submittest`)
//         console.log("testdata", testData)
//     }




//     if (!demoBook) {
//         return <div className="text-white text-center py-8">Loading book details...</div>;
//     }

//     return (
//         <div className="bg-custom text-white font-['Inter'] container">
//             <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <nav className="flex items-center justify-between mb-12">
//                     <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
//                         <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//                     </Link>
//                 </nav>

//                 <div className="grid lg:grid-cols-2 gap-12">
//                     <div className="flex flex-col items-center lg:items-start">
//                         <div className="relative w-full max-w-md aspect-[3/4] mb-8">
//                             <img
//                                 src={demoBook[0]?.image}
//                                 alt={demoBook?.book_name}
//                                 className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
//                                 onClick={() => setCurrentModal('flipbook')}
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-8">
//                         <h1 className="text-4xl font-bold text-amber-400 mb-4">{demoBook[0]?.book_name}</h1>
//                         <p className="text-xl mb-8">by {demoBook[0]?.author}</p>
//                         {/* Book Summary */}
//                         <div className="bg-gray-900 rounded-lg p-8 mb-8">
//                             <h2 className="text-2xl font-semibold text-amber-400 mb-4">Book Summary</h2>
//                             <p className="text-gray-300 leading-relaxed">{demoBook[0]?.description}</p>
//                         </div>
//                         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <button onClick={() => setCurrentModal('flipbook')} className="bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors text-dark">Read & Listen</button>
//                             <button onClick={() => setShowQuiz(true)} className="bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors text-dark">Test Knowledge</button>
//                         </div> */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <button
//                                 onClick={() => setCurrentModal('flipbook')}
//                                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                                 style={{ color: "black" }}
//                             >
//                                 <i className="fas fa-book-open text-2xl"></i>
//                                 <span>Read & Listen</span>
//                             </button>

//                             {/* "Test Knowledge" Button to Open Chatbot */}
//                             <button
//                                 onClick={() => setShowQuiz(true)} // Chatbot Open
//                                 className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
//                                 style={{ color: "black" }}
//                             >
//                                 <i className="fas fa-pencil-alt text-2xl"></i>
//                                 <span>Test Knowledge</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Flipbook Modal */}                 {currentModal === 'flipbook' && (
//                     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//                         <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
//                             <h3 className="text-xl font-bold text-amber-400 mb-4">Flipbook & Audio - {demoBook[0]?.book_name}</h3>
//                             <iframe
//                                 src={demoBook[0]?.flip_book_url}
//                                 width="100%"
//                                 height="500"
//                                 className="rounded-lg"
//                                 style={{ border: 'none' }}
//                                 allowFullScreen
//                             ></iframe>
//                             <audio ref={audioRef} controls className="w-full mt-4" controlsList="nodownload">
//                                 <source src={demoBook[0]?.audio_book_url} type="audio/mp3" />
//                                 Your browser does not support the audio element.
//                             </audio>
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
//                         <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full relative">
//                             {!quizCompleted ? (
//                                 <div>
//                                     <h3 className="text-xl font-bold text-amber-400 mb-4">Question {currentQuestion + 1} of {questions.length}</h3>
//                                     <p className="mb-4">{questions[currentQuestion]?.question}</p>
//                                     {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleAnswerSelect(index)}
//                                             className={`block w-full p-3 mb-2 rounded-md text-left ${selectedAnswer === index ? (questions[currentQuestion]?.correct_option === String(index + 1) ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-700'}`}
//                                         >
//                                             {questions[currentQuestion]?.[opt]}
//                                         </button>
//                                     ))}
//                                     <button className='btn btn-success' style={{ marginLeft: "auto" }} onClick={submitTest}>Submit</button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <h3 className="text-xl font-bold text-amber-400 mb-4">Quiz Completed!</h3>
//                                     <p className="text-lg mb-4">Your Score: {score} / {questions.length}</p>
//                                 </div>
//                             )}
//                             <button onClick={closeModal} className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">✖ Close</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookDetails;



















import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../Config';

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
    const audioRef = useRef(null);
    const userId = 123;

    useEffect(() => {
        const fetchBookAndQuestions = async () => {
            try {
                const bookResponse = await axios.get(`${BASE_URL}/book/${id}`);
                if (bookResponse.data && bookResponse.data.data) {
                    setDemoBook(bookResponse.data.data);
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
            const testData = {
                book_id: id,
                user_id: userId,
                answers: selectedAnswers
            };
            const response = await axios.post(`${BASE_URL}/submittest`, testData);
            setScoreData(response.data);
            setQuizCompleted(true);
            toast.success("Test submitted successfully!");
        } catch (error) {
            console.error("Error submitting test:", error);
            toast.error("Error submitting test. Please try again.");
        }
    };

    if (!demoBook) {
        return <div className="text-white text-center py-8">Loading book details...</div>;
    }

    return (
        <div className="bg-custom text-white font-['Inter'] container">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center justify-between mb-12">
                    <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                        <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
                    </Link>
                </nav>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="relative w-full max-w-md aspect-[3/4] mb-8">
                            <img
                                src={demoBook[0]?.image}
                                alt={demoBook?.book_name}
                                className="w-full h-full object-cover rounded-lg shadow-xl cursor-pointer"
                                onClick={() => setCurrentModal('flipbook')}
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-amber-400 mb-4">{demoBook[0]?.book_name}</h1>
                        <p className="text-xl mb-8">by {demoBook[0]?.author}</p>
                         {/* Book Summary */}
                        <div className="bg-gray-900 rounded-lg p-8 mb-8">
                             <h2 className="text-2xl font-semibold text-amber-400 mb-4">Book Summary</h2>
                            <p className="text-gray-300 leading-relaxed">{demoBook[0]?.description}</p>                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                             <button
                                onClick={() => setCurrentModal('flipbook')}
                                className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
                                style={{ color: "black" }}
                            >
                                <i className="fas fa-book-open text-2xl"></i>
                                <span>Read & Listen</span>
                            </button>

                            {/* "Test Knowledge" Button to Open Chatbot */}
                            <button
                                onClick={() => setShowQuiz(true)} // Chatbot Open
                                className="!rounded-button flex items-center justify-center space-x-3 bg-amber-400 text-custom py-4 px-6 text-lg font-semibold hover:bg-amber-500 transition-colors"
                                style={{ color: "black" }}
                            >
                                <i className="fas fa-pencil-alt text-2xl"></i>
                                <span>Test Knowledge</span>
                            </button>
                        </div>
                    </div>
                </div>


                               {/* Flipbook Modal */}                 {currentModal === 'flipbook' && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg max-w-5xl w-full relative">
                            <h3 className="text-xl font-bold text-amber-400 mb-4">Flipbook & Audio - {demoBook[0]?.book_name}</h3>
                            <iframe
                                src={demoBook[0]?.flip_book_url}
                                width="100%"
                                height="500"
                                className="rounded-lg"
                                style={{ border: 'none' }}
                                allowFullScreen
                            ></iframe>
                            <audio ref={audioRef} controls className="w-full mt-4" controlsList="nodownload">
                                <source src={demoBook[0]?.audio_book_url} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
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
                                    <h3 className="text-xl font-bold text-amber-400 mb-4">Question : {currentQuestion + 1} of {questions.length}</h3>
                                    <h2 className="mb-4 fs-4 " style={{color: "goldenrod"}}>{questions[currentQuestion]?.question}</h2>
                                    {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index)}
                                            className={`block w-full p-3 mb-2 rounded-md text-left ${selectedAnswers[questions[currentQuestion]?.id] === String(index + 1) ? 'bg-blue-500' : 'bg-gray-700'}`}
                                        >
                                            {questions[currentQuestion]?.[opt]}
                                        </button>
                                    ))}
                                      <button onClick={closeModal} className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">✖ Close</button>
                                    <div className="flex justify-between mt-4">
                                        <button onClick={handlePrev} disabled={currentQuestion === 0} className="bg-gray-500 text-white p-2 rounded-md">Previous</button>
                                        {currentQuestion + 1 === questions.length ? (
                                            <button onClick={submitTest} className="bg-green-500 text-white p-2 rounded-md">Submit</button>
                                        ) : (
                                            <button onClick={handleNext} className="bg-blue-500 p-2 btn-primary rounded-md text-dark">Next </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white">{scoreData?.message}</h3>
                                    <p className="text-lg">Correct Answers: {scoreData?.correctAnswers} / {scoreData?.totalQuestions}</p>
                                    <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;