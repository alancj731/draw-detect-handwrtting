// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import DrawingCanvas from './layout/DrawingCanvas';
// import SimpleCanvas from './layout/SimpleCanvas';
import { Header } from 'semantic-ui-react';
import ResultDisplay from './layout/ResultDisplay';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState("None");
  return (
    <div className="App">
      <Header as='h4' style={{marginTop: '20px', marginBottom: '20px'}}>Please draw a number below...</Header>
      <DrawingCanvas setResult={setResult} />
      <ResultDisplay result={result} />
      {/* <SimpleCanvas /> */}
    </div>
  );
}

export default App;
