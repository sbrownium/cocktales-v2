import React from "react";
import '../styles/AverageRating.css';

export default function AverageRating({
    emojiLookUp,
    ratings,
    ratingDrinkID
    }) {

    const ratingsArray = Object.values(ratings);
    const filteredRatings = ratingsArray.filter(drink => drink.drinkID === ratingDrinkID);
    const drinkRatings = [];
// This logic can probably be simpler
    filteredRatings.forEach((e) => drinkRatings.push(e.rating));

    if (drinkRatings.length !== 0){
    const ratingTotal = drinkRatings.reduce((accum, current) => accum + current);
    const ratingAverage = Math.round(ratingTotal / drinkRatings.length);
    const ratingToEmoji = Object.keys(emojiLookUp).find(key => emojiLookUp[key] === ratingAverage);
   
    return (
        <span className='emoji'>{ratingToEmoji}</span>
    )} 
}