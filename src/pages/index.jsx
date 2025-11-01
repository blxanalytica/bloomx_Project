import Layout from "./Layout.jsx";

import Home from "./Home";

import Platform from "./Platform";

import Research from "./Research";

import Industries from "./Industries";

import Careers from "./Careers";

import Contact from "./Contact";

import JobApplication from "./JobApplication";

import PrivacyPolicy from "./PrivacyPolicy";

import TermsOfUse from "./TermsOfUse";

import AITransparency from "./AITransparency";

import Accessibility from "./Accessibility";

import About from "./About";

import Documentation from "./Documentation";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Platform: Platform,
    
    Research: Research,
    
    Industries: Industries,
    
    Careers: Careers,
    
    Contact: Contact,
    
    JobApplication: JobApplication,
    
    PrivacyPolicy: PrivacyPolicy,
    
    TermsOfUse: TermsOfUse,
    
    AITransparency: AITransparency,
    
    Accessibility: Accessibility,
    
    About: About,
    
    Documentation: Documentation,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Platform" element={<Platform />} />
                
                <Route path="/Research" element={<Research />} />
                
                <Route path="/Industries" element={<Industries />} />
                
                <Route path="/Careers" element={<Careers />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/JobApplication" element={<JobApplication />} />
                
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                
                <Route path="/TermsOfUse" element={<TermsOfUse />} />
                
                <Route path="/AITransparency" element={<AITransparency />} />
                
                <Route path="/Accessibility" element={<Accessibility />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Documentation" element={<Documentation />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}