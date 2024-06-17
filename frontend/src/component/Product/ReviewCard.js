import  ReactStars  from "react-rating-stars-component";
import React from "react";
import profilePng from "../User/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div class="max-w-sm ">
    <div class="relative">
        <div
            class="flex mx-5 items-center h-64 bg-gradient-to-r from-red-800 to-red-600 rounded-lg overflow-hidden">
            <div class="px-8">
                <p class="text-lg font-medium text-white mb-2">{review.comment}</p>
                <ReactStars {...options} />
                <div class="mt-4 flex items-center">
                    <img class="h-10 w-10 rounded-full mr-4" src={profilePng} alt="Avatar of person" />
                    <div>
                        <p class="text-white font-medium">{review.name}</p>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default ReviewCard;


