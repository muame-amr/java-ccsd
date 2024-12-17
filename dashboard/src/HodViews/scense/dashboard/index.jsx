import { Box } from "@mui/material";
import Header from "../../../components/Header";

const DashboardAdmin = () =>{
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle = "Welcome to Wesitex Dashboard" />
        </Box>
    </Box>
}

export default DashboardAdmin;