// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import DrawingCanvas from './layout/DrawingCanvas';
// import SimpleCanvas from './layout/SimpleCanvas';
import { Header } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Header as='h4' style={{marginTop: '20px', marginBottom: '20px'}}>Please draw a number below...</Header>
      <DrawingCanvas />
      {/* <SimpleCanvas /> */}
    </div>
  );
}

export default App;
