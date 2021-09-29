import React, { useEffect, useState } from "react";
import {timeFromNow} from "../functions"

const Job = (props) => {
  const {
    company,
    contract,
    no,
    level,
    location,
    company_logo,
    position,
    posted_at,
    role,
    skill_tags,
    verified
  
  } = props.data;
  console.log(skill_tags)

  let keywords = [role, level, ...skill_tags];

  const [icon, setIcon] = useState("");

  const importSvgs = () => {
    if(!!company_logo){
      setIcon(company_logo);
    }else{
      const logoSvg = import(`./images/myhome.svg`).then((d) => {
        setIcon(d.default);
      });
    }
    
  };

  useEffect(() => {
    importSvgs();
  }, [company_logo]);

  return (
    <div
      className={
        // featured ? "job-container job-container--borderLeft" : 
        "job-container"
      }
    >
      <div className="logo">
        <img src={icon} alt="" />
      </div>
      <div className="part1">
        <div className="company">
          <span className="cname">{company}</span>
          {props.data.verified && <span className="verified">verified</span>}
          {props.data.new && <span className="new">new!</span>}
          {/* {props.data.featured && <span className="featured">featured</span>} */}
        </div>

        <div className="position">{position}</div>

        <div className="details">
          <span>{timeFromNow(posted_at)}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{contract}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{location}</span>
        </div>
      </div>

      <div className="part2">
        {keywords.map((key, id) => (
          <span onClick={() => props.setkeywords(key)} key={id}>
            {key}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Job;
