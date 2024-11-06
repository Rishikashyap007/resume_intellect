
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
import { ResumeContext } from "../../pages/builder";
import Link from "next/link";

const MyResume = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [resumes, setResumes] = useState([]);
  const [scores, setScores] = useState({});
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalSuggestions, setModalSuggestions] = useState([]);
  const [modalResumeName, setModalResumeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteresumeid, setDeleteresumeid] = useState(null);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [hoveredResumeId, setHoveredResumeId] = useState(null);
  const [idFromResponse, setIdFromResponse] = useState(null); 
  const [locationFromResponse, setLocationFromResponse] = useState(""); 
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("https://api.resumeintellect.com/api/user/resume-list", {
        headers: { Authorization: token },
      })
      .then((response) => {
        const resumes = response.data.resumelist || [];
        if (resumes.length === 0) {
          toast.info("No resumes available.");
        }
        setResumes(resumes);
      })
      .catch((error) => {
        console.error("Error fetching resume list:", error);
        toast.error("Failed to fetch resumes.");
      });
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);
  const handleGetSuggestions = (resume) => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoading(true);
      axios
        .post(
          "https://api.resumeintellect.com/api/user/file-based-ai",
          {
            keyword:
              "Rate this resume content in percentage ? and checklist of scope improvements in manner of content and informations",
              file_location: resume.file_path || "/etc/dean_ai_resume/users/resume_uploads/majid[15_0]-1723818329.pdf",
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          const { improvement_suggestions } = response.data.data;
          setModalSuggestions(improvement_suggestions || []);
          setModalResumeName(resume.name);
          setIsAIModalOpen(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching AI suggestions:", error);
          setIsLoading(false);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  };



  const handleGetScore = (resume) => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios.post("https://api.resumeintellect.com/api/user/file-based-ai", {
        keyword: "Rate this resume content in percentage ? and checklist of scope improvements in manner of content and informations",
        file_location: resume.file_path || "/etc/dean_ai_resume/users/resume_uploads/majid[15_0]-1723818329.pdf",
      }, { headers: { Authorization: token } })
      .then((response) => {
        const { content_acuracy_percentage } = response.data.data;
        setScores(prevScores => ({ ...prevScores, [resume.id]: content_acuracy_percentage }));
        setModalContent(content_acuracy_percentage);
        setModalResumeName(resume.name);
        setIsScoreModalOpen(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching AI score:", error);
        toast.error("Failed to fetch AI score.");
        setIsLoading(false);
      });
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const handleDeleteResume = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`https://api.resumeintellect.com/api/user/resume-list/${deleteresumeid}`, {
          headers: { Authorization: token },
        });
        toast.success("Your Resume Deleted Successfully");
        setisDeleteModalOpen(false);
        setResumes(resumes.filter(resume => resume.id !== deleteresumeid));
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to Delete your Resume");
      }
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const handleopenDeleteModal = (resumeId) => {
    setDeleteresumeid(resumeId);
    setisDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setisDeleteModalOpen(false);
  };


  // const handleEditResume = async (resume) => {
  //   console.log(resume.id,"id");
  //   const token = localStorage.getItem("token");
  
  //   try {
  //     // Fetch the resume details from the API
  //     const response = await axios.get(`https://api.resumeintellect.com/api/user/resume-list/${resume.id}`, {
  //       headers: { Authorization: token },
  //     });
      
  //     const resumeData = response.data.data;
  //     if (!resumeData || !resumeData.file_path || !resumeData.ai_resume_parse_data) {
  //       console.error("Resume data not found in API response");
  //       return;
  //     }
  
  //     // Parse the ai_resume_parse_data
  //     const parsedData = JSON.parse(resumeData.ai_resume_parse_data);
  //     console.log(parsedData.templateData,"maia data hu");
  //     // Set the resume data using the context
  //     setResumeData(parsedData.templateData); // Use the appropriate structure from the parsed data
  //     localStorage.setItem('resumeData', JSON.stringify(parsedData.templateData));
  //     localStorage.setItem('resumeId', resumeData.id);
  //     localStorage.setItem('location', resumeData.file_path);
  
  //     console.log("Resume data retrieved successfully");
  
  //     // Redirect to the builder page with the resume ID
  //     router.push(`/dashboard/aibuilder/${resumeData.id}`);
  //   } catch (error) {
  //     console.error("Error fetching resume details:", error);
  //   }
  // };
  const handleEditResume = async (resume) => {
    console.log(resume.id, "id");
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      // Fetch the resume details from the API
      const response = await axios.get(`https://api.resumeintellect.com/api/user/resume-list/${resume.id}`, {
        headers: { Authorization: token },
      });

      console.log("API response:", response.data);

      const resumeData = response.data.data;
      if (!resumeData || !resumeData.file_path || !resumeData.ai_resume_parse_data) {
        console.error("Resume data not found in API response");
        return;
      }


      // Parse the ai_resume_parse_data
      const parsedData = JSON.parse(resumeData.ai_resume_parse_data);
      console.log(parsedData.templateData, "maia data hu");

      // Set the resume data using the context
      setResumeData(parsedData.templateData); // Use the appropriate structure from the parsed data
      localStorage.setItem('resumeData', JSON.stringify(parsedData.templateData));
      localStorage.setItem('resumeId', resumeData.id);
      localStorage.setItem('location', resumeData.file_path);


  
   
  

      console.log("Resume data retrieved successfully");

      // Check resumeData.id before navigation
      if (resumeData.id) {
        // Redirect to the builder page with the resume ID
        router.push(`/dashboard/aibuilder/${resumeData.id}`);
      } else {
        console.error("Invalid resume ID for navigation");
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
};

  
  return (
    <div className="container mx-auto p-4 text-center h-3/4">
     
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark text-black rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4">Sr. no.</th>
              <th className="py-2 px-4">Resume Name</th>
              <th className="py-2 px-4">AI-Score</th>
              <th className="py-2 px-4">Improve with AI</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Actions</th>
              <th className="py-2 px-4">JD Match %</th>
            </tr>
          </thead>
          <tbody>
            {resumes.length > 0 ? resumes.map((resume, index) => (
              <tr key={index} className="border-2">
                <td className=" ">{index + 1}.</td>
                <td className="py-2 float-start ">{resume.resue_name || "Resume score"}</td>
                <td className="py-2 px-4">
                  <button className="bg-yellow-500 text-black py-1 px-3 rounded" onClick={() => handleGetScore(resume)}>
                    {scores[resume.id] !== undefined ? scores[resume.id] : resume.ai_resume_score_percentage || "Resume score"}
                  </button>
                </td>
                <td className="py-2 px-4 ">
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded" onClick={() => handleGetSuggestions(resume)}>
                    AI
                  </button>
                  {hoveredResumeId === resume.id && (
                    <div className="absolute w-96 mt-2 bg-gray-200 border border-gray-300 rounded shadow-lg">
                      <ul className="p-2 text-start">
                        {resume.ai_suggestion ? (
                          <ul className="list-disc ml-5">
                            {resume.ai_suggestion.split('||').map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        ) : "No suggestions available"}
                      </ul>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4">{new Date(resume.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button className="text-black">
                      <i className="fas fa-upload">📤</i>
                    </button>
                    <button className="text-black" >
                   <Link href={`/dashboard/aibuilder/${resume.id}`}>   <i className="fas fa-edit">🖍</i></Link>
                    </button>
                    <button className="text-black" onClick={() => handleopenDeleteModal(resume.id)}>
                      <i className="fas fa-trash">🗑️</i>
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">Coming Soon</td>
              </tr>
            )) : (
              <tr><td colSpan="7">Please Upload Resume.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 align-middle text-white font-semibold text-lg">
            Loading...
          </div>
        </div>
      )}

      {/* Score Modal */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold">{modalResumeName}</h2>
            <p>{modalContent}</p>
            <button onClick={() => setIsScoreModalOpen(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Suggestions Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold">AI Suggestions</h2>
            <ul>
              {modalSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
            <button onClick={() => setIsAIModalOpen(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Resume Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold">Are you sure you want to delete this resume?</h2>
            <div className="flex justify-between mt-4">
              <button onClick={handleDeleteResume} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
              <button onClick={handleCloseModal} className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResume;
