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
// import Image from "next/image";
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
import Image from "next/image";
// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template21 = () => {
    const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
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
        <div className="max-w-3xl mx-auto p-5 bg-white-500 shadow-md border">
          <div class="flex"> 

          
            <div class="bg-cyan-500 p-5 w-1/3">
                <div class="rounded-full border-solid	border-white-500 mb-5">
                <img className="rounded-full" src={resumeData.profilePicture ? resumeData.profilePicture : "img/profile_one.png"} alt="Profile" />
                <div class="border-solid rounded border-b-2 border-white-800 mb-2 mt-2"></div>
                </div>
                <div className="mb-8">
                  <div class="flex">
                      <h2 className="text-xl capitalize text-white font-bold mb-4" style={{ color: headerColor }}>About me</h2>
                      <div class="border-solid rounded border-b-2 border-white mb-2 mt-2"></div>
                  </div>
                  <p class="text-sm text-white hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 "contentEditable="true"
                      suppressContentEditableWarning={true}
                  >
                  {resumeData.summary}
                  </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl capitalize text-white font-bold" style={{ color: headerColor }}>Skills</h2>
                    <div class="border-solid rounded border-b-2 border-white-800 mb-2 mt-2"></div>
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
                                          className={`border-0 text-white mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                            "inline"
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
                    <div class=" text-left">
                      <h2 class="text-2xl font-bold uppercase text-white mb-5">Reference</h2>
                      <div class="border-solid border-b-2 border-white mb-5"></div>	
                      <div class="">
                        <div class="mb-5">
                          <p class="text-xl capitalize text-white font-bold mb-5">Estelle Darcy</p>	
                          <p class="font-light mb-2 text-sm text-white">Wardlere Inc. / CTO</p>
                          <p class="font-light mb-2 text-sm text-white">Phone: 123-456-7890</p>
                          <p class="font-light mb-2 text-sm text-white">Email: abc@gmail.com</p>
                        </div>
                        <div class="mb-5">
                          <p class="text-xl capitalize text-white font-bold mb-5">Harper Richard</p>	
                          <p class="font-light mb-2 text-sm text-white">Wardlere Inc. / CEO</p>
                          <p class="font-light mb-2 text-sm text-white">Phone: 123-456-7890</p>
                          <p class="font-light mb-2 text-sm text-white">Email: abc@gmail.com</p>
                        </div>
                      </div>
                    </div>
            </div>
            <div class="bg-slate-300  w-2/3">
                <div class="bg-cyan-800 p-5">
                    <div class="border-solid border-b-2 border-white mb-2"></div>
                    <h1 className="text-4xl font-bold mb-2 text-white" style={{ color: headerColor }}>{resumeData.name}</h1>
                    <h2 className="text-2xl font-semibold mb-2 text-white" style={{ color: headerColor }}>{resumeData.position}</h2>	
                </div>
                <div className="mb-8 p-5">
                  <h2 className="text-xl text-cyan-800 font-bold mb-4" style={{ color: headerColor }}>EXPERIENCE</h2>
                  
                  <div>
                    <h3 className="text-xl text-cyan-800 font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Projects</h3>
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
                                          className={`mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                            }`}
                                        >
                                          <div className="justify-between space-y-1 flex text-cyan-800">
                                            <p className="content i-bold text-2xl text-cyan-800" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                            <DateRange
                                              startYear={item.startYear}
                                              endYear={item.endYear}
                                              id={`work-experience-start-end-date`}
                                            />
                                          </div>
                                          <p className="content text-cyan-800">{item.position}</p>
                                          <p className="content hyphens-auto text-cyan-800 hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                          contentEditable="true"
                                          suppressContentEditableWarning={true}>
                                            {item.description}
                                          </p>
                                          <Droppable
                                            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                          >
                                            {(provided) => (
                                              <ul
                                                className="list-disc ul-padding content text-cyan-800"
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
                                                              "outline-dashed outline-2 outline-gray-400 bg-white text-cyan-800"
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
                                    className="section-title mb-1 border-b-2 border-gray-300 editable text-cyan-800"
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
                                            "outline-dashed outline-2 outline-gray-400 bg-white text-cyan-800"
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
                                          <p className="content text-cyan-800">{item.description}</p>
                                          <Droppable
                                            droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                            type="PROJECTS_KEY_ACHIEVEMENT"
                                          >
                                            {(provided) => (
                                              <ul
                                                className="list-disc ul-padding content text-cyan-800"
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
                                                              "outline-dashed outline-2 outline-gray-400 bg-white text-cyan-800"
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
                <div className="mb-8 p-5">
                    <h2 className="text-xl font-bold text-cyan-800" style={{ color: headerColor }}>LANGUAGE</h2>
                    <div className="text-cyan-800 mb-4 font-bold">
                    <Language  languages={resumeData.languages} />
                    </div>
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

export default Template21;
