import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { SiUpwork } from "react-icons/si";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a
        href="https://www.upwork.com/freelancers/~0182906016caf8c804"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiUpwork style={{ color: "#6fda44" }} />
      </a>
    </div>
    <div>
      <a
        href="https://www.linkedin.com/in/rebecca-akparanta-9643a0233/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsLinkedin style={{ color: "#0077b5" }} />
      </a>
    </div>
  </div>
);

export default SocialMedia;
