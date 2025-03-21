import React, { useState } from "react";

const TestKnowledgeChatbot = ({ onClose }) => {
  // Sample 5 Questions
  const questions = [
    {
      question: "What is the main theme of the book?",
      options: ["Love", "Adventure", "Self-Improvement", "Mystery"],
      answer: "Self-Improvement",
    },
    {
      question: "Who is the author of this book?",
      options: ["J.K. Rowling", "Mark Manson", "Paulo Coelho", "Dale Carnegie"],
      answer: "Mark Manson",
    },
    {
      question: "What is the key takeaway from the book?",
      options: [
        "How to be rich",
        "How to manage time",
        "How to not give unnecessary importance to things",
        "How to travel the world",
      ],
      answer: "How to not give unnecessary importance to things",
    },
    {
      question: "Which category does this book belong to?",
      options: ["Fiction", "Biography", "Self-Help", "Science"],
      answer: "Self-Help",
    },
    {
      question: "What is the first chapter about?",
      options: [
        "Setting priorities",
        "Building relationships",
        "Understanding emotions",
        "Learning a new language",
      ],
      answer: "Setting priorities",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Function to handle answer selection
  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full relative text-white">
        <h3 className="text-2xl font-bold text-amber-400 mb-4">
          Test Your Knowledge
        </h3>

        {!showResult ? (
          <>
            <h4 className="text-lg font-semibold mb-4">
              {questions[currentQuestionIndex].question}
            </h4>
            <div className="grid gap-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-amber-400 text-black py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h4 className="text-xl font-bold text-green-400">
              Quiz Completed 🎉
            </h4>
            <p className="text-lg">Your Score: {score} / 5</p>
            <button
              onClick={onClose}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestKnowledgeChatbot;
