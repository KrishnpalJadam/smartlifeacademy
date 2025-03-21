import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";

const AddBook = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [book, setBook] = useState({
    category_id: "",
    book_name: "",
    author: "",
    description: "",
    flip_book_url: "",
    audio_book_url: "",
    image: "",
    status: "active",
    questions: [
      {
        question_text: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correct_option: 1,
      },
    ],
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBookById(id);
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
        console.log('book',bookData)
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
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBook((prevBook) => ({ ...prevBook, image: reader.result }));
      };
    }
  };

  const handleQuestionChange = (index, e) => {
    const { value } = e.target;
    const updatedQuestions = [...book.questions];
    updatedQuestions[index].question_text = value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${BASE_URL}/book/${id}`, book, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Book updated successfully");
      } else {
        await axios.post(`${BASE_URL}/book`, book, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Book added successfully");
      }
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Error saving book. Please try again.");
    }
  };

  return (
    <div className="container">
      <nav className="mb-12 pt-5">
        <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
      </nav>

      <div className="row p-6 rounded-lg shadow-md mb-5">
        <form onSubmit={handleSubmit} className="space-y-4 col-sm-8 bg-white p-6 rounded-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add New Book"}</h2>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={book.description} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" rows="3" required></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Flip Book URL</label>
            <input type="url" name="flip_book_url" value={book.flip_book_url} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Audio Book URL</label>
            <input type="url" name="audio_book_url" value={book.audio_book_url} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 w-full border rounded-md" />
          </div>

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

          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md w-full">
            {id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;









// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../../Config";

// const AddBook = () => {
//   const { id } = useParams();
//   const [categories, setCategories] = useState([]);
//   const [book, setBook] = useState({
//     category_id: "",
//     book_name: "",
//     author: "",
//     description: "",
//     flip_book_url: "",
//     audio_book_url: null,
//     image: null,
//     status: "active",
//     questions: [
//       {
//         question_text: "",
//         options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
//         correct_option: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     fetchCategories();
//     if (id) fetchBookDetails(id);
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

//   const fetchBookDetails = async (bookId) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/book/${bookId}`);
//       if (response.data && response.data.data) {
//         setBook(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching book details:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook({ ...book, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setBook({ ...book, audio_book_url: file });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setBook({ ...book, image: file });
//   };

//   const handleQuestionChange = (index, e) => {
//     const { value } = e.target;
//     const updatedQuestions = [...book.questions];
//     updatedQuestions[index].question_text = value;
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
//           { question_text: "", options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }], correct_option: 1 },
//         ],
//       });
//     }
//   };

//   const removeQuestion = (index) => {
//     const updatedQuestions = book.questions.filter((_, qIndex) => qIndex !== index);
//     setBook({ ...book, questions: updatedQuestions });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("category_id", book.category_id);
//     formData.append("book_name", book.book_name);
//     formData.append("author", book.author);
//     formData.append("description", book.description);
//     formData.append("flip_book_url", book.flip_book_url);
//     formData.append("status", book.status);
//     formData.append("questions", JSON.stringify(book.questions));

//     if (book.audio_book_url) {
//       formData.append("audio_book_url", book.audio_book_url);
//     }
//     if (book.image) {
//       formData.append("image", book.image);
//     }

//     try {
//       if (id) {
//         await axios.put(`${BASE_URL}/book/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Book updated successfully");
//       } else {
//         await axios.post(`${BASE_URL}/book`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Book added successfully");
//       }
//     } catch (error) {
//       console.error("Error saving book:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <nav className="mb-12 pt-5">
//         <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
//           <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//         </Link>
//       </nav>
//       <div className="row p-6 rounded-lg shadow-md mb-5">
//         <form onSubmit={handleSubmit} className="space-y-4 col-sm-8 bg-white p-6 rounded-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
//           <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add New Book"}</h2>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Book Name</label>
//             <input type="text" name="book_name" value={book.book_name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
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
//             <label className="block text-sm font-medium text-gray-700">Upload Audiobook (MP3)</label>
//             <input name="audio_book_url" type="file" accept="audio/mp3" onChange={handleFileChange} className="mt-1 p-2 w-full border rounded-md" />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Upload Image</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 w-full border rounded-md" />
//           </div>

//           <h3 className="text-lg font-bold mt-4">Add Questions</h3>
//           {book.questions.map((question, qIndex) => (
//             <div key={qIndex} className="border p-3 rounded-md mb-3 relative">
//               <input type="text" value={question.question_text} onChange={(e) => handleQuestionChange(qIndex, e)} className="mt-1 p-2 w-full border rounded-md" required />
//               {question.options.map((option, oIndex) => (
//                 <input key={oIndex} type="text" value={option.text} onChange={(e) => handleOptionChange(qIndex, oIndex, e)} placeholder={`Option ${oIndex + 1}`} className="mt-1 p-2 w-full border rounded-md" required />
//               ))}
//             </div>
//           ))}

//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
//             {id ? "Update Book" : "Add Book"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBook;










