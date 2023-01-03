import moment from "moment-hijri";
import axios from "axios";
export const getOfficeDataToEdit = async () => {
  let endPoint = JSON.parse(localStorage.getItem("user"))?.engineering_companies
    ?.un_approve_path;
  let result = axios.get(`${window.hostURL}/${endPoint}`);
  return result;
};
