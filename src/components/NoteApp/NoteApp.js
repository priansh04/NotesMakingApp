import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/css/focused.css';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleInputChange = useCallback((event) => {
        setInputValue(event.target.value);
        setFocusedIndex(-1);
    }, []);

    const handleAddNote = useCallback(() => {
        if (inputValue.trim() !== '') {
            if (focusedIndex !== -1) {
                const newNotes = [...notes];
                newNotes[focusedIndex] = inputValue;
                setNotes(newNotes);
                setFocusedIndex(-1);
            } else {
                setNotes([...notes, inputValue]);
                setInputValue('');
            }
        }
    }, [inputValue, focusedIndex, notes]);

    const handleDeleteNote = useCallback((index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
        setFocusedIndex(-1);
    }, [notes]);

    const handleNoteClick = useCallback((index) => {
        setInputValue(notes[index]);
        setFocusedIndex(index);
    }, [notes]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Your existing event handling logic
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleAddNote, handleDeleteNote]);

    return (
        <div>
            <h1>Notes App</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your note"
                />
                <button onClick={handleAddNote}>Add Note</button>
            </div>
            <ul>
                {notes.map((note, index) => (
                    <li key={index} className={focusedIndex === index ? 'focused' : ''} onClick={() => handleNoteClick(index)}>
                        {note}
                        <button onClick={() => handleDeleteNote(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesApp;
