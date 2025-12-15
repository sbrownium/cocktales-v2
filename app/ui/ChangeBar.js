import React, {useContext} from "react";
import { BarContext } from "./app/BarContext";

export default function ChangeBar ({
  barsArray,
  handleSelect,
  showingBar,
  showBarArchive,
  unselected
}) {
  const { selectedBar } = useContext(BarContext)
  
  // once a bar has been selected
      return (
          <select name='barSelect'
            className={showBarArchive && 'outline-1'}
            onChange={handleSelect}
            value={showingBar ? selectedBar.barID : unselected}
            defaultValue={showingBar ? selectedBar.barID : unselected}
          >
            {!showingBar && <option value={unselected}>{unselected}</option>}
            {barsArray.map(({ barName, barID }, index) => {
                return (
                  <option key={index} value={barID}>{barName}</option>
                )
              }
            )
              }
            </select>
      )
};

    