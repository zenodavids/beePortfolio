import React from "react";

import {
  About,
  Cert,
  Footer,
  Header,
  Skills,
  Testimonial,
  // Work,
} from "./container";
import { Navbar } from "./components";

import "./App.scss";
import QuickBrandCheck from "./components/QuickBrandCheck";

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Testimonial />
    <Cert />
    {/* <Work /> */}
    <Skills />
    <Footer />
    <QuickBrandCheck />
  </div>
);

export default App;
