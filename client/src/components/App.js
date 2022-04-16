import React, { Component } from 'react';
import Counter from '../features/counter/Counter';
import Contact from '../components/Contact/Contact'

class App extends Component {
  render() {
    return(
      <div>
        <Counter/>

        <Contact/>
      </div>
    );
  }
}

export default App;