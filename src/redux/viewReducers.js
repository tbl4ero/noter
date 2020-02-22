export const editor = (state = false, action) => {
    if (action.editor !== undefined) {
        return action.editor;
    }
    return state;
};

export const mobileDisplay = (state = window.screen.width < 850 ? true : false) => {
    return state;
};