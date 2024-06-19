// we use this component  to wrap our website
// this acts as the HIGHER ORDER COMPONENT (HOC)
import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const date = new Date().getFullYear();

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        {/* provide classnames dynamically */}

        <SocialMedia />
        <div className='app__wrapper app__flex'>
          <Component />

          <div className='copyright'>
            <p className='p-text'>&copy; {date} Rebecca Akparanta</p>
            <p className='p-text'>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
