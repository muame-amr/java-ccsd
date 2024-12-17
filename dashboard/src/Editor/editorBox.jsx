import {useEffect} from 'react';
import onChange from './onChange';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import LexicalTheme from './lexicalTheme';
import { MuiContentEditable, placeHolderSx } from './style';
import { Box } from '@mui/material';
import EditorToolbar from './Toolbar';
import lexicalEditorTheme from './lexicalEditorTheme';
import lexicalEditorConfig from './config';

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from './plugin/imagePlugin';

import {WesiAiText } from './AI/wesiAiText'



function EditorWrapper() {


  return (

    
    <LexicalComposer initialConfig={lexicalEditorConfig}>
        <EditorToolbar />
        <Box sx={{ background: "white", position: "relative", mt: 1}}>   
            <RichTextPlugin
              
              contentEditable={<MuiContentEditable/>}
              placeholder={<Box sx={placeHolderSx} > Enter your text here </Box>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <WesiAiText />
            <OnChangePlugin onChange={onChange} />
         
            <ImagesPlugin captionsEnabled={false} />
            
        </Box>
       
    </LexicalComposer>
  );
}

export default EditorWrapper;