import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Formation } from './components/Formation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Formation />} />
      </Routes>
    </Router>
  );
}

export default App;
