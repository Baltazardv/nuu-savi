import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Intro from "./components/Intro.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Cabildo from "./pages/Cabildo.jsx";
import Historia from "./pages/Historia.jsx";
import Transparencia from "./pages/Transparencia.jsx";
import Contratos from "./pages/Contratos.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      {isHome && <Intro />}
      <ScrollToTop />
      <Header transparentOnTop={isHome} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cabildo" element={<Cabildo />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
