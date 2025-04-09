import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <ul>
          <li> How To Use Sorting Visualizer</li>
          <li>Array Size</li>
          <li>Array Slider</li>
          <li>Sorting Algorithms</li>
          <li><input type='button' value="Reset Choices"></input></li>
          <li>Dark Mode</li>
        </ul>
      </div>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
