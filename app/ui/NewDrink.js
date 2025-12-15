import React from 'react';
import './../styles/NewDrink'

export default function NewDrink({
  newDrink,
  validation,
  handleName,
  focusName,
  handleDescription,
  focusDescription,
  handlePrice,
  focusPrice
}){

  return (
    <>
      <label>Name of Drink
      <input
          className={validation.needsDrinkName && 'missing'}
          id='drinkName'
          type="text"
          value={newDrink.drinkName}
          onChange={handleName}
          onFocus={focusName}
      />
      </label>
      <label>Drink Description (from menu)
      <input
          className={validation.needsDescription && 'missing'}
          id='description'
          type="text"
          value={newDrink.description}
          onChange={handleDescription}
          onFocus={focusDescription}
      />
      </label>
      <label>Price $
      <input
          className={validation.needsPrice && 'missing'}
          id='price'
          type='number'
          value={newDrink.price}
          onChange={handlePrice}
          onFocus={focusPrice}
      />
      </label>
    </> 
)
}