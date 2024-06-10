import React, { useState } from 'react';

interface ReviewComponentProps {
  onSubmit: (data: ReviewData) => void;
}

interface ReviewData {
  serviceRating: number;
  review: string;
  images: File[];
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ onSubmit }) => {
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);

  const handleServiceRating = (rating: number) => {
    setServiceRating(rating);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewData: ReviewData = {
      serviceRating,
      review,
      images,
    };
    onSubmit(reviewData);
    setImages([])
    setReview("")
    setServiceRating(0)
  };

  return (
    <div className="max-w-md md:w-[600px] mx-auto p-6 rounded-lg md:ml-40">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Leave a Review</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1">
            <label htmlFor="service-rating" className="block font-semibold">
              Rate Our Service:
            </label>
            <RatingStars rating={serviceRating} onRatingChange={handleServiceRating} />
          </div>
        </div>
        <div className="mb-4">
          <textarea
            id="review-text"
            rows={5}
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image-upload" className="block font-semibold mb-1">
            Upload Images (up to 4):
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="w-full border border-gray-300 rounded-md py-2 px-2"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#9AD1AA] text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onRatingChange }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block text-2xl cursor-pointer ${
        i < rating ? 'text-yellow-400' : 'text-gray-300'
      }`}
      onClick={() => onRatingChange(i + 1)}
    >
      &#9733;
    </span>
  ));

  return <div className="flex">{stars}</div>;
};

export default ReviewComponent; 