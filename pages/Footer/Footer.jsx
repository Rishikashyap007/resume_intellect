import React from 'react';
import Image from 'next/image';
import logo from '../Footer/logo.jpg';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://api.resumeintellect.com/api/user/user-subscribe', 
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage('Subscribed successfully!');
            toast.success('Subscribed successfully!');
        } catch (error) {
            setMessage('Subscription failed. Please try again.');
            toast.error('Subscription failed');
            console.error('Error subscribing:', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <footer className="bg-black text-white py-8" id='footerbg'>
                <div className="container mx-auto flex flex-col gap-7 justify-between px-6">
                    <div className='flex flex-wrap justify-between px-2 md:px-[65px]'>
                        <div className="md:w-auto mb-6 md:mb-0">
                            <img 
                                src={logo} 
                                className='h-14 w-full'
                                alt='footer'
                                width={100}
                                height={56}
                            />
                            <p className='text-lg text-bold px-5'>Building Careers of Tomorrow</p>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h2 className="text-lg font-semibold text-white">Get Our Weekly</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Type your email..." 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    className="p-2 rounded text-black" 
                                />
                                <button type="submit" className="md:px-4 md:py-1 p-1 rounded-full bg-white text-black hover:bg-orange-500">
                                    Subscribe
                                </button>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                    <br />
                    <div className='flex flex-wrap justify-around'>
                        <div className="w-full md:w-auto mb-6 md:mb-0" id='footer'>
                            <h2 className="text-lg font-bold text-white">Resume Intellect</h2>
                            <ul>
                                <li><Link href="/footerr/Aboutus">About Us</Link></li>
                                <li><Link href="/footerr/Careers">Careers</Link></li>
                                <li><Link href="/footerr/Placement">Placement Support</Link></li>
                                <li><Link href="https://www.ResumeIntellect.ca/blog/">Resources</Link></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h2 className="text-lg font-bold text-white">Support</h2>
                            <ul>
                                <li><Link href="/footerr/Salarytools">Salary Tool</Link></li>
                                <li><Link href="/footerr/TermsandConditions">Terms & Conditions</Link></li>
                                <li><Link href="/footerr/PrivacyPolicy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h2 className="text-lg font-bold text-white">Scope & Products</h2>
                            <ul>
                                <li><Link href="/footerr/AiResumeBuilder">Ai Resume Builder</Link></li>
                                <li><Link href="/footerr/AiSkillTests">Ai Skill Tests</Link></li>
                                <li><Link href="/footerr/AiCVParsing">Ai CV Parsing</Link></li>
                                <li><Link href="/">White Labelling</Link></li>
                                <li><Link href="/">Generative AI</Link></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-auto mb-6 md:mb-0">
                            <h2 className="text-lg font-bold text-white">Ai Resources</h2>
                            <ul>
                                <li><Link href="/footerr/AIEnhancedResumeAccuracy">Ai - Resume Accuracy</Link></li>
                                <li><Link href="/footerr/AiResumeEnhancer">Ai - Resume Enhancer</Link></li>
                                <li><Link href="/footerr/AiJobMatchApply">Ai - Job Match & Apply</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container text-base md:mx-auto text-center border-t border-white pt-6 mt-6">
                    <p className="text-white text-right">&copy; Copyright By ResumeIntellect.ca All Rights Reserved</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
