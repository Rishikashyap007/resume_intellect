/* eslint-disable react/jsx-no-undef */
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
  FaSpellCheck, // Added grammar check icon
} from "react-icons/fa";

import { CgWebsite } from "react-icons/cg";

import React, { useContext, useState, useEffect } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";
import { HighlightMenu } from "react-highlight-menu";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template12 from "./Template12";
import Template13 from "./Template13";
import Template14 from "./Template14";
import Template15 from "./Template15";
import Template16 from "./Template16";
import Template17 from "./Template17";
import Template18 from "./Template18";
import Template19 from "./Template19";
import Template20 from "./Template20";
import Template21 from "./Template21";
import Template22 from "./Template22";
import Template23 from "./Template23";
import Template24 from "./Template24";
import Template25 from "./Template25";
import Template26 from "./Template26";
import Template27 from "./Template27";

// Importing draggable components dynamically
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

// Function to check grammar using a hypothetical API
const checkGrammar = () => {
  const selectedText = window.getSelection().toString();

  if (selectedText) {
    // API call to the grammar correction service (example using LanguageTool API)
    fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        language: "en-US",
        text: selectedText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.matches.length > 0) {
          alert("Grammar issues found: " + data.matches.length);
          // Extend this to show grammar correction suggestions to the user
        } else {
          alert("No grammar issues found!");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Please select some text to check for grammar.");
  }
};

const Preview = ({ selectedTemplate }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [content, setContent] = useState(resumeData);

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  const templates = {
    template1: <Template1 />,
    template2: <Template2 />,
    template3: <Template3 />,
    template4: <Template4 />,
    template5: <Template5 />,
    template6: <Template6 />,
    template7: <Template7 />,
    template8: <Template8 />,
    template9: <Template9 />,
    template10: <Template10 />,
    template11: <Template11 />,
    template12: <Template12 />,
    template13: <Template13 />,
    template14: <Template14 />,
    template15: <Template15 />,
    template16: <Template16 />,
    template17: <Template17 />,
    template18: <Template18 />,
    template19: <Template19 />,
    template20: <Template20 />,
    template21: <Template21 />,
    template22: <Template22 />,
    template23: <Template23 />,
    template24: <Template24 />,
    template25: <Template25 />,
    template26: <Template26 />,
    template27: <Template27 />,
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements = newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements = newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  const MenuButton = ({ title, icon, onClick }) => (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center p-3 hover:bg-gray-200 rounded font-semibold text-lg"
    >
      {icon}
    </button>
  );

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const toggleBold = () => formatText("bold");
  const toggleItalic = () => formatText("italic");
  const toggleUnderline = () => formatText("underline");
  const changeFontSize = (size) => formatText("fontSize", size);
  const alignText = (alignment) => formatText(`justify${alignment}`);
  const toggleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  useKeyboardShortcut("b", true, toggleBold);
  useKeyboardShortcut("i", true, toggleItalic);
  useKeyboardShortcut("u", true, toggleUnderline);

  return (
    <div>
      <A4PageWrapper>
        <HighlightMenu
          styles={{
            borderColor: "",
            backgroundColor: "#c5c9c9",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
            borderRadius: "5px",
            padding: "3px",
          }}
          target="body"
          menu={() => (
            <>
              <MenuButton
                title="Bold (Ctrl+B)"
                icon={<FaBold />}
                onClick={toggleBold}
              />
              <MenuButton
                title="Italic (Ctrl+I)"
                icon={<FaItalic />}
                onClick={toggleItalic}
              />
              <MenuButton
                title="Underline (Ctrl+U)"
                icon={<FaUnderline />}
                onClick={toggleUnderline}
              />
              <MenuButton
                title="Increase Font Size"
                icon={<FaPlus />}
                onClick={() => changeFontSize(4)}
              />
              <MenuButton
                title="Decrease Font Size"
                icon={<FaMinus />}
                onClick={() => changeFontSize(2)}
              />
              <MenuButton
                title="Align Left"
                icon={<FaAlignLeft />}
                onClick={() => alignText("Left")}
              />
              <MenuButton
                title="Align Center"
                icon={<FaAlignCenter />}
                onClick={() => alignText("Center")}
              />
              <MenuButton
                title="Align Right"
                icon={<FaAlignRight />}
                onClick={() => alignText("Right")}
              />
              <MenuButton
                title="Add Link"
                icon={<FaLink />}
                onClick={toggleLink}
              />
              {/* Grammar Check Button */}
              <MenuButton
                title="Check Grammar"
                icon={<FaSpellCheck />}
                onClick={checkGrammar}
              />
            </>
          )}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {templates[selectedTemplate]}
        </DragDropContext>
      </A4PageWrapper>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (preview) {
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    } else {
      console.error("Element with class 'preview' not found.");
    }
  };

  return (
    <div className="m-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Preview;
