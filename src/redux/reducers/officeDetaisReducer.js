const SET_OFFICE_DETAILS = "SET_OFFICE_DETAILS";
export default function officeDetailsReducer(state = {}, action) {
  switch (action.type) {
    case SET_OFFICE_DETAILS:
      return action;

    default:
      return state;
  }
}