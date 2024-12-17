import { useEffect, useState } from 'react';
import { Header } from './header.jsx';
import { Features } from './features';
import { About } from './about';
import { Services } from './services';
import { Gallery } from './gallery';
import { Testimonials } from './testimonials';
import { Team } from './Team';
import { Contact } from './contact';
import { Navigation } from './navigation';
import JsonData from '../data/data.json';
import GetData from '../data/getData.js';


const Landing = () => {

    const [backendData, setBackendData] = useState({});
    useEffect(() => {
        setBackendData(GetData);
    }, []);

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);
 
    return (
        // CHANGE MANUALLY
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} backTextData={backendData.getWebsiteTexts} backendImagaData={backendData.getWebsiteImages} />
            <About data={landingPageData.About} backTextData={backendData.getWebsiteTexts} backendImagaData={backendData.getWebsiteImages} />
            <Services data={landingPageData.Services} backendProducts={backendData.getPrucuts}/>
            <Gallery data={landingPageData.Gallery} backGalaleryData={backendData.getWebsiteGallery} />
            <Testimonials data={landingPageData.Testimonials} backTextData={backendData.getWebsiteTestemonies}  />
            <Team data={landingPageData.Team} backTextData={backendData.getWebsiteTeams} />
            <Contact data={landingPageData.Contact} />
        </div>
    );
};

export default Landing;