// import React, { useState, useEffect } from 'react';
// import { NotesProvider } from './NotesContext';
// import Example from './Example';
// import { nanoid } from 'nanoid';

// function App() {
//     const [notes, setNotes] = useState(() => {
//         const savedNotes = localStorage.getItem('notes');
//         if (savedNotes) {
//             return JSON.parse(savedNotes);
//         } else {
//             return [];
//         }
//     });

//     const addNote = (title, notes, id = nanoid()) => {
//         // Validate that both title and content are not empty
//         if (title.trim() === '' || notes.trim() === '') {
//             alert('Title and Description are mandatory. Please fill in both fields.');
//             return; // Prevent adding if validation fails
//         }

//         const newNote = {
//             id,
//             title,
//             notes,
//             date: new Date().toLocaleDateString().substr(0, 10),
//             time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
//         };
//         setNotes(prevNotes => [newNote, ...prevNotes]);
//     };

//     const removeNote = (id) => {
//         setNotes(notes.filter(note => note.id !== id));
//     };

//     const updateNote = (id, title, content) => {
//     setNotes(notes => notes.map(note => (note.id === id ? { ...note, title, content } : note)));
//     };


//     useEffect(() => {
//         localStorage.setItem('notes', JSON.stringify(notes));
//     }, [notes]);

//     return (
//         <NotesProvider value={{ notes, addNote, removeNote, updateNote }}>
//             <Example />
//         </NotesProvider>
//     );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { NotesProvider } from './NotesContext';
import Example from './Example';
import { nanoid } from 'nanoid';

function App() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            return JSON.parse(savedNotes);
        } else {
            return [];
        }
    });
    const [unsavedChanges, setUnsavedChanges] = useState(false); // Track unsaved changes

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (unsavedChanges) {
                const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
                (event || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [unsavedChanges]);

    const addNote = (title, notes, id = nanoid()) => {
        // Validate that both title and content are not empty
        if (title.trim() === '' || notes.trim() === '') {
            alert('Title and Description are mandatory. Please fill in both fields.');
            return; // Prevent adding if validation fails
        }

        const newNote = {
            id,
            title,
            notes,
            date: new Date().toLocaleDateString().substr(0, 10),
            time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setUnsavedChanges(true); // Set unsaved changes flag to true
    };

    const removeNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        setUnsavedChanges(true); // Set unsaved changes flag to true
    };

    const updateNote = (id, title, content) => {
        setNotes(notes => notes.map(note => (note.id === id ? { ...note, title, content } : note)));
        setUnsavedChanges(true); // Set unsaved changes flag to true
    };

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
        setUnsavedChanges(false); // Reset unsaved changes flag after saving changes
    }, [notes]);

    return (
        <NotesProvider value={{ notes, addNote, removeNote, updateNote }}>
            <Example unsavedChanges={unsavedChanges} /> {/* Pass unsavedChanges to Example component */}
        </NotesProvider>
    );
}

export default App;
