import React, { useState, useEffect } from 'react';
import useNotes from './NotesContext';

function Notes({ note, isEditing, onSave, onEdit }) {
    const { removeNote, updateNote } = useNotes();
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        if (isEditing) {
            setEditedTitle(note.title || '');
            setEditedContent(note.content || '');
        }
    }, [isEditing, note]);

    const handleDelete = () => {
        removeNote(note.id);
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(note.id);
        }
    };

    const handleSave = () => {
        // Validate that both title and content are not empty
        if (editedTitle.trim() === '' || editedContent.trim() === '') {
            // Use an alert to inform the user that both title and description are mandatory
            alert('Title and Description are mandatory. Please fill in both fields.');
            return; // Prevent saving if validation fails
        }

        updateNote(note.id, editedTitle, editedContent);
        if (onSave) {
            onSave();
        }
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
    };

    return (
        <div className="note bg-slate-800 p-4 rounded-lg shadow-md text-white">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        placeholder='Title'
                        className="w-full p-2 mb-4 border-2 border-gray-300 text-black rounded-md overflow-auto"
                    />
                    <textarea
                        value={editedContent}
                        onChange={handleContentChange}
                        placeholder='Description'
                        className="w-full p-2 mb-4 border-2 border-gray-300 text-black rounded-md h-[100px] overflow-y-auto"
                    />
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            ) : (
                <div>
                    <h2 className="text-gray-100 font-semibold mb-2 border-2 border-gray-300 rounded-md overflow-auto p-2">{note.title}</h2>
                    <p className="text-gray-400 mb-4 max-h-[140px] overflow-auto border-2 border-gray-300 rounded-md h-[100px] overflow-y-auto p-2">{note.content}</p>
                    
                    <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">✏️</button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">🗑️</button>
                </div>
            )}
        </div>
    );
}

export default Notes;
