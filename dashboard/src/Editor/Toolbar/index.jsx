import { Grid } from "@mui/material";
import { createPortal } from 'react-dom';
import pluginsList from "./toolbarIconList";
import useOnClickListener from "./useOneClickListener";
import FloatingLinkEditor from "./FloatingLinkEditor"

const EditorToolbar = () => {

    const {onClick, isLink, editor, modal} = useOnClickListener();

    return (
        <Grid 
            container 
            sx={{ background: "white", width: "100%", py: 1, px: 1 }} 
            justifyContent="space-between"
        >
            {pluginsList.map((plugin) => (
                <Grid item key={plugin.id}>
                    <plugin.Icon onClick = {() => onClick(plugin.event)} />
                </Grid>
            ))}

            {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}

            {modal}
        </Grid>
    );
};

export default EditorToolbar;
