import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
  //const [userAccountAddress, setUserAccountAddress] = useState("");

  let hej = "hello";
  return (
    <DataContext.Provider value={{ userAccountAddress: "address here" }}>
      <body class="stretched device-xl bg-white no-transition">
        <Navbar hej={hej} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </body>
    </DataContext.Provider>
  );
}

export default App;
