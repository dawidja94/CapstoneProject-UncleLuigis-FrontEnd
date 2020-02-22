import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import CustomerRegistration from './Components/CustomerRegistration/CustomerRegistration';

class App extends React.Component<any, any> {

  constructor(props: any) {
      super(props);
      document.title = "Uncle Luigi's Bistro - Home";
  }
  render() {
      return (
          <div id="main">
              <Navbar />
              {/* <Landing /> */}
              
          </div>
      );
  }
}

export default App;
