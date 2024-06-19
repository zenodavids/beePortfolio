import React, { useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
// import react icons

import { motion } from 'framer-motion'
// import framer motion

import './Navbar.scss'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className='app__navbar'>
      {/* google BEM METHODOLOGY for the underscore in the class name */}
      <div className='app__navbar-logo'>
        <h2>
          Rebecca <span>Akparanta</span>
        </h2>
        {/* our logo */}
      </div>
      <ul className='app__navbar-links'>
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
          // create an array of nav links and create an instant return function(replacing the curly braces after the arrow with parenthesis )

          <li className='app__flex p-text' key={`link-${item}`}>
            {/* returns a key and the array of items */}

            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      {/* for the mobile menu */}
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {/* if toggle is true, open menu */}
        {toggle && (
          <motion.div
            // to use motion, type motion dot(.) the element you want to use

            whileInView={{ x: [300, 0] }}
            // means the menu, while open will take 300pixels space

            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            {/* if any nav link is clicked, close menu and go to the section */}
            <ul>
              {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
