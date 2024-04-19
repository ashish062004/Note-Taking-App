// NotesContext.js
import { createContext, useContext} from "react";

export const NotesContext = createContext({
    notes: [],
    addNote: () => {},
    removeNote: () => {},
    updateNote: () => {},
});
export const NotesProvider = NotesContext.Provider;

export default function useNotes() {
    return useContext(NotesContext);
}