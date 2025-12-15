import './../styles/NewBar';

export default function NewBar ({ newDrink, validation, handleNewBar, focusNewBar }) {
    if (newDrink.isNewBar) {    
    return (
        <>
            <label>New Bar Name
            <input
              className={validation.needsBarName ? 'missing' : '' }
              id='newBar'
              type="text"
              value={newDrink.barName}
              onChange={handleNewBar}
              onFocus={focusNewBar}
            />
            </label>
        </>
    )
}};