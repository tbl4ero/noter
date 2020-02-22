export const active = (state = { id: null, text: null, title: null }, action) => {
    if (action.type === "SELECT_NOTE") {
        if (action.id !== null || action.id !== undefined) {
            return action.active;
        }
    }
    if (action.type === "_UPDATE") {
        return Object.assign(state, {text: action.text, title: action.title});
    }
    return state;
};