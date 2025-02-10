import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import {
  AiFillLinkedin,
  AiOutlineFundProjectionScreen,
  AiOutlineMail,
  AiOutlinePieChart,
  AiOutlineBarChart,
  AiOutlineGlobal,
  AiOutlineRobot,
  AiOutlineDatabase,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
  AiOutlineBulb,
  AiOutlineMessage,
  AiOutlineCloudSync,
  AiOutlineEdit,
  AiOutlineSolution,
  AiOutlineShareAlt,
} from "react-icons/ai";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";

// Dummy data for experiences and skills
const dummyExperiences = [
  {
    year: "2024",
    works: [
      {
        name: "SDR Expert",
        company: "LARGO FILMS SA",
        desc: "Led multi-channel lead generation efforts via email, phone, and LinkedIn. Managed CRM updates and fostered professional relationships to drive sales performance.",
      },
      {
        name: "B2B Appointment Setter",
        company: "Better Be Bold",
        desc: "Managed social media outreach and scheduled consultations. Maintained strong organization and time management to handle multiple client engagements.",
      },
    ],
  },
  {
    year: "2023",
    works: [
      {
        name: "LinkedIn Sales Manager",
        company: "Selling to Executives",
        desc: "Developed LinkedIn sales strategies targeting C-level executives, increasing lead generation among top-tier decision-makers.",
      },
      {
        name: "LinkedIn Marketing and Communications Specialist",
        company: "GLEAC",
        desc: "Expanded LinkedIn network and automated marketing processes, driving engagement with key industry players and enhancing brand storytelling.",
      },
      {
        name: "Freelance LinkedIn Development Specialist",
        company: "MapleDwell",
        desc: "Revamped LinkedIn strategy, boosting engagement by 75% and increasing B2B lead generation by 20%.",
      },
      {
        name: "Freelance LinkedIn Outreach Manager",
        company: "Avani Media",
        desc: "Executed LinkedIn outreach campaigns, increasing engagement by 40% and expanding the professional network by 25%.",
      },
    ],
  },
  {
    year: "2022",
    works: [
      {
        name: "Freelance LinkedIn Sales Developer",
        company: "5T Media and Design",
        desc: "Implemented targeted LinkedIn sales strategies, increasing lead generation by 30% and boosting client acquisition by 20%.",
      },
    ],
  },
];

const dummySkills = [
  {
    name: "AI-Powered Prospecting",
    bgColor: "#0077b5",
    icon: <AiOutlineRobot style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "Personalized Outreach Automation",
    bgColor: "#e91e63",
    icon: <AiOutlineMail style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "Clay (Data Enrichment & Outreach)",
    bgColor: "#3f51b5",
    icon: <AiOutlineDatabase style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "Make (Workflow Automation)",
    bgColor: "#ff9800",
    icon: <AiOutlineSetting style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "LinkedIn Social Selling",
    bgColor: "#0077b5",
    icon: <AiFillLinkedin style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "Multi-Touch Outreach Strategy",
    bgColor: "#4caf50",
    icon: <AiOutlineUsergroupAdd style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "CRM & Pipeline Management",
    bgColor: "#9c27b0",
    icon: (
      <AiOutlineFundProjectionScreen
        style={{ fontSize: "2rem", color: "#fff" }}
      />
    ),
  },
  {
    name: "Intent-Based Lead Generation",
    bgColor: "#673ab7",
    icon: <AiOutlineBulb style={{ fontSize: "2rem", color: "#fff" }} />,
  },

  {
    name: "Advanced LinkedIn Automation",
    bgColor: "#795548",
    icon: <AiOutlineCloudSync style={{ fontSize: "2rem", color: "#fff" }} />,
  },
  {
    name: "Email Deliverability Optimization",
    bgColor: "#f44336",
    icon: <AiOutlineMail style={{ fontSize: "2rem", color: "#fff" }} />,
  },

  {
    name: "Content & Messaging Strategy",
    bgColor: "#00bcd4",
    icon: <AiOutlineEdit style={{ fontSize: "2rem", color: "#fff" }} />,
  },

  {
    name: "Networking & Relationship Building",
    bgColor: "#3f51b5",
    icon: <AiOutlineGlobal style={{ fontSize: "2rem", color: "#fff" }} />,
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
