import React, { useEffect, useState } from "react";


const reviews = [
  {
    name: "Justin Raj",
    image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    rating: "https://static.vecteezy.com/system/resources/thumbnails/009/663/927/small/5-star-rating-review-star-transparent-free-png.png",
    review:
      "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
  },
  {
    name: "Antony",
    image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    rating: "https://static.vecteezy.com/system/resources/thumbnails/009/663/927/small/5-star-rating-review-star-transparent-free-png.png",
    review:
      "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
  },
  {
    name: "Surendar",
    image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    rating: "https://static.vecteezy.com/system/resources/thumbnails/009/663/927/small/5-star-rating-review-star-transparent-free-png.png",
    review:
      "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
  }
];

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="unique-slider-section">
      <h2 className="unique-heading">Our customers tell it better than we do!</h2>
      <p className="unique-subheading">Excellent <strong>4.9 / 5</strong></p>
      <div className="unique-slider-container">
        <div
          className="unique-slider-content"
          style={{ transform: `translateX(-${currentIndex * 320}px)` }}
        >
          {reviews.map((review, index) => (
            <div className="unique-review-card" key={index}>
              <div className="unique-flex-profile">
                <img
                  src={review.image}
                  alt="Profile"
                  className="unique-profile-image"
                />
                <div>
                  <h3 className="unique-name-cus">{review.name}</h3>
                  <img
                    src={review.rating}
                    alt="Rating"
                    className="unique-rating-image"
                  />
                </div>
              </div>
              <p className="unique-prop">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;