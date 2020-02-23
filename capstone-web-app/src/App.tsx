import React from 'react';
import './App.css';
import Landing from './Components/Landing/Landing';

class App extends React.Component<any, any> {

  constructor(props: any) {
      super(props);
      document.title = "Uncle Luigi's Bistro - Home";
  }
  render() {
      return (
          <div id="main">
              <Landing />
          </div>
      );
  }
}

export default App;
