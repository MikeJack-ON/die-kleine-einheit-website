import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { ROUTES } from "@/config/routes";
import Landing from "@/pages/Landing";
import Danke from "@/pages/Danke";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Teilnahmebedingungen from "@/pages/Teilnahmebedingungen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Landing />} />
          <Route path={ROUTES.danke} element={<Danke />} />
          <Route path={ROUTES.impressum} element={<Impressum />} />
          <Route path={ROUTES.datenschutz} element={<Datenschutz />} />
          <Route path={ROUTES.teilnahmebedingungen} element={<Teilnahmebedingungen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
