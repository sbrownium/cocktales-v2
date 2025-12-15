import React, {useContext, useState, useEffect, useRef} from 'react';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './app/UserContext.js';
import Button from './Button.js';
import EditBox from './ui/EditBox.js';
import '../../styles/Drink.css';
import CommentList from './CommentList.js';
import RatingsList from './RatingsList.js';
import MoreOptionsMenu from './ui/MoreOptionsMenu.js';


export default function Drink({
  addedBy,
  archived,
  archivedParent,
  barID,
  comments,
  drinkName,
  drinkID,
  drinks,
  description,
  handleToggle,
  initialTimeStamp,
  price,
  ratings,
  users 
 }) {
  
  const [user] = useContext(UserContext);
  const [editDrink, setEditDrink] = useState(false)
  const [editDrinkName, setEditDrinkName] = useState(drinkName);
  const [editDrinkDescription, setEditDrinkDescription] = useState(description)
  const [editDrinkPrice, setEditDrinkPrice] = useState(price);
  const drinkRef = useRef(null);
  
  useEffect(() => {
    setEditDrinkName(drinkName);
  }, [drinkName]);

  useEffect(() => {
    setEditDrinkDescription(description);
  }, [description]);

  useEffect(() => {
    setEditDrinkPrice(price);
  }, [price]);

  const emojiLookUp = {
    '🤢': 1,
    '🤷‍♀️': 2,
    '👍': 3,
    '🎉': 4
};

function toggleDrinkEdit () {
  setEditDrink(editDrink => !editDrink);
}

function handleDrinkNameEdit (e) {
    e.preventDefault();  
    setEditDrinkName(e.target.value);
}

function handleDrinkDescriptionEdit (e) {
  e.preventDefault();
  setEditDrinkDescription(e.target.value);
}

function handleDrinkPriceEdit (e) {
  e.preventDefault();
  setEditDrinkPrice(e.target.value);
}

function handleNeverMind (e) {
  e.preventDefault();
  resetDrinks();
  toggleDrinkEdit();
}

function resetDrinks () {
  setEditDrinkName(drinkName);
  setEditDrinkDescription(description);
  setEditDrinkPrice(price);
}

function handleClick(e){
  e.preventDefault();
  const updates = {};
  const newEdit = {
    addedBy,
    archived,
    barID,
    description: editDrinkDescription,
    drinkID,
    drinkName: editDrinkName,
    initialTimeStamp,
    lastTimeStamp: Date.now(),
    price: editDrinkPrice
  };
  resetDrinks();
  toggleDrinkEdit();
  updates['/drinks/' + drinkID] = newEdit;
return (
    update(ref(db), updates).then(() => {
        console.log('Data saved successfully!')
  })
  .catch((error) => {
    console.log('problem writing')
  })
)
}
    return (
      <>   
            {!editDrink ?
              <>
              <div className='nameRatingsContainer'> 
              <h2 className={(archived || archivedParent) && 'archived'}>{drinkName}</h2> 
              <RatingsList
                barID={barID}
                drinkID={drinkID}
                ratings={ratings}
                users={users}
                emojiLookUp={emojiLookUp}
              />
             </div> 
         <div className='descriptionContainer'>
              <div className={`description ${(archived || archivedParent) && 'archived'}`}> 
                {description} &mdash;
                ${Number(price).toFixed(2)}
              </div>
            {!archivedParent && // if the parent is archived don't show menu
            <MoreOptionsMenu 
              path='/drinks/'
              nodeID={drinkID}
              toggleBeingEditted={toggleDrinkEdit}
              userID={addedBy}
              reference={drinkRef}
              categoryObject={drinks} // for archiving
              className='drinks'
              archived={archived}
            />
          }
            </div>
             {!(archived || archivedParent) && // checks for logged in user and that drink is not archived nor is the bar
              <CommentList
                comments={comments}
                drinkID={drinkID}
                users={users}
              />
              } 
              </>
              :      
<>
<form>
<>
  <EditBox
      className={(editDrinkName === '') && 'missing'}
      id='drinkNameEdit'
      edit={editDrinkName}
      handleEdit={handleDrinkNameEdit}
  />
  &nbsp;&mdash;&nbsp;
  <EditBox
      className={(editDrinkDescription === '') && 'missing'}
      id='drinkDescriptionEdit'
      edit={editDrinkDescription}
      handleEdit={handleDrinkDescriptionEdit}
  />
  &nbsp;&mdash;&nbsp;$
   <EditBox
      className={(editDrinkPrice === '') && 'missing'}
      id='drinkPriceEdit'
      edit={editDrinkPrice}
      handleEdit={handleDrinkPriceEdit}
  />

   {((editDrinkName === '') || (editDrinkDescription === '') || (editDrinkPrice === '')) && 
    //.missing from NewDrink.css
    <p className='missing'>Please fill out all the fields to save</p> 
   }
  <Button
    handleClick={handleClick}
    children='Save'
    className='color-1'
 />
   <button
    onClick={handleNeverMind}
    className='color-4'
    >
      Never Mind
    </button>
  
   </>
</form> 
</>   
 }       
      </>  
      ) 
}
