import React, { useState, useEffect } from 'react';
import '../../assets/css/focused.css';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setFocusedIndex(-1);
    };

    const handleAddNote = () => {
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
    };

    const handleDeleteNote = (index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
        setFocusedIndex(-1);
    };

    const handleNoteClick = (index) => {
        setInputValue(notes[index]);
        setFocusedIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleAddNote();
            }
            else if (event.key === 'Escape') {
                setInputValue('');
            }
            else if (event.key === 'Backspace') {
                if (inputValue === '') {
                    if (focusedIndex !== -1) {
                        handleDeleteNote(focusedIndex);
                    } else {
                        handleDeleteNote(notes.length - 1);
                    }
                } else {
                    setInputValue(inputValue.slice(0, -1));
                }
            }
            else if (event.key === 'Delete') {
                if (focusedIndex !== -1) {
                    handleDeleteNote(focusedIndex);
                } else{
                    handleDeleteNote(notes.length - 1);
                }
            }
            else if (event.key === 'ArrowUp') {
                if (focusedIndex > 0) {
                    setFocusedIndex(focusedIndex - 1);
                    setInputValue(notes[focusedIndex - 1]);
                }
            }
            else if (event.key === 'ArrowDown') {
                if (focusedIndex < notes.length - 1) {
                    setFocusedIndex(focusedIndex + 1);
                    setInputValue(notes[focusedIndex + 1]);
                }
            }
            else if (event.key === 'ArrowLeft') {
                if (focusedIndex !== -1) {
                    setFocusedIndex(0);
                    setInputValue(notes[0]);
                }
            }
            else if (event.key === 'ArrowRight') {
                if (focusedIndex !== -1) {
                    setFocusedIndex(notes.length - 1);
                    setInputValue(notes[notes.length - 1]);
                }
            }
            else {
                setInputValue(inputValue + event.key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue, notes, focusedIndex]);



    return (
        <div>
            <h1>Notes App</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your note"
                    disabled={true}
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
