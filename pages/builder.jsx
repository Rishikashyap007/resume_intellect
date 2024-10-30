import React, { useState, useRef, createContext ,useEffect} from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPicker from './ColorPicker';
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from '@progress/kendo-react-pdf';
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import Modal from "../components/Modal"; // Import the modal
import Link from "next/link";
import { useRouter } from "next/router";
const ResumeContext = createContext(DefaultResumeData);

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder({ onClose }) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColorss, setBgColor] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);

  const router = useRouter(); 
  const { id } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);


  useEffect(() => {
    // Extract resumeId from URL
    const path = window.location.pathname;
    const id = path.split('/').pop(); // Get the last part of the URL
    setResumeId(id);
  }, []);

   const handleDownloadResume = () => {
    const amount = 49; // Fixed price
  

    // Ensure the resumeId is valid
    if (!resumeId) {
      console.error('Resume ID is not available');
      return;
    }

    // Create the download payload
    const payload = {
      amount,
      ResumeId: resumeId, // Ensure the field name matches the API expectation
      Token: token || '' // Ensure the field name matches the API expectation
    };

    // Make the API call to initiate download
    axios.post('https://api.resumeintellect.com/api/user/paypal/create-payment', payload, {
      headers: { 'Content-Type': 'application/json' }, // Use JSON content type
    })

    .then(response => {
      const data = response.data;
      if (data && data.data) {
        // Redirect to the PayPal URL provided in the response
        window.location.href = data.data;
      }
      if (data && data.order_id) {
        localStorage.setItem("orderid", data.order_id);
      }
      console.log(data.order_id)
    })
    .catch(error => console.error('Payment Error:', error));
  };
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const sections = [
    { label: "Details", component: <PersonalInformation /> },
    { label: "Social", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    { label: "Skills", component: Array.isArray(resumeData?.skills) ? resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) : <p>No skills available</p> },
    { label: "Language", component: <Language /> },
    { label: "Certification", component: <Certification /> },
  ];

   
  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

   const pdfExportComponent = useRef(null);
  const downloadAsPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
      router.push('/dashboard/page')
    }
  };

  useEffect(() => {
    // Ensure we only run this in the browser, where `localStorage` is available
    if (typeof window !== 'undefined') {
      const { t } = router.query;
      const orderid = localStorage.getItem('orderid');

      // Check if t=success is present and orderid is stored
      if (t === 'success' && orderid) {
        // Call the verification API
        axios
          .get(`https://api.resumeintellect.com/api/user/paypal/verify-order?orderid=${orderid}`)
          .then(response => {
            // Check if the response indicates success
            if (response.data && response.data === 'success') {
              // If successful, download the PDF
              downloadAsPDF();
            } else {
              // Otherwise, redirect to /transaction
              router.push('/transaction');
            }
          })
          .catch(error => {
            console.error("Error verifying order:", error);
            // Redirect to /transaction on error
            router.push('/transaction');
          });
      }
    }
  }, [router.query]);

  const pdfExportOptions = {
    paperSize: "A4",
    fileName: "resume.pdf",
    author: resumeData.firstName + " " + resumeData.lastName,
    creator: "ATSResume Builder",
    date: new Date(),
    scale: 0.7,
    forcePageBreak: ".page-break"
  };

 
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update login state
  };
  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-violet-900 border-b-2 rounded font-semibold text-white"
      : "flex items-center p-2 hover:bg-violet-900  border-b-2 rounded font-semibold  ";
  };

  const handleFinish = async () => {
    if (!resumeData) return;
  
    // Map resumeData into the required templateData format
    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contact || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia: resumeData.socialMedia?.map((media) => ({
          socialMedia: media.platform || "",
          link: media.link || ""
        })) || [],
        summary: resumeData.summary || "",
        education: resumeData.education?.map((edu) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          startYear: edu.startYear || "",
          endYear: edu.endYear || ""
        })) || [],
        workExperience: resumeData.workExperience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          KeyAchievements: Array.isArray(exp.keyAchievements) ? exp.keyAchievements : [exp.keyAchievements || ""], // Ensure it's an array
          startYear: exp.startYear || "",
          endYear: exp.endYear || ""
        })) || [],
        projects: resumeData.projects?.map((project) => ({
          title: project.title || "",
          link: project.link || "",
          description: project.description || "",
          keyAchievements: Array.isArray(project.keyAchievements) ? project.keyAchievements : [project.keyAchievements || ""], // Ensure it's an array
          startYear: project.startYear || "",
          endYear: project.endYear || "",
          name: project.name || ""
        })) || [],
        skills: Array.isArray(resumeData.skills)
        ? resumeData.skills.map((skill) => ({
            title: skill.title || "",
            skills: skill.skills || []
          }))
        : [],      
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || []
      }
    };
  
    try {
      // Check if `id` is available, otherwise get it from local storage
      const id = router.query.id || localStorage.getItem("resumeId");
      if (!id) {
        console.error("Resume ID not found.");
        return;
      }
    
      const url = `https://api.resumeintellect.com/api/user/resume-update/${id}`;
      const response = await axios.put(url, templateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
    
      console.log('Resume updated successfully:', response.data);
      // Uncomment below if you need to redirect after updating
      // if (response.data) {
      //   router.push('/dashboard/ai-resume-builder');
      // }
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };
  
  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
          headerColor,
          backgroundColorss,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
          keywords="ATS-friendly, Resume optimization..."
        />

        {!isFinished && (
          <div className="flex"> 
           <LoadUnload/>
           <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MyResume  />
      </Modal>
      <div className="relative">
      {/* Toggle button for smaller screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-white bg-blue-900 fixed top-4 left-4 z-50 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white h-screen p-4 border-r border-gray-200 md:block fixed md:relative top-0 left-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <ul className="space-y-2 mt-4">
          <li>
            <Link
              href=""
              className="flex items-center p-2 bg-blue-900 border-b-2 border-black font-semibold text-white"
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-10">🖥️</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/page"
              className={getLinkClassName("/dashboard/page")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">👤</span>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/aibuilder"
              className={getLinkClassName("/dashboard/aibuilder")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">🤖</span>
              <span>AI Resume Builder</span>
            </Link>
          </li>
          <li onClick={() => { setIsModalOpen(true); toggleSidebar(); }}>
            <span className="mx-2">📑</span>
            <span>Resumes List</span>
          </li>
          <li>
            <Link
              href="notification"
              className={getLinkClassName("/dashboard/notification")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">🔔</span>
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              href="skilltest"
              className={getLinkClassName("/dashboard/skilltest")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">📝</span>
              <span>Skill Test</span>
            </Link>
          </li>
          <li>
            <Link
              href="addrefferal"
              className={getLinkClassName("/dashboard/addrefferal")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">👥</span>
              <span>Add Referral</span>
            </Link>
          </li>
          <li>
            <Link
              href="skillhistorylist"
              className={getLinkClassName("/dashboard/skillhistorylist")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">📊</span>
              <span>Skill History</span>
            </Link>
          </li>
          <li>
            <Link
              href="reffrerallistpage"
              className={getLinkClassName("/dashboard/reffrerallistpage")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">👥</span>
              <span>Referral List</span>
            </Link>
          </li>
          <li>
            <Link
              href="paymentpage"
              className={getLinkClassName("/dashboard/paymentpage")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">💳</span>
              <span>Payment</span>
            </Link>
          </li>
          <li>
            <Link
              href="password"
              className={getLinkClassName("/dashboard/password")}
              onClick={() => {
                onClose();
                toggleSidebar();
              }}
            >
              <span className="mr-2">🔑</span>
              <span>Change Password</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center p-2 hover:bg-violet-900 border-b-2 rounded font-semibold"
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
            >
              <span className="mr-2">🔓</span>
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
           <div>
           <div className="lg:flex justify-between bg-gray-200 p-2 px-5">
              {/* <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 bg-blue-900 text-white rounded-lg"
              >
                {isSidebarOpen ? "☰" : "☰"}
              </button> */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
              >
                Previous
              </button>

              <div className="lg:flex gap- content-center  justify-between bg-gray-200 p-1 px-5 lg:block hidden">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 px-8 p- font-bold text-blue-800 lg:block hidden"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg px-10 font-bold bg-yellow-500 w-full lg:w-40 text-black p-1"
              >
                {currentSection === sections.length - 1 ? "Finish" : "Next"}
              </button>
             
            </div>

            <div className="flex flex-col md:flex-row md:mx-auto md:h-screen overflow-y-auto" style={{ fontFamily: selectedFont }}>

              {/* <div className="flex">
                <aside
                  className={` h-full bg-gray-100 p-4  z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
                >
                  <ul className="space-y-2 text-center">
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer ${currentSection === index ? "rounded-3xl border-y-2 border-blue-800 font-bold bg-blue-950 text-white" : "border-2 bg-white border-blue-800 rounded-3xl text-blue-800"}`}
                        onClick={() => handleSectionClick(index)}
                      >
                        {section.label}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div> */}

              <form className=" p-3">
                {sections[currentSection].component}
              </form>

              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <div id="preview-section" className="bg-white lg:block hidden">
                  <Preview selectedTemplate={selectedTemplate} />
                </div>
              </PDFExport>
            </div>
            </div>
          </div>
        )}
         {isFinished && (
          <div className="p-">
            <div className="lg:flex lg:justify-between  bg-gray-200 p-2 px-5">
              <div className="lg:flex flex-row gap-4 flex-row justify-center bg-gray-200">
                
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 lg:px-8 p-2 m-2 font-bold bg-white text-blue-800"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
              </div>
              <button
          type="button"
          onClick={handleFinish}
         // disabled={isFinished} // Optional, disable if already finished
          className="bg-blue-950 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>
              <button
                type="button"
                className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
                onClick={handleDownloadResume}
              >
                Pay & Download
              </button>
            </div>
            
            <div className="overflow-y-auto md:h-screen mx-auto">
              <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
                <div id="preview-section" className="bg-white">
                  <Preview selectedTemplate={selectedTemplate} />
                </div>
              </PDFExport>
            </div>
          </div>
        )}
      </ResumeContext.Provider>

  
      
    </>
  );
}



export { ResumeContext };