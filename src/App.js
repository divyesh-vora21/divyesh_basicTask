import './App.css';
import { Routes, Route } from 'react-router-dom';
import Step1 from './components/Step1';

function App() {

  return (
    <div className="App ">
        <Routes>
          <Route path="/" element={<Step1/>} />
        </Routes>
    </div>
  );
}

export default App;
