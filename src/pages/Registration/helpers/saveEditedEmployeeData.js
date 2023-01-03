import moment from "moment-hijri";
import axios from "axios";
export const saveEditedEmployeeData = async (
  empData,
  selectedStaffData,
  uploadedImagesSingle,
  employeeChecks,
  employeeDates,
  employeesValues,
  selectEmployeeValues,
  selectedEmployees
) => {
  let selectStaffSwap = selectedEmployees.map((j) => {
    if (
      (empData !== undefined&&empData!==false &&
        empData.UniqueId !== undefined &&
        j?.UniqueId !== undefined &&
        j?.UniqueId == empData.UniqueId) ||
      (empData !== undefined &&empData!==false &&
        empData?.UniqueId == undefined &&
        j?.UniqueId == undefined &&
        j?.id === empData.id)
    ) {
      j["employee"] = {
        employeesValues,
        selectEmployeeValues,
        employeeDates,
        employeeChecks,
        images: [
          {
            name: "IDImgEmpModal",
            value:
              uploadedImagesSingle?.IDImgEmpModal?.length > 0
                ? uploadedImagesSingle.IDImgEmpModal
                : j["employee"].images[0].value,
          },
          {
            name: "specialityCertificateImgEmpModal",
            value:
              uploadedImagesSingle?.specialityCertificateImgEmpModal?.length >
                0 && uploadedImagesSingle.specialityCertificateImgEmpModal,
          },
          {
            name: "CvFileEmpModal",
            value:
              uploadedImagesSingle?.CvFileEmpModal?.length > 0 &&
              uploadedImagesSingle.CvFileEmpModal,
          },
          {
            name: "certificateFileEmpModal",
            value:
              uploadedImagesSingle?.certificateFileEmpModal?.length > 0 &&
              uploadedImagesSingle.certificateFileEmpModal,
          },
        ],
      };
    }
  });

  selectStaffSwap.push(...selectedEmployees, selectStaffSwap);
};
