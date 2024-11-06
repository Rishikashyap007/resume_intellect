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
import Image from "next/image";
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
const Template12 = () => {
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
        <div className="w-full max-w-3xl mx-auto bg-white p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <Image
            src={resumeData.profilePicture}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          <div className="flex-grow">
            <h1 className="text-2xl text-gray-800" style={{ color: headerColor }}>{resumeData.name}</h1>
            <h2 className="text-xl text-blue-600 font-semibold">{resumeData.position}</h2>
          </div>
          <div className="text-right">
            <ContactInfo
              mainclass=" gap-1 mb-1 contact"
              linkclass="inline-flex items-center gap-1"
              teldata={resumeData.contactInformation}
              emaildata={resumeData.email}
              addressdata={resumeData.address}
              telicon={<MdPhone />}
              emailicon={<MdEmail />}
              addressicon={<MdLocationOn />}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Work Experience</h3>
          <div className="mb-4">
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
                            <div className=" justify-between space-y-1">
                              <p className="content i-bold">{item.company}</p>
                              <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                              />
                            </div>
                            <p className="content">{item.position}</p>
                            <p className="content hyphens-auto hover:outline-dashed hover:outline-2 hover:outline-gray-400 "
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            >
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
          {/* Add more experience items as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Snapshot</h3>
          {resumeData.summary}
          {/* Add more snapshot paragraphs as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Technical Skills</h3>
          <div className="bg-blue-600 text-white text-center py-2 rounded-md mb-2 text-sm font-semibold">
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
                            "outline-dashed outline-2 outline-gray-400 bg-white text-sm text-gray-800"
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
          {/* Add more technical skills as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Certificates</h3>
          <div className="mb-2">
            <Certification className="text-lg text-gray-800 font-semibold"
              title="Certifications "
              certifications={resumeData.certifications}
            />
          </div>
          {/* Add more certificates as needed */}
        </div>

        <div>
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Skills</h3>
          <div className="flex flex-wrap">
            <div className="w-1/2 mb-2">
              <Language title="Languages" languages={resumeData.languages} />
            </div>

            {/* Add more skill items as needed */}
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

export default Template12;
