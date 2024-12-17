import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../base/theme";


const ThreeGridBoxImage = ({ title, subtitle, image, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width= "100%" m= "0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <img src={image} width="100px" alt="Website Image" />
                </Box>
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {subtitle}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">

                </Box>

            </Box>
        </Box>
    );

};

export default ThreeGridBoxImage;