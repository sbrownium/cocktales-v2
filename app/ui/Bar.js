import React, {useState, useMemo, useContext} from "react";
import DrinkList from './DrinkList.js'
import ChangeBar from './ui/ChangeBar.js';
import Button from "./ui/Button.js";
import { UserContext } from "./app/UserContext.js";
import { BarContext } from "./app/BarContext.js";
import '../../styles/Bar.css';
import TimeOfDay from "./TimeOfDay.js";
import XIcon from "./XIcon.js";



export default function Bar({
  bars,
  drinks,
  comments,
  ratings,
  users,
  beingEditted,
  handleToggle,
  changeBarRef,
  handleChangeBarToggle,
  showingBar,
  setShowingBar
}) {
  const [user] = useContext(UserContext);
  const { selectedBar, setSelectedBar } = useContext(BarContext)
  // const [barBeingEditted, setBarBeingEditted] = useState(false);
  const [showBarArchive, setShowBarArchive] = useState(false);
  const [editBarName, setEditBarName] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const unselected = !showBarArchive ? 'Current Bars' : 'Current & Archived Bars'; // defaultValue for <ChangeBar/> <select>. showBarArchive is a checkbox
  // on the changeBar modal controlling showing archived bars or not


  function toggleShowBarArchive () {
    setShowBarArchive(showBarArchive => !showBarArchive);
    // resets if an archived bar is selected when hide archived bars is fired
    // checks to make sure a bar is showing before checking if it is archived
    if (showingBar && (Object.values(bars).filter(bar => bar.barID === selectedBar.barID)[0].archived === true)) {
      setShowingBar(false);
    }
  }

  function handleSelect (e) { // <ChangeBar> onChange handler
    e.preventDefault();
    setSelectedBar(e.target.value); // setSelectedBar from BarContext
    if ((e.target.value === unselected)) { // when a bar is not selected
      setShowingBar(false); // whether any bar is showing
    } else {
      setShowingBar(true);
      setEditBarName(selectedBar.barName) // for editing the barName
    }
    handleChangeBarToggle(); // toggles changeBar modal
    }; 
    

  const barsArray = useMemo(() => {
  if (showBarArchive) {
    return Object.values(bars)
  } 
    return Object.values(bars).filter(bar => bar.archived === false);
  
  }, [showBarArchive, bars])
  const filteredBar = barsArray.filter(bar => bar.barID === selectedBar.barID);
  const barsDrinks = Object.values(drinks).filter(drink => drink.barID === selectedBar.barID);
    return (
      <div className="barContainer">   
      <ul className="barList">
        <li>
         <>
         <dialog ref={changeBarRef} className='overlay changeBars'>
        <div className='buttonHolder'>
            <Button className='modalBtn' handleClick={handleChangeBarToggle}>
                <XIcon
                height='1.25em'
                fillColor='rgba(255, 255, 255, 0.6)'
                />
            </Button>
            {(Object.values(bars).some(bar => bar.archived === true)) && // only show archive button if archived bars exist
          <form className="modalCheckBox">
            <label>
              <input
                type="checkbox"
                checked={showBarArchive}
                onChange={toggleShowBarArchive}
              />
                Include Archived Bars
              </label>
            </form>
          } 
        </div>
        <div className="formContainer">
           {!showingBar && <TimeOfDay/>}
           <form>
        <ChangeBar
          barsArray={barsArray}
          handleSelect={handleSelect}
          showingBar={showingBar}
          showBarArchive={showBarArchive}
          changeBarRef={changeBarRef}
          className='negative'
          unselected={unselected}
        />
        </form>
        </div>
      </dialog>
      </>
        </li>
        {filteredBar.map(({ addedBy, archived, barName, barID }, index) => {
            return (
              <li key={index}>
                <DrinkList
                  addedBy={addedBy}
                  archived={archived}
                  barName={barName}
                  barID={barID}
                  bars={bars}
                  barsDrinks={barsDrinks}
                  comments={comments}
                  ratings={ratings}
                  users={users}
                  handleToggle={handleToggle}
                  beingEditted={beingEditted}
                  showFilter={showFilter}
                />
              </li>
            );
          })}
      </ul>
    </div>
    );
  }
  