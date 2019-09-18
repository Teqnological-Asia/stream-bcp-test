import { LOAD_PROFILE_SUCCESS, LOAD_ACCOUNTS_INFO_SUCCESS } from '../constants/profile';

const initialState = {
  profile: null,
  documents: null,
  currentAccount: null,
  accounts: []
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        documents: action.documents
      };
    case LOAD_ACCOUNTS_INFO_SUCCESS: {
      return {
        ...state,
        currentAccount: action.currentAccount,
        accounts: action.accounts.sort((a, b) => {
          if (a.type === b.type) {
            return 0
          } else {
            return b.type === 'MAIN' ? 1 : -1
          }
        })
      }
    }
    default:
      return state;
  }
}

export default profileReducer;