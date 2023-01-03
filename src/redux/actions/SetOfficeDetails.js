import { SET_OFFICE_DETAILS } from "./rootActions";

export function addOfficeDetails(officeDetails,viewOnly,selectedTab) {
  return {
    type: SET_OFFICE_DETAILS,
    officeDetails,viewOnly,selectedTab
  };
}
