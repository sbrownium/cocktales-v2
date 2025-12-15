import React from "react";
import Button from "./Button";

export default function SelectionContainer ({
    showingBar,
    handleToGoBars,
    handleClick
}) {
    return (
        <>
        {!showingBar &&
            <div
             className="initialSelect selectionContainer"
             >
             <Button
             handleClick={handleToGoBars}
             className='barButton'
             >
          <p>See</p>
          <p className='startEmoji'>🪩</p>
          <p>Bars</p>
        </Button>
        <Button
            handleClick={handleClick}
            className='drinkButton'
        >
        <p>Add</p>
        <p className='startEmoji'>🍹</p>
        <p>Drinks</p>
      </Button>
        </div>}
</>

    ) 
}