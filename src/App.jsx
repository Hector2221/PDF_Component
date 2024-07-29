import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Login, PDFControl } from "./Pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/PDFControl" element={<PDFControl />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
