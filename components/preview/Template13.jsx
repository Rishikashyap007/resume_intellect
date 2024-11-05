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
const Template13 = () => {
    const { resumeData, setResumeData, headerColor,backgroundColorss } = useContext(ResumeContext);
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
        <div className="w-4/5 mx-auto my-5 bg-white p-5 shadow-md">
        <h1 className="text-4xl font-bold text-red-800 mb-2" style={{ color: headerColor }}>{resumeData.name}({resumeData.position})</h1>
        <div className="text-sm mb-5">
          <p>
          <ContactInfo
                mainclass="flex flex-row gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            {/* <a href="#" className="text-red-800 no-underline">Online Profile</a> */}
          </p>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor ,borderColor: backgroundColorss}} >Professional Summary</div>
          <p className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
            contentEditable="true"
            suppressContentEditableWarning={true}
          >{resumeData.summary}</p>
        </div>

        <div className="mb-5">
          <p>
          {resumeData.socialMedia.map((socialMedia, index) => {
                  return (
                    <a
                      href={`http://${socialMedia.link}`}
                      aria-label={socialMedia.socialMedia}
                      key={index}
                      title={socialMedia.socialMedia}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-800"
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.

                    >
                      {icons.map((icon, index) => {
                        if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                          return <span key={index}>{icon.icon}</span>;
                        }
                      })}
                      {socialMedia.link}
                    </a>
                  );
                })}
          </p>
        </div>

        <div className="mb-5">
          
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor ,borderColor: backgroundColorss}}>Skills</div>
          <ul className="list-disc ml-5">
         
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
        
          </ul>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3"style={{ color: headerColor ,borderColor: backgroundColorss}}>Work History</div>
          <div className="mb-5">
          {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                       
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
                                <div className="justify-between space-y-1">
                                  <p className="content i-bold text-2xl" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p 
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                className="content hyphens-auto hover:outline-dashed hover:outline-2 hover:outline-gray-400">
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
                          style={{ color: headerColor }} >
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
                                  <p className="content i-bold">{item.name}</p>
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
          </div>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Education</div>
          <ul className="list-none">
          {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      {resumeData.education.map((item, index) => (
                        <div  key={index} className="mb-1 text-lg">
                          <p className="content i-bold " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange className="mb-1 text-lg"
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
          </ul>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Languages/Certifications</div>
          <Language  languages={resumeData.languages} />
                <Certification
                  
                  certifications={resumeData.certifications}
                />
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

export default Template13;
