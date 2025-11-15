import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import "./firebase";


console.log("APP LOADED");


function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: "#6D9773" }}
    >
      <h1 className="text-4xl font-bold mb-6" style={{ color: "white" }}>
        GitHub User Search
      </h1>

      <Search />

      <footer className="mt-10 text-white font-medium">
        Fatima Naeem · Rumaisha Haroon · Amna Ali
      </footer>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#B46C17] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-[#a15a14] transition transform hover:scale-110"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}

export default App;
