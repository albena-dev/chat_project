import React from "react";
import Registration from "./pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import RootLayout from "./components/RootLayout/RootLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/massage" element={"This is massage page"}></Route>
          <Route path="/notification" element={"This is notification page"}></Route>
          <Route path="/settings" element={"This is settings page"}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
