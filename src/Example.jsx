// import React, { useContext, useState } from 'react';
// import { NotesContext } from './NotesContext';
// import Notes from './Notes';
// import { nanoid } from 'nanoid';

// export default function Example() {
//     const { notes, addNote } = useContext(NotesContext);
//     const [isAddingNewNote, setIsAddingNewNote] = useState(false);
//     const [newNoteId, setNewNoteId] = useState(null);

//     const handleAddNewNote = () => {
//         const id = nanoid();
//         // Ensure you're passing non-empty strings for title and content
//         addNote('New Note', 'New Content', id); // Adjust the title and content as needed
//         setNewNoteId(id);
//         setIsAddingNewNote(true);
//     };

//     // const handleNoteEdit = (id) => {
//     //     setNewNoteId(id);
//     //     setIsAddingNewNote(true);
//     // };
//     const handleNoteEdit = (id) => {
//         if (notes.some(note => note.id === id && note.title === 'New Note')) {
//             // If the note being edited has the default title "New Note",
//             // set the content to an empty string instead of "New Content"
//             updateNote(id, '', '');
//         }
//         setNewNoteId(id);
//         setIsAddingNewNote(true);
//     };
    

//     const handleNoteSave = () => {
//         setIsAddingNewNote(false);
//         setNewNoteId(null);
//     };

//     return (
//         <div id="root" className="max-w-7xl mx-auto p-8 text-center">
//             <header className="shadow text-start ">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-100">Keep Notes</h1>
//                 </div>
//             </header>
//             <main>
//                 <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-5 grid grid-cols-2 gap-4 md:grid-cols-4">
//                     <button className="p-5 text-gray-400 rounded-md bg-transparent border-2 border-gray-400 border-dashed flex items-center justify-center flex-col cursor-pointer hover:bg-slate-600" onClick={handleAddNewNote}>
//                         <span className="text-gray-400 text-4xl">&#43;</span>
//                         <div className='text-gray-400 text-xl'>Add Note</div>
//                     </button>
//                     {notes.map((note, index) => (
//                         <Notes
//                             key={index}
//                             note={note}
//                             isEditing={isAddingNewNote && note.id === newNoteId}
//                             onSave={handleNoteSave}
//                             onEdit={() => handleNoteEdit(note.id)}
//                         />
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// }
import React, { useContext, useState } from 'react';
import { NotesContext } from './NotesContext';
import Notes from './Notes';
import { nanoid } from 'nanoid';

export default function Example() {
    const { notes, addNote, updateNote } = useContext(NotesContext); // Receive updateNote from context
    const [isAddingNewNote, setIsAddingNewNote] = useState(false);
    const [newNoteId, setNewNoteId] = useState(null);

    const handleAddNewNote = () => {
        const id = nanoid();
        // Ensure you're passing non-empty strings for title and content
        addNote('New Note', 'New Content', id); // Adjust the title and content as needed
        setNewNoteId(id);
        setIsAddingNewNote(true);
    };

    const handleNoteEdit = (id) => {
        const noteToUpdate = notes.find(note => note.id === id);
        if (noteToUpdate && noteToUpdate.title === 'New Note') {
            updateNote(id, '', ''); // Update the note with empty title and content
        }
        setNewNoteId(id);
        setIsAddingNewNote(true);
    };

    const handleNoteSave = () => {
        setIsAddingNewNote(false);
        setNewNoteId(null);
    };

    return (
        <div id="root" className="max-w-7xl mx-auto p-8 text-center">
            <header className="shadow text-start ">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-100">Keep Notes</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <button className="p-5 text-gray-400 rounded-md bg-transparent border-2 border-gray-400 border-dashed flex items-center justify-center flex-col cursor-pointer hover:bg-slate-600" onClick={handleAddNewNote}>
                        <span className="text-gray-400 text-4xl">&#43;</span>
                        <div className='text-gray-400 text-xl'>Add Note</div>
                    </button>
                    {notes.map((note, index) => (
                        <Notes
                            key={index}
                            note={note}
                            isEditing={isAddingNewNote && note.id === newNoteId}
                            onSave={handleNoteSave}
                            onEdit={() => handleNoteEdit(note.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
