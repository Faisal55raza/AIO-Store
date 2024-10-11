import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import github from "./github.png"
import linkedin from "./linkedin.png"
import faisal from "./faisal.png"
import leetcode from "./code.png"
import MetaData from "../MetaData";

const About = () => {
  const visitPortfolio = () => {
    window.location = "https://celadon-wisp-33266b.netlify.app/";
  };
  return (
   
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={faisal}
              alt="Founder"
            />
            <Typography>MD Faisal Raza</Typography>
            <Button onClick={visitPortfolio} color="primary">
              Visit My PortFolio
            </Button>
            <span>
              Hi, this is Faisal if you liked this website feel free to like my repo or want to connect? send me connection request throgh LinkedIn.
            </span>
          </div>
          <div className="aboutSectionContainer2">
           <Typography component="h2">Social Networks</Typography>
            <a
              href="https://www.linkedin.com/in/faisal-raza-86556a258"
              target="blank"
            >
            <img className="img-link" src={linkedin} />
            </a>

            <a  href="https://github.com/Faisal55raza?tab=repositories" target="blank">
              <img className="img-link" src={github} />
            </a>
            <a  href="https://leetcode.com/u/Fz_227017/" target="blank">
              <img className="img-link" src={leetcode} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
