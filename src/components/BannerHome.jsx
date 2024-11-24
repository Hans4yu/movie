import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerHome = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [bannerData, setBannerData] = useState([]);

  // Fetch trending data for banner
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        );
        const data = await response.json();
        setBannerData(data.results);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchBannerData();
  }, []);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentImage, bannerData]);

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "bannerHome" + index}
            className="min-w-full min-h-full overflow-hidden relative group transition-all duration-500"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {/* Banner Image */}
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              className="h-full w-full object-cover"
              alt={data.title || data.name}
            />

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>

            {/* Banner Content */}
<div className="absolute bottom-10 left-10 text-white max-w-lg space-y-4">
  <h1 className="text-4xl font-bold drop-shadow-lg">
    {data.title || data.name}
  </h1>
  <p className="text-md line-clamp-3">{data.overview}</p>
  <div className="flex items-center space-x-4">
    <p>Rating: {data.vote_average.toFixed(1)}</p>
    <p>|</p>
    <p>Views: {data.popularity.toFixed(0)}</p>
  </div>
  {/* Added margin-top for spacing */}
  <Link to={`/${data.media_type}/${data.id}`}>
    <button className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-800 transition">
      Play Now
    </button>
  </Link>
</div>


            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-200"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full text-black hover:bg-gray-200"
            >
              <FaAngleRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
