

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../../Config";

// const AddBook = () => {
//   const { id } = useParams();
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate()
//   const [book, setBook] = useState({
//     category_id: "",
//     book_name: "",
//     author: "",
//     description: "",


//     flip_book_url: "",
//     audio_book_url: "",
//     image: null,
//     status: "active",
//     questions: [
//       {
//         question_text: "",
//         options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
//         correct_option: 1,
//         qustionexplanation: "",
//       },
//     ],
//   });

//   useEffect(() => {
//     fetchCategories();
//     if (id) {
//       fetchBookById(id);
//     }
//   }, [id]);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getcategory`);
//       if (response.data && response.data.data) {
//         setCategories(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchBookById = async (bookId) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/book/${bookId}`);
//       const bookData = response.data.data;
//       console.log('book', bookData)
//       if (bookData) {
//         setBook({
//           ...bookData,
//           questions: bookData.questions.map((q) => ({
//             question_text: q.question_text || "",
//             options: [
//               { text: q.option_1 || "" },
//               { text: q.option_2 || "" },
//               { text: q.option_3 || "" },
//               { text: q.option_4 || "" },
//             ],
//             correct_option: q.correct_option || 1,
//             qustionexplanation: q.qustionexplanation || "", // ✅ Add here
//           })),
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook({ ...book, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setBook((prevBook) => ({ ...prevBook, image: file }));
//   };


//   const handleQuestionChange = (index, e) => {
//     const { value } = e.target;
//     const updatedQuestions = [...book.questions];
//     updatedQuestions[index].question_text = value;
//     setBook({ ...book, questions: updatedQuestions });
//   };

//   const handleQuestionExplanationChange = (index, e) => {
//     const { value } = e.target;
//     const updatedQuestions = [...book.questions];
//     updatedQuestions[index].qustionexplanation = value;
//     setBook({ ...book, questions: updatedQuestions });
//   };

//   const handleOptionChange = (qIndex, oIndex, e) => {
//     const { value } = e.target;
//     const updatedQuestions = [...book.questions];
//     updatedQuestions[qIndex].options[oIndex].text = value;
//     setBook({ ...book, questions: updatedQuestions });
//   };

//   const handleCorrectOptionChange = (qIndex, e) => {
//     const { value } = e.target;
//     const updatedQuestions = [...book.questions];
//     updatedQuestions[qIndex].correct_option = parseInt(value);
//     setBook({ ...book, questions: updatedQuestions });
//   };

//   const addQuestion = () => {
//     if (book.questions.length < 5) {
//       setBook({
//         ...book,
//         questions: [
//           ...book.questions,
//           {
//             question_text: "",
//             options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
//             correct_option: 1,
//           },
//         ],
//       });
//     }
//   };

//   const removeQuestion = (index) => {
//     const updatedQuestions = book.questions.filter((_, qIndex) => qIndex !== index);
//     setBook({ ...book, questions: updatedQuestions });
//   };



//   const handleAudioFileChange = (e) => {
//     const file = e.target.files[0];
//     setBook((prevBook) => ({ ...prevBook, audio_book_url: file }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("category_id", book.category_id);
//     formData.append("book_name", book.book_name);
//     formData.append("author", book.author);
//     formData.append("description", book.description);
//     formData.append("qustionexplanation", book.qustionexplanation);
//     formData.append("flip_book_url", book.flip_book_url);
//     formData.append("status", book.status);

//     if (book.image instanceof File) {
//       formData.append("image", book.image);
//     }


//     if (book.audio_book_url instanceof File) {
//       formData.append("audio_book_url", book.audio_book_url);
//     }

//     formData.append("questions", JSON.stringify(book.questions));

//     try {
//       if (id) {
//         await axios.put(`${BASE_URL}/book/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Book updated successfully");
//         navigate("/bookManagment")
//       } else {
//         await axios.post(`${BASE_URL}/book`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Book added successfully");
//         navigate("/bookManagment")
//       }
//     } catch (error) {
//       console.error("Error saving book:", error);
//       alert("Error saving book. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <nav className="mb-12 pt-5">
//         <Link to="/bookManagment" className="d-flex align-items-center mb-4 text-decoration-none text-white">
//           <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//         </Link>
//       </nav>

//       <div className="row p-6 rounded-lg shadow-md mb-5">
//         <form onSubmit={handleSubmit} className="space-y-4 col-sm-8 bg-white p-6 rounded-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
//           <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add New Book"}</h2>

//           <div className="row">
//             <div className="col-sm-6">
//               <label className="block text-sm font-medium text-gray-700">Book Name</label>
//               <input type="text" name="book_name" value={book.book_name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
//             </div>
//             <div className="col-sm-6">
//               <label className="block text-sm font-medium text-gray-700">Author</label>
//               <input type="text" name="author" value={book.author} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select name="category_id" value={book.category_id} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required>
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" value={book.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" rows="3" required></textarea>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Flip Book URL</label>
//             <input type="url" name="flip_book_url" value={book.flip_book_url} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
//           </div>

//           {/* <div>
//             <label className="block text-sm font-medium text-gray-700">Audio Book URL</label>
//             <input type="url" name="audio_book_url" value={book.audio_book_url} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
//           </div> */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Upload Audio Book (*Only 8 MB Audio Support in MP3*)</label>
//             <input type="file" accept=".mp3" onChange={handleAudioFileChange} className="mt-1 p-2 w-full border rounded-md" required />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Upload (only support JPEG, PNG)</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>


//           <h3 className="text-lg font-bold mt-4">Add Questions</h3>
//           {book.questions.map((question, qIndex) => (
//             <div key={qIndex} className="border p-3 rounded-md mb-3 relative">
//               <label className="block text-sm font-medium text-gray-700">Question {qIndex + 1}</label>
//               <input
//                 type="text"
//                 value={question.question_text}
//                 onChange={(e) => handleQuestionChange(qIndex, e)}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 required
//               />
//               {question.options.map((option, oIndex) => (
//                 <input
//                   key={oIndex}
//                   type="text"
//                   value={option.text}
//                   onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
//                   placeholder={`Option ${oIndex + 1}`}
//                   className="mt-1 p-2 w-full border rounded-md"
//                 />
//               ))}

//               <label className="block text-sm font-medium text-gray-700 mt-2">Correct Option</label>
//               <select value={question.correct_option} onChange={(e) => handleCorrectOptionChange(qIndex, e)} className="mt-1 p-2 w-full border rounded-md">
//                 {question.options.map((_, i) => (
//                   <option key={i} value={i + 1}>
//                     Option {i + 1}
//                   </option>
//                 ))}
//               </select>
//               <div>
//               <div>
//   <label className="block text-sm font-medium text-gray-700 mt-2">Explanation Box</label>
//   <textarea
//     name={`qustionexplanation-${qIndex}`}
//     value={question.qustionexplanation}
//     onChange={(e) => handleQuestionExplanationChange(qIndex, e)}
//     className="mt-1 p-2 w-full border rounded-md"
//     rows="3"
//     required
//   ></textarea>
// </div>

//           </div>
//               <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 mt-2">
//                 Remove Question
//               </button>
//             </div>
//           ))}

//           {book.questions.length < 5 && (
//             <button type="button" onClick={addQuestion} className="mt-2 bg-blue-500 text-white p-2 rounded-md">
//               Add Another Question
//             </button>
//           )}

//           <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md w-full">
//             {id ? "Update Book" : "Add Book"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBook;









import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";
import Swal from "sweetalert2";
const AddBook = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [book, setBook] = useState({
    category_id: "",
    book_name: "",
    author: "",
    description: "",
    flip_book_url: "",
    audio_book_url: "",
    image: null,
    status: "active",  // Active status for draft or published
    questions: [
      {
        question_text: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correct_option: 1,
        qustionexplanation: "",
      },
    ],
  });

  const [isDraft, setIsDraft] = useState(false);  // Track if it's a draft or complete book
  const [isRestored, setIsRestored] = useState(false);  // Track if draft has been restored

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBookById(id);
    } else {
      loadDraft();  // Load the saved draft when adding a new book
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getcategory`);
      if (response.data && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBookById = async (bookId) => {
    try {
      const response = await axios.get(`${BASE_URL}/book/${bookId}`);
      const bookData = response.data.data;
      if (bookData) {
        setBook({
          ...bookData,
          questions: bookData.questions.map((q) => ({
            question_text: q.question_text || "",
            options: [
              { text: q.option_1 || "" },
              { text: q.option_2 || "" },
              { text: q.option_3 || "" },
              { text: q.option_4 || "" },
            ],
            correct_option: q.correct_option || 1,
            qustionexplanation: q.qustionexplanation || "",
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const loadDraft = () => {
    const draftData = localStorage.getItem("draftBook");
    if (draftData) {
      const parsedDraft = JSON.parse(draftData);
      setBook(parsedDraft);
      setIsDraft(true);
      setIsRestored(true);  // Set to true when the draft is restored
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBook((prevBook) => ({ ...prevBook, image: file }));
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setBook((prevBook) => ({ ...prevBook, audio_book_url: file }));
  };

  const handleQuestionChange = (index, e) => {
    const { value } = e.target;
    const updatedQuestions = [...book.questions];
    updatedQuestions[index].question_text = value;
    setBook({ ...book, questions: updatedQuestions });
  };

  const handleQuestionExplanationChange = (index, e) => {
    const { value } = e.target;
    const updatedQuestions = [...book.questions];
    updatedQuestions[index].qustionexplanation = value;
    setBook({ ...book, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...book.questions];
    updatedQuestions[qIndex].options[oIndex].text = value;
    setBook({ ...book, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (qIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...book.questions];
    updatedQuestions[qIndex].correct_option = parseInt(value);
    setBook({ ...book, questions: updatedQuestions });
  };

  const addQuestion = () => {
    if (book.questions.length < 5) {
      setBook({
        ...book,
        questions: [
          ...book.questions,
          {
            question_text: "",
            options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
            correct_option: 1,
          },
        ],
      });
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = book.questions.filter((_, qIndex) => qIndex !== index);
    setBook({ ...book, questions: updatedQuestions });
  };

  const saveDraft = () => {
    localStorage.setItem("draftBook", JSON.stringify(book));
    alert("Book draft saved successfully.");
    setIsRestored(true);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Show loader

  const formData = new FormData();
  formData.append("category_id", book.category_id);
  formData.append("book_name", book.book_name);
  formData.append("author", book.author);
  formData.append("description", book.description);
  formData.append("flip_book_url", book.flip_book_url);
  formData.append("status", "active");

  // IMAGE
if (book.image instanceof File) {
  formData.append("image", book.image);
} else if (typeof book.image === "string") {
  formData.append("image", book.image); // Or 'image_url' if your backend expects that
}

// AUDIO
if (book.audio_book_url instanceof File) {
  formData.append("audio_book_url", book.audio_book_url);
} else if (typeof book.audio_book_url === "string") {
  formData.append("audio_book_url", book.audio_book_url); // Or 'audio_url'
}


  formData.append("questions", JSON.stringify(book.questions));

  try {
    let response;

    if (id) {
      response = await axios.put(`${BASE_URL}/book/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await axios.post(`${BASE_URL}/book`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    // Show backend message
    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data?.message || "Book saved successfully",
      timer: 2000,
      showConfirmButton: false,
    });

    localStorage.removeItem("draftBook");
    navigate("/bookManagment");
  } catch (error) {
    console.error("Error saving book:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false); // Hide loader
  }
};


  const handleReset = () => {
    setBook({
      category_id: "",
      book_name: "",
      author: "",
      description: "",
      flip_book_url: "",
      audio_book_url: "",
      image: null,
      status: "active",
      questions: [
        {
          question_text: "",
          options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
          correct_option: 1,
          qustionexplanation: "",
        },
      ],
    });
    setIsDraft(false);  // Reset the draft flag to false
    setIsRestored(false);  // Reset the restore flag
    localStorage.removeItem("draftBook");  // Clear the draft from localStorage
  };

  return (
    
    <div className="container">
      {loading && (
  <div className="loader-overlay">
    <div className="loader"></div>
  </div>
)}

      <nav className="mb-12 pt-5">
        <Link to="/bookManagment" className="d-flex align-items-center mb-4 text-decoration-none text-white">
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
      </nav>

      <div className="row p-6 rounded-lg shadow-md mb-5">
        <form onSubmit={handleSubmit} className="space-y-4 col-sm-8 bg-white p-6 rounded-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add New Book"}</h2>

          {/* Book Name, Author, Description, Flip Book URL, etc. */}
          <div className="row">
            <div className="col-sm-6">
              <label className="block text-sm font-medium text-gray-700">Book Name</label>
              <input type="text" name="book_name" value={book.book_name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
            </div>
            <div className="col-sm-6">
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input type="text" name="author" value={book.author} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category_id" value={book.category_id} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Book Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={book.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" rows="3" required></textarea>
          </div>

          {/* Flip Book URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Flip Book URL</label>
            <input type="url" name="flip_book_url" value={book.flip_book_url} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
          </div>

          {/* Upload Audio */}
       <div>
  <label className="block text-sm font-medium text-gray-700">Upload Book Image</label>

  {book.image && typeof book.image === "string" && (
    <p className="text-sm text-gray-600 mb-1">
      Selected file: <a href={book.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        {book.image}
      </a>
    </p>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="mt-1 p-2 w-full border rounded-md"
  />
</div>


          {/* Upload Image */}
       <div>
  <label className="block text-sm font-medium text-gray-700">Upload Audio Book</label>

  {book.audio_book_url && typeof book.audio_book_url === "string" && (
    <p className="text-sm text-gray-600 mb-1">
      Selected file: <a href={book.audio_book_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        {book.audio_book_url}
      </a>
    </p>
  )}

  <input
    type="file"
    accept=".mp3"
    onChange={handleAudioFileChange}
    className="mt-1 p-2 w-full border rounded-md"
  />
</div>


          {/* Add Questions Section */} 
          <h3 className="text-lg font-bold mt-4">Add Questions</h3>
          {book.questions.map((question, qIndex) => (
            <div key={qIndex} className="border p-3 rounded-md mb-3 relative">
              <label className="block text-sm font-medium text-gray-700">Question {qIndex + 1}</label>
              <input
                type="text"
                value={question.question_text}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {question.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  placeholder={`Option ${oIndex + 1}`}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              ))}
              <label className="block text-sm font-medium text-gray-700 mt-2">Correct Option</label>
              <select value={question.correct_option} onChange={(e) => handleCorrectOptionChange(qIndex, e)} className="mt-1 p-2 w-full border rounded-md">
                {question.options.map((_, i) => (
                  <option key={i} value={i + 1}>
                    Option {i + 1}
                  </option>
                ))}
              </select>

              {/* Explanation Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-2">Explanation Box</label>
                <textarea
                  name={`qustionexplanation-${qIndex}`}
                  value={question.qustionexplanation}
                  onChange={(e) => handleQuestionExplanationChange(qIndex, e)}
                  className="mt-1 p-2 w-full border rounded-md"
                  rows="3"
                  required
                ></textarea>
              </div>

              <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 mt-2">
                Remove Question
              </button>
            </div>
          ))}

          {book.questions.length < 5 && (
            <button type="button" onClick={addQuestion} className="mt-2 bg-blue-500 text-white p-2 rounded-md">
              Add Another Question
            </button>
          )}

          {/* Save as Draft or Submit */}
          <div className="flex space-x-4">
            {/* <button
              type="button"
              onClick={saveDraft} 
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              {isRestored ? "Restore Draft" : "Save as Draft"}
            </button> */}
            <button
              type="button"
              onClick={saveDraft} // Call handleSaveDraft for saving as draft
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md w-full"
            >
              {id ? "Update Book" : "Add Book"}
            </button>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset} // Reset form to initial state
            className="bg-red-500 text-white p-2 rounded-md w-full mt-4"
          >
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
