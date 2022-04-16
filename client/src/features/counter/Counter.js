import React from 'react';
import { useSelector, useDicspatch } from 'react-redux';
import { incremented, decremented } from './counterSlice';
import { setColor } from '../color/colorSlice';

function Counter(){
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const color = useSelector((state) => state.ui.color);

  const setRandomColor = () => {
    return [
      Math.floor((Math.random() * 55) + 200),
      Math.floor((Math.random() * 55) + 200),
      Math.floor((Math.random() * 55) + 200)
    ]
  }

  const style = {
    backgroundColor: `rgb(${color})`
  }

  return(
    <div>
      <div>
        <h1>value {count}</h1>
        <button onClick={() => dispatch(incremented())}>Incremented</button>
        <button onClick={() => dispatch(decremented())}>Decremented</button>
      </div>
      <div style={style}>
        <h2>color {`[${color[0]}, ${color[1]}, ${color[2]}]`}</h2>
        <button onClick={() => dispatch(setColor(setRandomColor()))}>Color</button>
      </div>
    </div>
  );
}

export default Counter;