// import React from "react";
import {useContext} from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
    FaUnderline,
  } from "react-icons/fa";
  import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
  import dynamic from "next/dynamic";
  // Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template4 = () => {
    const { resumeData, setResumeData,headerColor,backgroundColorss } = useContext(ResumeContext);
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
      ];
    
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-5 bg-white shadow-lg">
     <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-500 mb-3" style={{ color: headerColor }}>{resumeData.name}</h1>
      <h2 className="text-xl text-gray-800 mb-5">{resumeData.position}</h2>
      <p className="mb-5 text-xs hover:scale-100 hover:text-gray-500 hover:outline-dashed hover:outline-2 hover:outline-gray-400"
      contentEditable="true"
      suppressContentEditableWarning={true}
      >{resumeData.summary}</p>

      <h3 className="text-lg font-semibold text-gray-800 mt-7 mb-4 border-b-2 pb-1" style={{ color: headerColor }}>Work Experience</h3>
      {resumeData.workExperience.map((item, index) => (
        <div key={index} className="mb-7">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {item.company}
          </h4>
          <p>{item.position}</p>
          <span className="text-sm text-gray-500 mb-3">
            <DateRange
              startYear={item.startYear}
              endYear={item.endYear}
              id={`work-experience-start-end-date`}
            />
          </span>

          <p className="content hyphens-auto hover:text-gray-500"
           contentEditable="true"
           suppressContentEditableWarning={true}
          >{item.description}</p>

          <Droppable
            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
          >
            {(provided) => (
              <ul
                className="list-disc ul-padding content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {typeof item.keyAchievements === "string" &&
                  item.keyAchievements
                    .split("\n")
                    .map((achievement, subIndex) => (
                      <Draggable
                        key={`${item.company}-${index}-${subIndex}`}
                        draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                        index={subIndex}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                    ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"}`}
                          >
                            <div
                              dangerouslySetInnerHTML={{ __html: achievement }}
                              contentEditable
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}

    </div>

    <div className="flex-1 p-5 bg-gray-100" style={{ backgroundColor: backgroundColorss }}>
      <div className="mb-6">
        <h4 className="text-lg font-semibold  text-[#818cf8] mb-3 border-b border-gray-300 pb-1" style={{ color: headerColor }}>Contact</h4>
        <ContactInfo
          mainclass=" contact"
          linkclass="inline-flex items-center gap-1"
          teldata={resumeData.contactInformation}
          emaildata={resumeData.email}
          addressdata={resumeData.address}
          telicon={<MdPhone />}
          emailicon={<MdEmail />}
          addressicon={<MdLocationOn />}
        />
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold  text-[#818cf8] mb-3 border-b border-gray-300 pb-1" style={{ color: headerColor }}>Skills</h4>
        <Droppable droppableId="skills" type="SKILLS">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resumeData.skills.map((skill, index) => (
                <Draggable
                  key={`SKILLS-${index}`}
                  draggableId={`SKILLS-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                        }`}
                    >
                      <Skills title={skill.title} skills={skill.skills} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div className="mb-6">
        {resumeData.education.length > 0 && (
          <div className="mb-1">
            <h2 className="section-title mb-1 border-b-2 text-[#818cf8]" style={{ color: headerColor }}>
              Education
            </h2>
            {resumeData.education.map((item, index) => (
              <div key={index} className="mb-1">
                <p className="content i-bold">{item.degree}</p>
                <p className="content">{item.school}</p>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`education-start-end-date`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
  );
};

const A4PageWrapper = ({ children }) => {
    const alertA4Size = () => {
      const preview = document.querySelector(".preview");
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    };
  
    return (
      <div className="w-8.5in border p-3" onLoad={alertA4Size}>
        {children}
      </div>
    );
  
  };

export default Template4;
