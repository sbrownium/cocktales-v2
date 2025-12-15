import React, { useState, useContext, useRef, useEffect } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './app/UserContext.js';
import Submit from './Submit.js';
import SignInModal from './SignInModal.js';
import Button from './Button.js';
import './../styles/NewRating';


export default function NewRating({
  emojiLookUp,
  handleToggle,
  barID,
  drinkID,
  ratings,
  users,
  ratingsArray,
  editRating,
  setEditRating,
  hasBeenRated
}) {
    
    const [rating, setRating] = useState('');
    const [user] = useContext(UserContext);
    // const { userName, userID } = user
    const ratingSignInRef = useRef(null);
    // const drinkRatings = Object.values(ratings).filter(id => id.drinkID === drinkID);
    const drinkRatings = ratingsArray.filter(id => id.drinkID === drinkID);
    const filteredRatings = drinkRatings.filter(rating => rating.userID === user.userID)

    function handleSignModalToggle () {
      if (!ratingSignInRef.current.open) {
        ratingSignInRef.current.showModal(); // open modal
      } 
      else {
        ratingSignInRef.current.close(); // close modal
      }
  } 
  
    function handleRating (e) {
        setRating(Number(e.target.value))
}

function updateRating (id) {
  if (rating !== '') {
  if (filteredRatings.length !== 0) {
    const updates = {};
    const updatedRating = {
      ...filteredRatings[0],
      userID: id ? id : user.userID,
      lastTimeStamp: Date.now(),
      rating: rating
    };

  updates['/ratings/' + filteredRatings[0].ratingID] = updatedRating;
  
  
 
  return (
      update(ref(db), updates).then(() => {
        setRating('');
          console.log('Data saved successfully!')
          setEditRating(false);
    })
    .catch((error) => {
      console.log('problem writing')
    })
  ) 
}
if (filteredRatings.length === 0)  
 {
    const newRatingKey = push(child(ref(db), '/ratings/')).key;
    const updates = {};
    const newRating = {
      barID: barID,
      ratingID: newRatingKey,
      userID: id ? id : user.userID,
      drinkID: drinkID,
      initialTimeStamp: Date.now(),
      lastTimeStamp: Date.now(),
      rating: rating
    };
  updates['/ratings/' + newRatingKey] = newRating;
 
  
  return (
      update(ref(db), updates).then(() => {
        setRating('');
          console.log('Data saved successfully!')
          setEditRating(false);
    })
    .catch((error) => {
      console.log('problem writing')
    })
  )
}
}}
 // Wait for the user state to be set before running updateRating
//  useEffect(() => {
//   if (user && handleSignInSuccess && ratingSignInRef.current && ratingSignInRef.current.open) {
//     updateRating();
//     handleSignModalToggle(); // close the modal after updating
//   }
// }, [user]);

// Callback function to run after successful sign-in
async function handleSignInSuccess(id) {
  updateRating(id);
}

 // Callback function to run after successful sign-in
//  function handleSignInSuccess() {
//   updateRating();
// }

    function handleClick(e) {
      e.preventDefault();
      if (!user) {
        handleSignModalToggle();
        return
      } 
      updateRating();
}
    return (  
      <>
      <SignInModal
            message='rate the drink'
            reference={ratingSignInRef}
            handleToggle={handleSignModalToggle}
            users={users}
            handleCommentSubmit={handleClick}
            onSignInSuccess={handleSignInSuccess}
            // finishFlowFunction={updateRating}
        />
        <div className='userRatingContainer'>
        <form className='ratings'> 
          <select name='ratingSelect'
            value={rating.rating} 
            onChange={handleRating}
            className={hasBeenRated ? 'rated' : 'unrated'}
            defaultValue={hasBeenRated && hasBeenRated.rating} // If editing a rating, puts in the previous value as a default
          >
            <option value='rate'>Rate</option>
            {Object.entries(emojiLookUp).map(([key, value], index) => (
    <option key={index} value={value}>{key}</option>
)).reverse()}
          </select>
          {/* </label> */}
         
          <Submit className='color-1' handleClick={handleClick} value='save'/>
          
          {/* <Submit handleClick={handleClick} value='add'/> */}
        </form>
        {editRating &&
        <Button className='nmind color-4' handleClick={handleToggle}>
            Never Mind 
        </Button>
        }
        </div>   
    </>
    );
  }