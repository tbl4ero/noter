import { createStore } from 'redux';

const defaultState =  {notes: [], active: { id: null, text: null, title: null }};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case "ADD_NOTE": {
            let newActiveNote = action.note;
            let newNotesArr =  [action.note, ...state.notes].map(el => { el.id+=1; return el;});
            newActiveNote.id = 0;
            newActiveNote.text = '';
            return Object.assign({},state, {notes: newNotesArr}, { active: newActiveNote });
        }
        case "SET_NOTES": {
            delete action['type'];
            console.log(action, state);
            if (action.notes.length === 0) {
                return state;
            }
            let firstStateActive = action.notes[action.active];
            firstStateActive.id = 0;
            return Object.assign({},state,action,{ active: firstStateActive});
        }
        case "SELECT_NOTE": {
            delete action['type']
            console.log(action.active);
            let newActive = state.notes[action.active];
            newActive.id = action.active;
            return Object.assign({},state, action, {active:newActive});
        }
        case "EDITOR_UPDATE": {
            delete action['type'];
            let newActive = {
                active: state.active
            }
            newActive.active.title = action.title === null ? state.active.title : action.title;
            newActive.active.text = action.activeText === null ? state.active.text : action.activeText;
            return Object.assign({}, state, newActive);
        }
        case "DELETE_NOTE": {
            const newNotesObj = {
                notes: [
                    ...state.notes.slice(0, action.id),
                    ...state.notes.slice(action.id+1, state.notes.length)
                ].map(el => {
                    if (el.id > action.id) {
                        el.id-=1;
                        return el;
                    }
                    return el;
                })
            }
            if (newNotesObj.notes.length === 0) {
                return Object.assign({}, state, newNotesObj,{ active: { id: null, text: null, title: null }});
            } else if (action.id === state.active.id) {
                const newActive = action.id === 0 ? action.id : action.id-1;
                let newActiveNote = newNotesObj.notes[newActive];
                newActiveNote.id = newActive;
                return Object.assign({}, state, newNotesObj, { active: newActiveNote });
            }
            return Object.assign({}, state, newNotesObj);
        }
        case "SWITCH_VIEW": {
            return Object.assign({}, state, { editor: action.editor })
        }
        case "RESET_STATE": {
            return defaultState;
        }
        default: {
            return state;
        }
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;