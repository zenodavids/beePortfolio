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
    <Cert />
    {/* <Work /> */}
    <Skills />
    <Testimonial />
    <Footer />
  </div>
);

export default App;
