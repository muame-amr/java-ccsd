import { Box, Link, useTheme } from "@mui/material";

import * as React from 'react';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import ThreeGridBoxImage from "../../../components/3GridBoxImage";


const WebsiteComponentsAdmin = () =>{
      //const imageSrc = require("../../../assets/images/website_image.jpg").default;  
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
    return (

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="WEBSITE IMAGES" subtitle = "Chose the Part You Want to Change" />
            </Box>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                            >
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-image-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_image.jpg")}
                        title="GENERAL"
                        subtitle="Genaral Images like logo and etc."
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-text-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_text.jpg")}
                        title="HOME PAGE"
                        subtitle="Images for home page"
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-slides-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_slides.jpg")}
                        title="ABOUT"
                        subtitle="Images for about"
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-slides-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_slides.jpg")}
                        title="OUR TEAM"
                        subtitle="Images for our team"
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-slides-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_slides.jpg")}
                        title="PRICES"
                        subtitle="Images for prices"
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-slides-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_slides.jpg")}
                        title="HOTEL/TRANSPORT"
                        subtitle="Images for hotel/transport"
                    /></Link>
                </Box>
                <Box gridColumn="span 4" backgroundColor = {colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <Link href="/website-slides-admin"><ThreeGridBoxImage 
                        image={require("../../../assets/images/website_slides.jpg")}
                        title="REVIEWS"
                        subtitle="Images for reviews"
                    /></Link>
                </Box>
            </Box>
        </Box>
    );
};

export default WebsiteComponentsAdmin;