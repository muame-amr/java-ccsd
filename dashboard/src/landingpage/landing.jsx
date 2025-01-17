import { useEffect, useState } from "react";
import About from "./about.jsx";
import Services from "./services.jsx";
import Gallery from "./gallery.jsx";
import Testimonials from "./testimonials.jsx";
import Contact from "./contact.jsx";
import JsonData from "../data/data.json";
import GetData from "../data/getData.js";
import Navigation from "./navigation.jsx";
import Features from "./features.jsx";
import Header from "./header.jsx";
import Team from "./team.jsx";

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
			<Features
				data={landingPageData.Features}
				backTextData={backendData.getWebsiteTexts}
				backendImagaData={backendData.getWebsiteImages}
			/>
			<About
				data={landingPageData.About}
				backTextData={backendData.getWebsiteTexts}
				backendImagaData={backendData.getWebsiteImages}
			/>
			<Services
				data={landingPageData.Services}
				backendProducts={backendData.getPrucuts}
			/>
			<Gallery
				data={landingPageData.Gallery}
				backGalaleryData={backendData.getWebsiteGallery}
			/>
			<Testimonials
				data={landingPageData.Testimonials}
				backTextData={backendData.getWebsiteTestemonies}
			/>
			<Team
				data={landingPageData.Team}
				backTextData={backendData.getWebsiteTeams}
			/>
			<Contact data={landingPageData.Contact} />
		</div>
	);
};

export default Landing;
