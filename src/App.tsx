import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import Catalogue from "./pages/Catalogue";
import SecondPage from "./pages/SecondPage";
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path="/">
        <Route index element={<Catalogue />} />
        <Route element={<SecondPage />} path="/second-page" />
      </Route>
    </Routes>
  );
}

export default App;
