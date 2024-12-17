import React, { useState } from 'react';
import chatbotImage from '../../assets/images/chatbot.png'; // Import the image
import { $getRoot, $createTextNode, $createParagraphNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const API_TEXT_URL = 'http://127.0.0.1:8000/ai_text_api/';
const token = await localStorage.getItem('jwtToken');



const WesiAiText = ({ onInsert, update }) => {

    const [editor] = useLexicalComposerContext();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [inputText, setInputText] = useState('');

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleGenerate = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Show loader
        const loader = document.createElement('div');
        loader.innerText = 'Please wait, do not close or refresh depends on the script it can take up to 2 minutes...';
        loader.style.position = 'fixed';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        loader.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        loader.style.padding = '20px';
        loader.style.borderRadius = '5px';
        loader.style.zIndex = '9999';
        document.body.appendChild(loader);
    
        try {
            const response = await fetch(API_TEXT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: inputText }),
            });
            const data = await response.json();
    
            // Show the response in the alert box
            showResponseAlert(data.message, () => {
                // Callback function to insert the response
                // You can add your logic here to insert the response into the editor
                onInsert(data.message); // Pass the message to the parent component
                update(event, data.message); // Update the editor with the received message
            });
        } finally {
            // Close loader
            document.body.removeChild(loader);
            closeDialog(); // Close the dialog
        }
    };
    

    function showResponseAlert(message, insertCallback) {
        const paragraphs = message.split('\n').map((paragraph) => `<p>${paragraph}</p>`).join('');
        const alertContainer = document.createElement('div');
        alertContainer.innerHTML = `
            <div class="response-alert" style="position: fixed; top: 10px; left: 10px; right: 10px; bottom: 10px; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; overflow-y: auto; z-index: 10000;">
                <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: calc(100% - 40px); max-height: calc(100% - 40px); overflow-y: auto;">
                    <div style="font-size: 18px; margin-bottom: 10px; color: black;"><h1>Your answer is:</h1></div>
                    <div style="font-size: 16px; margin-bottom: 10px; color: black;">${paragraphs}</div>
                    <button style="margin-top: 20px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;" onclick="document.querySelector('.response-alert').style.display = 'none';">Close</button>
                    <button style="margin-top: 20px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;" id="insert_button">Insert</button>
                </div>
            </div>
        `;
        document.body.appendChild(alertContainer);

        const alertBox = document.querySelector('.response-alert');
        alertBox.style.display = 'flex';

        // Add event listener to insert button
        const insertButton = alertBox.querySelector('#insert_button');
        insertButton.addEventListener('click', () => {
            editor.update(() => {
                const root = $getRoot();
                const p = $createParagraphNode();
                p.append($createTextNode(message));
                root.append(p);
            });
        
            alertBox.style.display = 'none';
        });
    }


    return (
        
        <div>
            {dialogOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    backgroundColor: '#03101f',
                    borderRadius: '8px',
                    padding: '20px',
                    color: 'white',
                    zIndex: '999',
                }}>
                    <h4>You can type your script and get the result</h4>
                    <textarea
                        className="text-area"
                        id="input-text"
                        style={{
                            width: '100%',
                            height: '150px',
                            padding: '12px 20px',
                            boxSizing: 'border-box',
                            border: '2px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#03101f',
                            fontSize: '16px',
                            resize: 'none',
                            color: 'white',
                        }}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                        <button className="dialog-button" onClick={handleGenerate}>Generate</button>
                        <button className="dialog-button" onClick={closeDialog}>Close</button>
                    </div>
                </div>
            )}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'black', // Set background color to black
                    color: 'white', // Set text color to white
                    border: 'none', // Remove border
                    zIndex: '999',
                }}
                onClick={openDialog}
            >
                <img src={chatbotImage} alt="Chatbot" style={{ width: '30px', height: '30px' }} />
            </div>
        </div>
        
    )

}

export {WesiAiText };

