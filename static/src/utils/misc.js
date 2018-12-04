// src: https://github.com/dternyak/React-Redux-Flask/blob/master/static/src/utils/misc.js
export function createReducer(initialState, map) {
    return (state = initialState, action) => {
        const reducer = map[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}
