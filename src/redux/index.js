import { combineReducers, createStore } from "redux";
import { active } from "./activeReducer";
import { editor, mobileDisplay } from "./viewReducers";
import { notes } from "./notesReducer";

const rootReducer = combineReducers({ notes, active, editor, mobileDisplay });

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
