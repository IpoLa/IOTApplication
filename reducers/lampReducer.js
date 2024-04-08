import { LAMP_ACTION } from '../actions/types';
const initialState = {
    lampName: '',
    is_on: false
};
const lampReducer = (state = initialState, action) => {
switch(action.type) {
    case LAMP_ACTION:
    return {
        ...state,
        is_on: state.is_on
    };
    default:
    return state;
}
}
export default lampReducer;