import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google logo

const reviews = [
  { name: "Sue Hogg", text: "Vybrant took over my mum's care... peace of mind...", time: "3 years ago" },
  { name: "Brandon Blake", text: "High-standard health care with a personal touch.", time: "1 month ago" },
  { name: "Steve Bagshaw", text: "Great care partners... We sleep easier because of them.", time: "2 years ago" },
  { name: "Frank Overtoom", text: "Doing a great job managing my aunt's care needs.", time: "2 years ago" },
  { name: "La Mart Union", text: "Enthusiastic and dedicated team. Highly recommend.", time: "1 year ago" },
  { name: "Vimbai Nyuke", text: "Very pleasant staff and excellent service.", time: "2 years ago" },
  { name: "Karis Burgin", text: "The most kind, caring companionship carers.", time: "1 year ago" },
  { name: "Cheryl", text: "Excellent, compassionate service!", time: "4 years ago" },
  { name: "Suji Raju", text: "Most compassionate care service.", time: "2 years ago" },
  { name: "Esther Chikwanda", text: "Awesome", time: "9 months ago" },
];

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

export default function GoogleReviews() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % reviews.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[index];

  return (
    <div className="max-w-xl mx-auto text-center bg-white mt-10 rounded-2xl shadow-xl p-8 border relative">

      {/* Google Header */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <FcGoogle className="text-2xl" />
        <p className="font-bold text-lg">Google Reviews</p>
      </div>

      {/* Stars */}
      <div className="flex justify-center text-yellow-400 mb-2 text-xl">
        {"★★★★★"}
      </div>

      {/* Review Content */}
      <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
        
        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {getInitials(review.name)}
          </div>
        </div>

        <p className="text-gray-800 italic leading-relaxed">
          “{review.text}”
        </p>

        <p className="mt-4 font-semibold">{review.name}</p>
        <p className="text-sm text-gray-500">{review.time}</p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
