import { Route, Routes } from "react-router-dom";
import Catalogue from "./pages/Catalogue";
import IndexPage from "./pages/SecondPage";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Catalogue />} path="/catalogue" />
    </Routes>
  );
}

export default App;
