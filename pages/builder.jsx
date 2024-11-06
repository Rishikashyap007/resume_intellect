
// import React, { useState, useRef, createContext, useEffect } from "react";
// import Language from "../components/form/Language";
// import axios from "axios";
// import Meta from "../components/meta/Meta";
// import FormCP from "../components/form/FormCP";
// import dynamic from "next/dynamic";
// import DefaultResumeData from "../components/utility/DefaultResumeData";
// import SocialMedia from "../components/form/SocialMedia";
// import WorkExperience from "../components/form/WorkExperience";
// import Skill from "../components/form/Skill";
// import PersonalInformation from "../components/form/PersonalInformation";
// import Summary from "../components/form/Summary";
// import Projects from "../components/form/Projects";
// import Education from "../components/form/Education";
// import Certification from "../components/form/certification";
// import ColorPicker from "./ColorPicker";
// import ColorPickers from "./ColorPickers";
// import Preview from "../components/preview/Preview";
// import TemplateSelector from "../components/preview/TemplateSelector";
// import { PDFExport } from "@progress/kendo-react-pdf";
// import LoadUnload from "../components/form/LoadUnload";
// import MyResume from "./dashboard/MyResume";
// import Modal from "../components/Modal";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Sidebar from "./dashboard/Sidebar";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const ResumeContext = createContext(DefaultResumeData);

// const Print = dynamic(() => import("../components/utility/WinPrint"), {
//   ssr: false,
// });

// export default function Builder({ onClose }) {
//   const [resumeData, setResumeData] = useState(DefaultResumeData);
//   const [formClose, setFormClose] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [selectedFont, setSelectedFont] = useState("Ubuntu");
//   const [headerColor, setHeaderColor] = useState("");
//   const [backgroundColorss, setBgColor] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [isFinished, setIsFinished] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [token, setToken] = useState(null);
//   const [resumeId, setResumeId] = useState(null);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const router = useRouter();
//   const pdfExportComponent = useRef(null);




//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     const path = window.location.pathname;
//     const id = path.split("/").pop();
//     setResumeId(id);
//   }, []);

//   const sections = [
//     { label: "Personal Details", component: <PersonalInformation /> },
//     { label: "Social Links", component: <SocialMedia /> },
//     { label: "Summary", component: <Summary /> },
//     { label: "Education", component: <Education /> },
//     { label: "Experience", component: <WorkExperience /> },
//     { label: "Projects", component: <Projects /> },
//     {
//       label: "Skills",
//       component: Array.isArray(resumeData?.skills) ? (
//         resumeData.skills.map((skill, index) => (
//           <Skill title={skill.title} key={index} />
//         ))
//       ) : (
//         <p>No skills available</p>
//       ),
//     },
//     { label: "Languages", component: <Language /> },
//     { label: "Certifications", component: <Certification /> },
//   ];

//   const handleProfilePicture = (e) => {
//     const file = e.target.files[0];
//     if (file instanceof Blob) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setResumeData({ ...resumeData, profilePicture: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     if (currentSection === sections.length - 1) {
//       setIsFinished(true);
//     } else {
//       setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentSection((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSectionClick = (index) => {
//     setCurrentSection(index);
//     setIsMobileMenuOpen(false);
//   };

//   const handleFontChange = (e) => {
//     setSelectedFont(e.target.value);
//   };

//   const nextSection = () => {
//     if (currentSection < sections.length - 1) {
//       handleSectionClick(currentSection + 1);
//     }
//   };


//   const prevSection = () => {
//     if (currentSection > 0) {
//       handleSectionClick(currentSection - 1);
//     }
//   };

 
//   useEffect(() => {
//     // Ensure we only run this in the browser, where `localStorage` is available
//     if (typeof window !== 'undefined') {
//       const { token } = router.query; // Get the token from the URL
//       const orderid = localStorage.getItem('orderid');

     
//       if (token ) {
        
//         axios
//           .get(`https://api.resumeintellect.com/api/user/paypal/verify-order?orderid=${orderid}`)
//           .then(response => {
//             // Check if the response indicates success
//             if (response.data && response.data === 'success') {
//               // If successful, download the PDF
//               downloadAsPDF();
//             } else {
//               // Otherwise, redirect to /transaction
//               router.push('/transaction');
//             }
//           })
//           .catch(error => {
//             console.error("Error verifying order:", error);
//             // Redirect to /transaction on error
//             router.push('/transaction');
//           });
//       } 
//     }
//   }, [router.query]);


//   const pdfExportOptions = {
//     paperSize: "A4",
//     fileName: "resume.pdf",
//     author: resumeData.firstName + " " + resumeData.lastName,
//     creator: "ATSResume Builder",
//     date: new Date(),
//     scale: 0.7,
//     forcePageBreak: ".page-break",
//   };

//   const downloadAsPDF = () => {
//     if (pdfExportComponent.current) {
//       pdfExportComponent.current.save();
//     }

 
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear the token
//     setIsLoggedIn(false); // Update login state
//   };
//   const getLinkClassName = (path) => {
//     return router.pathname === path
//       ? "flex items-center p-2 bg-violet-900 border-b-2 rounded font-semibold text-white"
//       : "flex items-center p-2 hover:bg-violet-900  border-b-2 rounded font-semibold  ";

//   };

//   const handleFinish = async () => {
//     if (!resumeData) return;

//     const templateData = {
//       templateData: {
//         name: resumeData.name || "",
//         position: resumeData.position || "",
//         contactInformation: resumeData.contact || "",
//         email: resumeData.email || "",
//         address: resumeData.address || "",
//         profilePicture: resumeData.profilePicture || "",
//         socialMedia:
//           resumeData.socialMedia?.map((media) => ({
//             socialMedia: media.platform || "",
//             link: media.link || "",
//           })) || [],
//         summary: resumeData.summary || "",
//         education:
//           resumeData.education?.map((edu) => ({
//             school: edu.school || "",
//             degree: edu.degree || "",
//             startYear: edu.startYear || "",
//             endYear: edu.endYear || "",
//           })) || [],
//         workExperience:
//           resumeData.workExperience?.map((exp) => ({
//             company: exp.company || "",
//             position: exp.position || "",
//             description: exp.description || "",
//             KeyAchievements: Array.isArray(exp.keyAchievements)
//               ? exp.keyAchievements
//               : [exp.keyAchievements || ""],
//             startYear: exp.startYear || "",
//             endYear: exp.endYear || "",
//           })) || [],
//         projects:
//           resumeData.projects?.map((project) => ({
//             title: project.title || "",
//             link: project.link || "",
//             description: project.description || "",
//             keyAchievements: Array.isArray(project.keyAchievements)
//               ? project.keyAchievements
//               : [project.keyAchievements || ""],
//             startYear: project.startYear || "",
//             endYear: project.endYear || "",
//             name: project.name || "",
//           })) || [],
//         skills: Array.isArray(resumeData.skills)
//           ? resumeData.skills.map((skill) => ({
//               title: skill.title || "",
//               skills: skill.skills || [],
//             }))
//           : [],
//         languages: resumeData.languages || [],
//         certifications: resumeData.certifications || [],
//       },
//     };

//     try {
//       const id = router.query.id || localStorage.getItem("resumeId");
//       if (!id) {
//         console.error("Resume ID not found.");
//         return;
//       }

//       const url = `https://api.resumeintellect.com/api/user/resume-update/${id}`;
//       const response = await axios.put(url, templateData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       });

//       console.log("Resume updated successfully:", response.data);
//     } catch (error) {
//       console.error("Error updating resume:", error);
//     }
//   };


//   // Mobile Navigation Component
//   const MobileNavigation = () => (
//     <div className="fixed px-2 bottom-0 left-0 right-0 bg-white shadow-lg py-4 md:hidden">
//       <div className="flex justify-between items-center">
//         <button
//           onClick={handlePrevious}
//           disabled={currentSection === 0}
//           className="px-4 py-2 bg-blue-950 text-white rounded-lg disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-sm font-medium">
//           {sections[currentSection].label}
//         </span>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
//         >
//           {currentSection === sections.length - 1 ? "Finish" : "Next"}
//         </button>

  
//   return (
//     <>
//       <ResumeContext.Provider
//         value={{
//           resumeData,
//           setResumeData,
//           handleProfilePicture,
//           handleChange,
//           headerColor,
//           backgroundColorss,
//         }}
//       >
//         <Meta
//           title="ATSResume | Get hired with an ATS-optimized resume"
//           description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//           keywords="ATS-friendly, Resume optimization..."
//         />

//         {!isFinished && (
//           <div className="flex"> 
//            <LoadUnload/>
//            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <MyResume  />
//       </Modal>
//       <div className="relative">
//       {/* Toggle button for smaller screens */}
//       <button
//         onClick={toggleSidebar}
//         className="md:hidden p-2 text-white bg-blue-900 fixed top-4 left-4 z-50 rounded "
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`bg-white h-screen p-4 border-r border-gray-200 md:block fixed md:relative top-0 left-0 transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         <ul className="space-y-2 mt-4">
//           <li>
//             <Link
//               href=""
//               className="flex items-center p-2 bg-blue-900 border-b-2 border-black font-semibold text-white"
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-10">🖥️</span>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/page"
//               className={getLinkClassName("/dashboard/page")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">👤</span>
//               <span>Profile</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/aibuilder"
//               className={getLinkClassName("/dashboard/aibuilder")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">🤖</span>
//               <span>AI Resume Builder</span>
//             </Link>
//           </li>
//           <li
//            className={getLinkClassName("/dashboard/resumelist")}
//           onClick={() => { setIsModalOpen(true); toggleSidebar(); }}>
            
//             <span className="mx-2">📑</span>
//             <span>Resumes List</span>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/notification"
//               className={getLinkClassName("/dashboard/notification")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">🔔</span>
//               <span>Notifications</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/skilltest"
//               className={getLinkClassName("/dashboard/skilltest")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">📝</span>
//               <span>Skill Test</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/addrefferal"
//               className={getLinkClassName("/dashboard/addrefferal")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">👥</span>
//               <span>Add Referral</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/skillhistorylist"
//               className={getLinkClassName("/dashboard/skillhistorylist")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">📊</span>
//               <span>Skill History</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="reffrerallistpage"
//               className={getLinkClassName("/dashboard/reffrerallistpage")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">👥</span>
//               <span>Referral List</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard/paymentpage"
//               className={getLinkClassName("/dashboard/paymentpage")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">💳</span>
//               <span>Payment</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="password"
//               className={getLinkClassName("/dashboard/password")}
//               onClick={() => {
//                 onClose();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">🔑</span>
//               <span>Change Password</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/"
//               className="flex items-center p-2 hover:bg-violet-900 border-b-2 rounded font-semibold"
//               onClick={() => {
//                 handleLogout();
//                 toggleSidebar();
//               }}
//             >
//               <span className="mr-2">🔓</span>
//               <span>Log Out</span>
//             </Link>
//           </li>
//         </ul>

//       </div>
//     </div>
//   );

//   // Mobile Menu Component
//   const MobileMenu = () => (
//     <div className="md:hidden">
//       {/* <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="fixed top-4 right-4 z-50 bg-blue-950 text-white px-4 py-2 rounded-lg"
//       >
//         {isMobileMenuOpen ? "✕" : "☰"}
//       </button> */}

//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 bg-white z-40 p-4 pt-16">
//           <div className="overflow-y-auto h-full">
//             {sections.map((section, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSectionClick(index)}
//                 className={`w-full p-3 mb-2 rounded-lg text-left ${
//                   currentSection === index
//                     ? "bg-blue-950 text-white"
//                     : "bg-gray-100 text-blue-950"
//                 }`}
//               >
//                 {section.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <ResumeContext.Provider
//       value={{
//         resumeData,
//         setResumeData,
//         handleProfilePicture,
//         handleChange,
//         headerColor,
//         backgroundColorss,
//       }}
//     >
//       <Meta
//         title="ATSResume | Get hired with an ATS-optimized resume"
//         description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
//         keywords="ATS-friendly, Resume optimization..."
//       />

//       <div className="min-h-screen bg-gray-50">
//         {/* Mobile Components */}
//         <MobileMenu />
        
//         {!isFinished ? (
          
//           // <div className="flex flex-col md:flex-row md:w-screen">
//           //   {/* Form Section */}
            
//           //   <div className="md:block hidden pb-20 md:pb-4 ">
//           //     <div className="max-w-xl mx-auto ">
//           //       <Sidebar />
//           //     </div>
//           //   </div>
            
//           //   <div className="flex-1 pb-20 md:pb-4 ">
//           //     <form className="w-auto md:max-w-2xl mx-auto">
//           //       {sections[currentSection].component}
//           //     </form>
//           //   </div>

//           //   {/* Desktop Preview - Hidden on Mobile */}
//           //   <div className="hidden md:block w-1/2 bg-white ">
//           //     <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//           //       <Preview selectedTemplate={selectedTemplate} />
//           //     </PDFExport>
//           //   </div>

//           //   {/* Mobile Navigation */}
//           //   <MobileNavigation />
//           // </div>
//     //       <div className="min-h-screen bg-gray-50 ">
//     //       {/* Form Navigation Bar */}
//     //       <div className="w-full bg-gray-200 p-4">
//     //   <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//     //     {/* Navigation Buttons */}
//     //     <div className="flex w-full lg:w-auto gap-4">
//     //       <button
//     //         type="button"
//     //         onClick={handlePrevious}
//     //         disabled={currentSection === 0}
//     //         className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition-colors hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
//     //       >
//     //         Previous
//     //       </button>
          
//     //       <button
//     //         type="button"
//     //         onClick={handleNext}
//     //         className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition-colors hover:bg-yellow-400"
//     //       >
//     //         {currentSection === sections.length - 1 ? "Finish" : "Next"}
//     //       </button>
//     //     </div>

//     //     {/* Controls Group */}
//     //     <div className="hidden lg:flex items-center gap-4">
//     //       <select
//     //         value={selectedFont}
//     //         onChange={handleFontChange}
//     //         className="w-40 h-10 rounded-lg border-2 border-blue-800 px-4 font-bold text-blue-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
//     //       >
//     //         <option value="Ubuntu">Ubuntu</option>
//     //         <option value="Calibri">Calibri</option>
//     //         <option value="Georgia">Georgia</option>
//     //         <option value="Roboto">Roboto</option>
//     //         <option value="Poppins">Poppins</option>
//     //       </select>

//     //       <div className="flex items-center gap-4">
//     //         <ColorPicker 
//     //           selectedColor={headerColor} 
//     //           onChange={setHeaderColor} 
//     //         />
//     //         <ColorPickers 
//     //           selectmultiplecolor={backgroundColorss} 
//     //           onChange={setBgColor} 
//     //         />
//     //         <TemplateSelector 
//     //           selectedTemplate={selectedTemplate} 
//     //           setSelectedTemplate={setSelectedTemplate} 
//     //         />
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     // <div className="w-full p-4">
//     //   <nav className={`bg-gray-100 transform ${
//     //     isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//     //   } transition-transform duration-300 ease-in-out`}>
//     //     <ul className="flex flex-row gap-4 items-center overflow-x-auto py-2 px-4">
//     //       {sections.map((section, index) => (
//     //         <li
//     //           key={index}
//     //           className={`
//     //             whitespace-nowrap
//     //             px-6 
//     //             py-2 
//     //             cursor-pointer 
//     //             transition-all
//     //             hover:bg-blue-900
//     //             hover:text-white
//     //             ${
//     //               currentSection === index 
//     //                 ? "rounded-lg border-2 border-blue-800 font-bold bg-blue-950 text-white" 
//     //                 : "border-2 bg-white border-blue-800 rounded-lg text-blue-800"
//     //             }
//     //           `}
//     //           onClick={() => handleSectionClick(index)}
//     //         >
//     //           {section.label}
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   </nav>
//     // </div>
//     //       <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
//     //         <div className="w-full hidden md:flex flex-row justify-center items-center p-4 ">
//     //           <nav className="bg-gray-100 rounded-lg">
//     //             <div className="relative flex items-center">
//     //               <button 
//     //                 onClick={() => prevSection()} 
//     //                 className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
//     //                 disabled={currentSection === 0}
//     //               >
//     //                 {/* <ChevronLeft className="w-5 h-5 text-blue-800" /> */}
//     //               </button>
                  
//     //               <div className="flex-1 overflow-x-auto scrollbar-hide">
//     //                 <ul className="flex flex-row gap-3 items-center py-2 px-4">
//     //                   {sections.map((section, index) => (
//     //                     <li
//     //                       key={index}
//     //                       className={`
//     //                         whitespace-nowrap
//     //                         px-4
//     //                         py-2
//     //                         cursor-pointer
//     //                         transition-all
//     //                         rounded-lg
//     //                         border-2
//     //                         ${
//     //                           currentSection === index
//     //                             ? "border-blue-800 font-semibold bg-blue-950 text-white"
//     //                             : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
//     //                         }
//     //                       `}
//     //                       onClick={() => handleSectionClick(index)}
//     //                     >
//     //                       {section.label}
//     //                     </li>
//     //                   ))}
//     //                 </ul>
//     //               </div>
    
//     //               <button 
//     //                 onClick={() => nextSection()} 
//     //                 className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
//     //                 disabled={currentSection === sections.length - 1}
//     //               >
//     //                 {/* <ChevronRight className="w-5 h-5 text-blue-800" /> */}
                    
//     //               </button>
//     //             </div>
//     //           </nav>
//     //         </div>
//     //       </div>
    
//     //       {/* Main Content */}
//     //       <div className="flex flex-col md:flex-row">
//     //         {/* Sidebar */}
//     //         <div className="md:block hidden w-64 min-h-screen border-r">
//     //           <div className="sticky top-20">
//     //             <div className="p-4">
//     //               <Sidebar />
//     //             </div>
//     //           </div>
//     //         </div>
    
//     //         {/* Form Content */}
//     //         <div className="flex-1">
//     //           <div className="max-w-3xl mx-auto p-4">
//     //             <form>
//     //               {sections[currentSection].component}
//     //             </form>
//     //           </div>
//     //         </div>
    
//     //         {/* Preview Panel */}
//     //         <div className="hidden md:block w-1/3 min-h-screen border-l">
//     //           <div className="sticky top-20">
//     //             <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//     //               <Preview selectedTemplate={selectedTemplate} />
//     //             </PDFExport>
//     //           </div>
//     //         </div>
//     //       </div>
    
//     //       {/* Mobile Navigation */}
//     //       {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
//     //         <div className="flex justify-between items-center p-4">
//     //           <button
//     //             onClick={() => handlePrevious()}
//     //             className="p-2 rounded-lg bg-gray-100 disabled:opacity-50"
//     //             disabled={currentSection === 0}
//     //           >
//     //             <ChevronLeft className="w-5 h-5 text-blue-800" />
//     //           </button>
//     //           <span className="font-medium text-blue-800">
//     //             Step {currentSection + 1} of {sections.length}
//     //           </span>
//     //           <button
//     //             onClick={() => handleNext()}
//     //             className="p-2 rounded-lg bg-gray-100 disabled:opacity-50"
//     //             disabled={currentSection === sections.length - 1}
//     //           >
//     //             <ChevronRight className="w-5 h-5 text-blue-800" />
//     //           </button>
//     //         </div>
//     //       </div> */}
//     //       <MobileNavigation />
//     //     </div>
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//   {/* Form Navigation Bar */}
//   <div className="w-full bg-gray-200 p-4 shadow-sm">
//     <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
//       {/* Navigation Buttons */}
//       <div className="flex w-full lg:w-auto gap-4">
//         <button
//           type="button"
//           onClick={handlePrevious}
//           disabled={currentSection === 0}
//           className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={handleNext}
//           className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition hover:bg-yellow-400"
//         >
//           {currentSection === sections.length - 1 ? "Finish" : "Next"}
//         </button>
//       </div>

//       {/* Controls Group */}
//       <div className="hidden lg:flex items-center gap-4">
//         <select
//           value={selectedFont}
//           onChange={handleFontChange}
//           className="w-40 h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white focus:ring-2 focus:ring-blue-800"
//         >
//           <option value="Ubuntu">Ubuntu</option>
//           <option value="Calibri">Calibri</option>
//           <option value="Georgia">Georgia</option>
//           <option value="Roboto">Roboto</option>
//           <option value="Poppins">Poppins</option>
//         </select>

//         <div className="flex items-center gap-4">
//           <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
//           <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
//           <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Sticky Top Navigation */}
//   <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
//     <div className="hidden md:flex justify-center items-center p-4">
//       <nav className="bg-gray-100 rounded-lg p-2">
//         <div className="flex items-center">
//           <button 
//             onClick={() => prevSection()} 
//             className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
//             disabled={currentSection === 0}
//           >
//             {/* Chevron Left Icon Here */}
//           </button>

//           <div className="flex-1 overflow-x-auto scrollbar-hide">
//             <ul className="flex flex-row gap-3 items-center py-2 px-4">
//               {sections.map((section, index) => (
//                 <li
//                   key={index}
//                   className={`px-4 py-2 cursor-pointer transition rounded-lg border-2 ${
//                     currentSection === index
//                       ? "border-blue-800 font-semibold bg-blue-950 text-white"
//                       : "border-blue-800 bg-white text-blue-800 hover:bg-blue-50"
//                   }`}
//                   onClick={() => handleSectionClick(index)}
//                 >
//                   {section.label}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <button 
//             onClick={() => nextSection()} 
//             className="p-2 hover:bg-gray-200 rounded-lg hidden md:block"
//             disabled={currentSection === sections.length - 1}
//           >
//             {/* Chevron Right Icon Here */}
//           </button>
//         </div>
//       </nav>
//     </div>
//   </div>

//   {/* Main Content */}
//   <div className="flex flex-col md:flex-row flex-grow">
//     {/* Sidebar */}
//     <aside className="hidden md:block w-64 min-h-screen border-r bg-gray-100">
//       <div className="sticky top-20 p-4">
//         <Sidebar />
//       </div>
//     </aside>

//     {/* Form Content */}
//     <main className="flex-1 max-w-2xl mx-auto p-4">
//       <form>{sections[currentSection].component}</form>
//     </main>

//     {/* Preview Panel */}
//     <aside className="hidden md:block w-1/2 min-h-screen border-l bg-gray-50">
//       <div className="sticky top-20 p-4">
//         <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//           <Preview selectedTemplate={selectedTemplate} />
//         </PDFExport>
//       </div>
//     </aside>
//   </div>

//   {/* Mobile Navigation */}
//   <MobileNavigation />
// </div>

          
//         ) : (
//           // Finished State
//           <div className="flex flex-col">
//             {/* Mobile Finished Controls */}
//             <div className="flex flex-col p-2 md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
//               <button
//                 onClick={handleFinish}
//                 className=" mb-2 bg-blue-950 text-white px-4 py-2 rounded-lg"
//               >
//                 Save Resume
//               </button>
//               <button
//                 onClick={downloadAsPDF}
//                 className=" bg-yellow-500 text-black px-4 py-2 rounded-lg"
//               >
//                 Pay & Download
//               </button>
//             </div>

//             {/* Desktop Controls - Hidden on Mobile */}
//             <div className="hidden md:flex justify-between items-center bg-white shadow">
//               <div className="flex gap-4">
//                 <select
//                   value={selectedFont}
//                   onChange={handleFontChange}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   <option value="Ubuntu">Ubuntu</option>
//                   <option value="Calibri">Calibri</option>
//                   <option value="Georgia">Georgia</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                 </select>
//                 <ColorPicker
//                   selectedColor={headerColor}
//                   onChange={setHeaderColor}
//                 />
//                 <ColorPickers
//                   selectmultiplecolor={backgroundColorss}
//                   onChange={setBgColor}
//                 />
//                 <TemplateSelector
//                   selectedTemplate={selectedTemplate}
//                   setSelectedTemplate={setSelectedTemplate}
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleFinish}
//                   className="bg-blue-950 text-white px-6 py-2 rounded-lg"
//                 >
//                   Save Resume
//                 </button>
//                 <button
//                   onClick={downloadAsPDF}
//                   className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
//                 >
//                   Pay & Download
//                 </button>
//               </div>


//               <button
//           type="button"
//           onClick={handleFinish}
//          // disabled={isFinished} // Optional, disable if already finished
//           className="bg-blue-950 text-white px-5 py-2 rounded-lg"
//         >
//           Save
//         </button>
//               <button
//                 type="button"
//                 className="rounded-lg px-10 lg:ms-2 font-bold bg-blue-950 text-white p-1"
//                 onClick={handleDownloadResume}
//               >
//                 Pay & Download
//               </button>

//             </div>

//             {/* Preview */}
//             <div className="pb-28">
//               <PDFExport ref={pdfExportComponent} {...pdfExportOptions}>
//                 <Preview selectedTemplate={selectedTemplate} />
//               </PDFExport>
//             </div>
//           </div>
//         )}
//       </div>
//     </ResumeContext.Provider>
//   );
// }

// export { ResumeContext };
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



  const pdfExportOptions = {
    paperSize: "A4",
    fileName: "resume.pdf",
    author: resumeData.firstName + " " + resumeData.lastName,
    creator: "ATSResume Builder",
    date: new Date(),
    scale: 0.7,
    forcePageBreak: ".page-break"
  };

  const router = useRouter(); 
  const { id } = router.query;
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
        className="md:hidden p-2 text-white bg-blue-900 fixed top-4 left-4 z-50 rounded "
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
              href="aibuilder"
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
          <li
           className={getLinkClassName("/dashboard/resumelist")}
          onClick={() => { setIsModalOpen(true); toggleSidebar(); }}>
            
            <span className="mx-2">📑</span>
            <span>Resumes List</span>
          </li>
          <li>
            <Link
              href="/dashboard/notification"
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
              href="/dashboard/skilltest"
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
              href="/dashboard/addrefferal"
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
              href="/dashboard/skillhistorylist"
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
              href="/dashboard/paymentpage"
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
           {/* <div className="lg:flex justify-between bg-gray-200 p-2 px-5 border border-red-800">
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 bg-blue-900 text-white rounded-lg"
              >
                {isSidebarOpen ? "☰" : "☰"}
              </button>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2 bg-blue-950  w-full lg:w-40 text-white px-10 py-1"
              >
                Previous
              </button>

              <div className="lg:flex gap- content-center  justify-between bg-gray-200 p-1 px-5 hidden">
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
             
            </div> */}
            <div className="w-full bg-gray-200 p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Navigation Buttons */}
        <div className="flex w-full lg:w-auto gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="w-40 h-10 rounded-lg bg-blue-950 text-white font-medium transition-colors hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="w-40 h-10 rounded-lg bg-yellow-500 text-black font-medium transition-colors hover:bg-yellow-400"
          >
            {currentSection === sections.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

        {/* Controls Group */}
        <div className="hidden lg:flex items-center gap-4">
          <select
            value={selectedFont}
            onChange={handleFontChange}
            className="w-40 h-10 rounded-lg border-2 border-blue-800 px-4 font-bold text-blue-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="Ubuntu">Ubuntu</option>
            <option value="Calibri">Calibri</option>
            <option value="Georgia">Georgia</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
          </select>

          <div className="flex items-center gap-4">
            <ColorPicker 
              selectedColor={headerColor} 
              onChange={setHeaderColor} 
            />
            <ColorPickers 
              selectmultiplecolor={backgroundColorss} 
              onChange={setBgColor} 
            />
            <TemplateSelector 
              selectedTemplate={selectedTemplate} 
              setSelectedTemplate={setSelectedTemplate} 
            />
          </div>
        </div>
      </div>
    </div>
    <div className="w-full p-4">
      <nav className={`bg-gray-100 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
        <ul className="flex flex-row gap-4 items-center overflow-x-auto py-2 px-4">
          {sections.map((section, index) => (
            <li
              key={index}
              className={`
                whitespace-nowrap
                px-6 
                py-2 
                cursor-pointer 
                transition-all
                hover:bg-blue-900
                hover:text-white
                ${
                  currentSection === index 
                    ? "rounded-lg border-2 border-blue-800 font-bold bg-blue-950 text-white" 
                    : "border-2 bg-white border-blue-800 rounded-lg text-blue-800"
                }
              `}
              onClick={() => handleSectionClick(index)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>

            <div className="flex flex-col md:flex-row md:mx-auto md:h-screen overflow-y-auto" style={{ fontFamily: selectedFont }}>

              {/* <div className="flex border border-red-800">
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
              <div className="lg:flex flex-row gap-4 justify-center bg-gray-200">
                
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
                onClick={downloadAsPDF}
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