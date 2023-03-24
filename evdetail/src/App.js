import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EV from './EVapp';
import Load from './Loading';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<EV />} />
          <Route path="/load" element={<Load />} />
        </Routes>
    </Router>
  );
}

export default App;
