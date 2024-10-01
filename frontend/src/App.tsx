import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import PhotoPage from './components/PhotoPage';
import AnalysisPage from './components/AnalysisPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* Set the Home page as the new index route */}
          <Route index element={<Home />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="photos" element={<PhotoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
