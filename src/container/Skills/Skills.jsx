import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import {
  AiFillLinkedin,
  AiFillShop,
  AiFillTool,
  AiOutlineFundProjectionScreen,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlinePieChart,
  AiOutlineBarChart,
  AiOutlineGlobal,
} from "react-icons/ai";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";

// Dummy data for experiences and skills
const dummyExperiences = [
  {
    year: "2023",
    works: [
      {
        name: "LinkedIn Marketing and Communications Specialist",
        company: "GLEAC",
        desc: "Effectively engaging with the target audience and reinforcing brand messaging. Expanded GLEAC's LinkedIn network and fostered relationships with key industry players.",
      },
      {
        name: "LinkedIn Sales Manager",
        company: "Selling to Executives",
        desc: "Crafted and implemented a LinkedIn sales strategy focused on engaging C-level executives, significantly enhancing lead generation among top-tier decision-makers.",
      },
    ],
  },
  {
    year: "2022",
    works: [
      {
        name: "Freelance LinkedIn Sales Developer",
        company: "5T Media and Design",
        desc: "Implemented a targeted LinkedIn sales strategy, boosting lead generation by 30%. Enhanced LinkedIn profiles and content, leading to greater brand visibility and engagement.",
      },

      {
        name: "Freelance LinkedIn Outreach Manager",
        company: "Avani Media",
        desc: "Developed and executed effective LinkedIn outreach campaigns, resulting in a 40% increase in engagement with key industry influencers and potential clients.",
      },
    ],
  },
  {
    year: "2021",
    works: [
      {
        name: "Freelance LinkedIn Development Specialist",
        company: "MapleDwell",
        desc: "Overhauled and optimized Mapledwell's LinkedIn strategy, leading to a 75% increase in follower engagement and a significant boost in brand awareness.",
      },
      {
        name: "Entrepreneur / E-commerce Store Manager",
        company: "CozyHome Mart",
        desc: "Successfully established and managed CozyHome Mart, an e-commerce store specializing in home goods and decor. Developed and executed digital marketing strategies to drive traffic and increase sales.",
      },
    ],
  },
];

const dummySkills = [
  {
    name: "LinkedIn Marketing",
    bgColor: "#0077b5",
    icon: <AiFillLinkedin style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Sales Strategy",
    bgColor: "#e0e0e0",
    icon: <AiFillTool style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Digital Marketing",
    bgColor: "#f0f0f0",
    icon: <AiFillShop style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Project Management",
    bgColor: "#ff5722",
    icon: (
      <AiOutlineFundProjectionScreen
        style={{ fontSize: "3rem", color: "#fff" }}
      />
    ),
  },
  {
    name: "Team Leadership",
    bgColor: "#4caf50",
    icon: <AiOutlineTeam style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Email Marketing",
    bgColor: "#009688",
    icon: <AiOutlineMail style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Analytics",
    bgColor: "#3f51b5",
    icon: <AiOutlinePieChart style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "SEO",
    bgColor: "#8bc34a",
    icon: <AiOutlineBarChart style={{ fontSize: "3rem", color: "#fff" }} />,
  },
  {
    name: "Global Marketing",
    bgColor: "#00bcd4",
    icon: <AiOutlineGlobal style={{ fontSize: "3rem", color: "#fff" }} />,
  },
];

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Setting dummy data directly
    setExperiences(dummyExperiences);
    setSkills(dummySkills);
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                {skill.icon}
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#F5C7A9"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
