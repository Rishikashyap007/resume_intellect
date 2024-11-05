// import React from "react";
import { useContext } from "react";
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
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
    FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template10 = () => {
    const { resumeData, setResumeData, headerColor ,backgroundColorss} = useContext(ResumeContext);
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
        <div className="bg-gray-100 p-5">
        <div className="max-w-4xl bg-white p-6 mx-auto shadow-md border-l-4 border-red-600" style={{ borderLeftColor: backgroundColorss }}>
          <header className="text-center border-b-2 border-red-600 pb-3 mb-5" style={{ borderColor: backgroundColorss }}>
            <h1 className="text-3xl text-gray-800 uppercase tracking-wider" style={{ color: headerColor }}>{resumeData.name}</h1>
            <p className="text-sm text-gray-500 text-center m-0">
              <ContactInfo
                mainclass="flex flex-row gap-1 justify-center items-center mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </p>

          </header>

          <section className="mb-5">
            <p className="text-sm text-gray-500 leading-relaxed hover:outline-dashed hover:outline-2 hover:outline-gray-400" contentEditable="true"
                      suppressContentEditableWarning={true}>{resumeData.summary}</p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Experience</h2>
            <div className="mb-5">
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

                  <p className="content hyphens-auto text-gray-500 hover:outline-dashed hover:outline-2 hover:outline-gray-400" contentEditable="true"
                      suppressContentEditableWarning={true}>{item.description}</p>

                  <Droppable
                    droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                    type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="list-disc ul-padding content text-gray-500"
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
                                    className={` hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
          </section>

          <section className="mb-5">
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Education</h2>
            {resumeData.education.length > 0 && (
              <div className="mb-1">
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-1 text-sm text-gray-500 font-semibold">
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

          </section>

          <section>
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Skills</h2>
            <ul className="list-none pl-0 text-sm text-gray-500 leading-relaxed">
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
                              "  "
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
            </ul>
          </section>
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

export default Template10;
