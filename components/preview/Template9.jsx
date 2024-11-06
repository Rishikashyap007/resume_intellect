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
const Template9 = () => {
    const { resumeData, setResumeData,headerColor } = useContext(ResumeContext);
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
    <div className="max-w-4xl mx-auto bg-white p-5 shadow-lg">
      <div className="mb-5">
        <h1 className="text-4xl font-bold text-left" style={{ color: headerColor }}>{resumeData.name}</h1>
        <p className="text-sm text-gray-600 hover:outline-dashed hover:outline-2 hover:outline-gray-400"
        contentEditable="true"
        suppressContentEditableWarning={true}>{resumeData.summary}</p>
      </div>
      <div className="text-left mb-5 text-sm text-gray-600">
        <p>
          <ContactInfo
            mainclass="gap-1 mb-1 contact"
            linkclass="inline-flex items-center gap-1"
            teldata={resumeData.contactInformation}
            emaildata={resumeData.email}
            addressdata={resumeData.address}
            telicon={<MdPhone />}
            emailicon={<MdEmail />}
            addressicon={<MdLocationOn />}
          />
        </p>
      </div>
      <div className="flex justify-between">
        <div className="w-3/5 pr-2">
          <section className="mb-5">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>Experience</h2>
            <div className="mb-3">
              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
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
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto p-2 hover:outline-dashed hover:outline-2 hover:outline-gray-400" contentEditable="true"
                      suppressContentEditableWarning={true}>
                                  {item.description}
                                </p>
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
                                                  className={`
                                      hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                      ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
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
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }}   >
                          Projects
                        </h2>
                        {resumeData.projects.map((item, index) => (
                          <Draggable
                            key={`${item.name}-${index}`}
                            draggableId={`PROJECTS-${index}`}
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
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold text-md font-semibold">{item.name}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="content"
                                >
                                  {item.link}
                                </Link>
                                <p className="content">{item.description}</p>
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
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
                                              key={`${item.name}-${index}-${subIndex}`}
                                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                      hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                      ${snapshot.isDragging &&
                                                    "outline-dashed outline-2 outline-gray-400 bg-white"
                                                    }`}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: achievement,
                                                    }}
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

                            )}

                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
            </div>
          </section>
          {/* text-lg font-bold border-b border-gray-300 pb-1 mb-3 */}
          {/* text-sm text-gray-600 */}
          <section className="mb-5">
            {resumeData.education.length > 0 && (
              <div className="mb-1">
                <h2 className=" text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>
                  Education
                </h2>
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-1">
                    <p className="text-sm text-gray-600">{item.degree}</p>
                    <p className="text-sm text-gray-600">{item.school}</p>
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
        </div>
        <div className="w-2/5">
          <section className="mb-5">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>Skills</h2>
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
          </section>



          <section>
            <Language title="Languages" languages={resumeData.languages} />
            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
            />
          </section>
        </div>
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

export default Template9;
