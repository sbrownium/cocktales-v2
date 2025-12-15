import { useContext} from 'react';
import { BarContext } from '../context/BarContext';
import '../styles/BarSelector';

export default function BarSelector({
  bars,
  newDrink,
  validation,
  handleExistingBar,
  focusSelector
  // ,
  // defaultBarID,
  // defaultBarName
}) {
    const { selectedBar } = useContext(BarContext);
    const barsArray = Object.values(bars);
    const uniqueBars = new Set();
    uniqueBars.add(selectedBar.barID);
      return (
        <>
          <label>Bar
          <select name='barSelect'
          defaultValue={selectedBar.barID} 
          className={validation.needsBarID ? 'missing' : null }
          value={newDrink.barID} 
          onChange={handleExistingBar}
          onFocus={focusSelector}>
            <option key='0' value={selectedBar.barID}>{selectedBar.barName}</option>
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);  
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
              })}
            <option isNew={true} className='new' value='new'>New</option>
            </select>
            </label>
            </>
      )
};
