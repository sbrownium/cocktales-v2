import React, {useContext, useState, useMemo, useRef, useEffect} from 'react';
import { UserContext } from './app/UserContext.js';
import { BarContext } from './app/BarContext.js';
import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from './Button';
import Drink from './Drink';
import MoreOptionsMenu from './MoreOptionsMenu';
import EditBox from './EditBox';
import '../../styles/DrinkList.css'

export default function DrinkList({
    addedBy,
    archived,
    barName,
    barID,
    bars,
    beingEditted,
    comments,
    barsDrinks,
    ratings,
    handleToggle,
    users
}){
  
  const [user] = useContext(UserContext);
  const { selectedBar } = useContext(BarContext)
  const {userID} = user;
  const [checked, setChecked] = useState('Date Added');
  const [showDrinkArchive, setShowDrinkArchive] = useState(false);
  const [barBeingEditted, setBarBeingEditted] = useState(false);
  const [changeBarName, setChangeBarName] = useState(selectedBar.barName);
  const archivedParent = archived;
  const barRef = useRef(null);

  useEffect(() => {
      setBarBeingEditted(false); // Close the bar edit box when bar name changes
      setChangeBarName(selectedBar.barName);
   }, [selectedBar]);

  const initialFilter = {
    topRated: null,
    withComments: null,
    myTop: null,
    myComments: null
  }
  const [ filterChecked, setFilterChecked ] = useState(initialFilter);
    
  const commentsArray = Object.values(comments);
  const filteredComments = commentsArray.filter(comment => comment.barID === barID);
  const myfilteredComments = filteredComments.filter(comment => comment.userID === userID);

  function handleChange (e) {
    setChecked(e.target.value)
  }

  function toggleBarEdit () {
    setBarBeingEditted(barBeingEditted => !barBeingEditted);
  }

  function toggleShowDrinkArchive () {
    setShowDrinkArchive(showDrinkArchive => !showDrinkArchive)
  }

  function handleBarNameEdit (e) {
    e.preventDefault();
    setChangeBarName(e.target.value);
  }

  function handleNeverMind () {
    toggleBarEdit();
    setChangeBarName(selectedBar.barName);
  }

  function alphaSort (a,b) {
    const c = a.drinkName.toLowerCase();
    const d = b.drinkName.toLowerCase();
      if ( c < d ){
        return -1;
      }
      if ( c > d ){
        return 1;
      }
      return 0;
    }

  function dateSort (a,b) {
   return a.initialTimeStamp - b.initialTimeStamp;
  } 

  function findRating (x) {
    const ratingsArray = Object.values(ratings);
    let filteredRatings = []
      if (checked === 'My Highest Rating' || checked === 'My Lowest Rating' || filterChecked.myTop === 'My Top Rated') {
        filteredRatings = ratingsArray.filter(rating => rating.userID === user.userID).filter(drink => drink.drinkID === x.drinkID)
      } else {
        filteredRatings = ratingsArray.filter(drink => drink.drinkID === x.drinkID);
      }
    const drinkRatings = [];
// This logic can probably be simpler
    filteredRatings.forEach((e) => drinkRatings.push(e.rating));
    if (drinkRatings.length !== 0){
    const ratingTotal = drinkRatings.reduce((accum, current) => accum + current);
    return Math.round(ratingTotal / drinkRatings.length);
    }
    }
  function highAverageSort (a,b) {
    if ((findRating(a) !== undefined) && (findRating(b) !== undefined))
      return findRating(b) - findRating(a);
  }

  function lowAverageSort (a,b) {
    if ((findRating(a) !== undefined) && (findRating(b) !== undefined))
      return findRating(a) - findRating(b);
  }

  function handleFilterChange (e) {
    if (e.target.value === 'Only Top Rated') {
      if (filterChecked.topRated === 'Only Top Rated') {
        setFilterChecked({
          ...filterChecked,
            topRated: null
          });
      } else {
        setFilterChecked({
          ...filterChecked,
            topRated: e.target.value
          });
      }
  } else if (e.target.value === 'With Comments') {
    if (filterChecked.withComments === 'With Comments') {
      setFilterChecked({
        ...filterChecked,
        withComments: null
      });
    } else {
      setFilterChecked({
        ...filterChecked,
        withComments: e.target.value
      });
   }
} else if (e.target.value === 'My Top Rated') {
  if (filterChecked.myTop === 'My Top Rated') {
    setFilterChecked({
      ...filterChecked,
      myTop: null
    });
  } else {
    setFilterChecked({
      ...filterChecked,
      myTop: e.target.value
    });
 }
} else if (e.target.value === 'My Comments') {
  if (filterChecked.myComments === 'My Comments') {
    setFilterChecked({
      ...filterChecked,
      myComments: null
    });
  } else {
    setFilterChecked({
      ...filterChecked,
      myComments: e.target.value
    });
 }
}
}

const sortedDrinks = useMemo(() => {
  const drinksArray = () => {
  if (showDrinkArchive) {
    return barsDrinks;
  } else {
    return barsDrinks.filter(drink => drink.archived === false);
  }}
  const filteredDrinks = drinksArray().filter(drink => drink.barID === barID);

  function getSortedDrinks (){
    if (checked === 'Alphabetical') {
      return filteredDrinks.toSorted(alphaSort);
    } if (checked === 'Highest Average Rating') {
      return filteredDrinks.toSorted(highAverageSort);
    } if (checked === 'Lowest Average Rating') {
      return filteredDrinks.toSorted(lowAverageSort);
    } if (checked === 'My Highest Rating') {
      return filteredDrinks.toSorted(highAverageSort);
    } if (checked === 'My Lowest Rating') {
      return filteredDrinks.toSorted(lowAverageSort);
    }
      return filteredDrinks.toSorted(dateSort);
  }
  const sortedDrinks = getSortedDrinks();
  function onlyTopRated (drink) {
    return findRating(drink) === 4; 
  }
  function onlyWithComments (drink) {
    return (filteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  function onlyMyComments (drink) {
    return (myfilteredComments.some(comment => comment.drinkID === drink.drinkID))
  }
  if ((filterChecked.topRated !== null) && (filterChecked.withComments === null)) {
    return sortedDrinks.filter(onlyTopRated)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated === null)) {
    return sortedDrinks.filter(onlyWithComments)
  } if ((filterChecked.withComments !== null) && (filterChecked.topRated !== null)) {
    return sortedDrinks.filter(onlyTopRated).filter(onlyWithComments)
  } 
  if ((filterChecked.myTop !== null) && (filterChecked.myComments === null)) {
    return sortedDrinks.filter(onlyTopRated)
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop === null)) {
    return sortedDrinks.filter(onlyMyComments) 
  } if ((filterChecked.myComments !== null) && (filterChecked.myTop !== null)) {
    return sortedDrinks.filter(onlyMyComments).filter(onlyTopRated)
  }
  return sortedDrinks;
}, [barsDrinks, showDrinkArchive, beingEditted, checked, filterChecked, filteredComments, myfilteredComments]);

function barNameUpdate (e){
  e.preventDefault();
  const updates = {};
  const bar = Object.values(bars).filter(bar => bar.barID === barID)[0];
  const newName = {
    ...bar,
    barName: changeBarName,
    lastTimeStamp: Date.now()
  };
updates['/bars/' + barID] = newName;

return (
    update(ref(db), updates).then(() => {
        console.log('Data saved successfully!')
  })
  .catch((error) => {
    console.log('problem writing')
  })
)};
    return (
<>
<div className='nameContainer'>

{!barBeingEditted ?
  <>
  <h1 className={archived && 'archived'}>{barName}</h1>
  <div className='nameSubContainer'>
  {(barsDrinks.filter(drink => drink.barID === barID).some((drink) => drink.archived === true)) &&
        // Checks if there is an archived drink to determine to show checkbox
      <form className="drinkArchiveCheckBox">
       <label>
         <input
           type="checkbox"
           checked={showDrinkArchive}
           onChange={toggleShowDrinkArchive}
         />
           Include Archived Drinks
         </label>
       </form>
       // End of checkbox display conditional
      } 
  <MoreOptionsMenu 
    path='/bars/'
    nodeID={barID}
    toggleBeingEditted={toggleBarEdit}
    userID={addedBy}
    reference={barRef}
    categoryObject={bars} // for archiving
    className='bars'
    archived={archived}
  />
  </div>
  </>
 :

              <form>
                  <EditBox
                    className={(changeBarName === '') && 'missing'}
                    id='barNameEdit'
                    edit={changeBarName}
                    handleEdit={handleBarNameEdit}
                  />
                    <Button
                      handleClick={barNameUpdate}
                      children='Save'
                      className='color-1'
                    />
                    <Button
                      handleClick={handleNeverMind}
                      children='Never Mind'
                      className='color-4'
                    /> 
                  
                  {(changeBarName === '') && 
               <p className='missing'>Please give the bar a name to save</p>
                }
                </form>

} 

               
               </div>
            
        <ul className='drinkList'>
          {sortedDrinks.map(({addedBy, archived, drinkName, drinkID, description, initialTimeStamp, price}, index) => ( 
          <li className='drinkContainer' key={index}>
             <Drink
              addedBy={addedBy}
              archived={archived}
              archivedParent={archivedParent}
              barID={barID}
              beingEditted={beingEditted}
              comments={comments}
              drinkName={drinkName}
              drinkID={drinkID}
              drinks={barsDrinks}
              description={description}
              handleToggle={handleToggle}
              initialTimeStamp={initialTimeStamp}
              price={price}
              ratings={ratings}
              users={users}
              />
          </li>
          ))}
        </ul> 
        </>
      )    
}
