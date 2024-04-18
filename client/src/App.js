import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Payrent from './components/PayRent/Payrent';
import Filecomplaint from './components/FileComplaint/Filecomplaint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pay-rent" element={<Payrent />} />
        <Route path="/file-complaint" element={<Filecomplaint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
