export function createReducer(initialState, map) {
    return (state = initialState, action) => {
        const reducer = map[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}
