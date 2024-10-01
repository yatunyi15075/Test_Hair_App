import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import PhotoPage from './pages/PhotoPage';
import AnalysisPage from './pages/AnalysisPage';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route index element={<Home />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="photo" element={<PhotoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
