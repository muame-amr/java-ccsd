import React from 'react';
import EditorWrapper from './editorBox';
import { Grid } from '@mui/material';




const CK = ({ height = "800px" }) => {

    
    


    return (
        <div style={{ position: 'relative', minHeight: height }}>
            
            <Grid item xs = {15} sx={{ width: "100%", mt: 5 }}>
                <EditorWrapper />
              
            </Grid>
        </div>
    );
}

export default CK;
