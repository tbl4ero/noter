export function notes(state = [], action) {
    switch (action.type) {
        case "ADD_NOTE": {
            return [action.note, ...state];
        }
        case "SET_NOTES": {
            if (action.notes.length === 0) {
                return state;
            }
            return action.notes;
        }
        case "DELETE_NOTE": {
            const newNotes = [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1, state.length)
            ].map(el => {
                if (el.id > action.id) {
                    el.id -= 1;
                    return el;
                }
                return el;
            });
            if (newNotes.length === 0) {
                return [];
            }
            return newNotes;
        }
        case "RESET_STATE": {
            return state;
        }
        default: {
            return state;
        }
    }
}
