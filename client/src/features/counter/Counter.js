import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incremented, decremented } from './counterSlice';
import { setColor } from '../color/colorSlice';

function Counter(){
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const color = useSelector((state) => state.color.color);

  const style = {
    backgroundColor: `rgb(${color})`
  }

  return(
    <div style={style}>
      <h1>currnt value is {count}</h1>
      <h2>current color is {color[0] + " " + color[1] + " " + color[2]}</h2>
      <button onClick={() => dispatch(incremented())}>Incremented</button>
      <button onClick={() => dispatch(decremented())}>Decremented</button>
      <button onClick={() => dispatch(setColor([200, 20, 200]))}>Color</button>
    </div>
  );
}

export default Counter;