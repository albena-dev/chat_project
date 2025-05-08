import React from "react";
import Registration from "./pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./pages/SignIn/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
