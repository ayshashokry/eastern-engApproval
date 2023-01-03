// import { handleError, handleResponse } from "./apiCommonUtils";
import axios from "axios";
const BaseUrl = window.ApiUrl;
const token = localStorage.token;

// export function getOfficeTypes1() {
//   const request = new Request(`${BaseUrl}/GISAPITESTV2/api/office_types`);
//   return fetchRequest(request);
// }

export const getOfficeTypes = async () => {
  let result = await axios.get(`${BaseUrl}/api/office_types`);
  return result;
};

export const getAllJobs = async () => {
  let result = await axios.get(`${BaseUrl}/api/EngCompEmpType`);
  return result;
};

export const getProfessioalLevels = async () => {
  let result = await axios.get(`${BaseUrl}/api/EngCompPosition`);
  return result;
};

export const getEmployeesSpecialities = async () => {
  let result = await axios.get(`${BaseUrl}/api/EngineeringCategory`);
  return result;
};
export const getNationalityType = async () => {
  let result = await axios.get(`${BaseUrl}/api/NatinalIdTypes`);
  return result;
};

export const getNationalitiesWithTypeID = async (id) => {
  let result = await axios.get(
    `${BaseUrl}/api/Nationalities?filter_key=nationalty_type_id&operand=%3D&q=${id}`
  );
  return result;
};
export const getNationalities = async () => {
  let result = await axios.get(
    `${BaseUrl}/GISAPITESTV2/api/Nationalities/GetAll?pageSize=200`
  );
  return result;
};

export const CheckUnique = async (key, value, setLoader) => {
  setLoader(true);
  let result = await axios.get(
    `${BaseUrl}/api/engineeringcompany/CheckUnique/?key=${key}&q=${value}`
  );
  return result;
};
export const CheckUniqueSSN = async (value) => {
  let result = await axios.get(
    `${BaseUrl}/CheckUniqueEmp?ssn=${value}`,
    // { ssn: value },
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return result;
};
export const CheckUniqueLic = async (value, setLoader,type) => {
  setLoader(true);
  let result = await axios.get(
    `${BaseUrl}/License/CheckLicUnique?lic_no=${value}&type=${type}`,
    // { ssn: value },
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return result;
};

export const getOfficeById = async (id) => {
  let result = await axios.get(`${BaseUrl}/EngineeringCompany/${id}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  return result;
};

export const getCompanyConts = async () => {
  let result = await axios.get(
    `${BaseUrl}/EngineeringCompany/GetEngCompCounts`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return result;
};

export const approveSubmission = async (officeDta) => {
  let result = await axios.post(
    `${BaseUrl}/engineercompany/approve`,
    officeDta,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return result;
};
// export function reopenTicket(ticketId, reason) {
//   const request = new Request(ticketsBaseUrl + ticketId + "/reopen/", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       authorization: `bearer ${token}`,
//     },
//     body: JSON.stringify(reason),
//   });
//   return fetchRequest(request);
// }

// export function getTaskComments(taskId) {
//   const request = new Request(ticketsBaseUrl + taskId + "/comments", {
//     headers: {
//       authorization: `bearer ${token}`,
//     },
//   });
//   return fetchRequest(request);
// }

// export function getTaskCommentsStats(taskId) {
//   const request = new Request(ticketsBaseUrl + taskId + "/comments-stats", {
//     headers: {
//       authorization: `bearer ${token}`,
//     },
//   });
//   return fetchRequest(request);
// }

// export function deleteTaskComment(taskId, commentId) {
//   const request = new Request(
//     ticketsBaseUrl + taskId + "/comments/" + commentId,
//     {
//       method: "DELETE",
//       headers: {
//         authorization: `bearer ${token}`,
//       },
//     }
//   );
//   return fetchRequest(request);
// }

// export function saveTaskComment(taskId, comment) {
//   const request = new Request(
//     ticketsBaseUrl + taskId + "/comments/" + (comment.id || ""),
//     {
//       method: comment.id ? "PUT" : "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `bearer ${token}`,
//       },
//       body: JSON.stringify(comment),
//     }
//   );

//   return fetchRequest(request);
// }

// async function fetchRequest(request) {
//   return await fetch(request).then(handleResponse).catch(handleError);
// }
