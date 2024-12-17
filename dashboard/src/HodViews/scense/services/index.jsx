import * as React from "react";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import { useNavigate, Link  } from 'react-router-dom';

const Services = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const boxContents = [
        { title: "Add Products", imageUrl: "url-to-image1.jpg", description: "You can add product price and descriptions", link: "/add-product" },
        // { title: "Edit Products", imageUrl: "url-to-image2.jpg", description: "You can edit product price and descriptions", link: "/services/subjects" },
        // { title: "Delete Products", imageUrl: "url-to-image3.jpg", description: "You can delete already added products", link: "/classes" },

    ];

    return (
        <Box>
            <Header title="Manage Products" subtitle="Choose the boxes to add/edit/delete" />

            <Box marginLeft="1%" marginRight="1%">
            <Grid container spacing={2}>
                    {boxContents.map((content, index) => (
                        <Grid item xs={4} key={index}>
                            <Link to={content.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box
                                    sx={{
                                        height: "30vh",
                                        border: "4px solid",
                                        borderColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[100],
                                        backgroundImage: `url(${content.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        padding: "1rem",
                                    }}
                                >
                                    <Typography variant="h5">{content.title}</Typography>
                                    <Typography variant="body1">{content.description}</Typography>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    );
};

export default Services;


