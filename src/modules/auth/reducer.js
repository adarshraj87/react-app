import { JOIN } from 'auth';
const authInitialState = {
    isUserAuthenticiation: false
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case JOIN.SUCCESS:
            return {
                isUserAuthenticiation: true
            }
        default:
            return {
                ...state
            }
    }
};