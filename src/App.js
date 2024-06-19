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
  </div>
);

export default App;
