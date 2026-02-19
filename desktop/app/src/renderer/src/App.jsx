import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<h1>Olla mundo</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App
