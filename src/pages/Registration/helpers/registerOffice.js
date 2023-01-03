import moment from "moment-hijri";
import axios from "axios";
import { mappingDataToOneObj } from "./mappingDataToOneObj";
export const registerOffice = async (
  type,
  endPoint,
  dates,
  formValues,
  selectValues,
  uploadedImagesMultiple,
  uploadedImagesSingle,
  selectedCategories,
  captchaToken,
  selectedEmployees,
  jobs,
  selectedStaffData,
  officeRejections,
  checkedStaff
) => {
  let finalCheckedStaff = [];
  checkedStaff.forEach((f) => {
    finalCheckedStaff.push({
      department_id: f.approve !== undefined ? f.approve?.id : f.id,
      eng_comp_class_id: f.class !== undefined ? f.class.id : 5,
      eng_comp_category_id:
        f.category !== undefined && f.category !== null ? f.category.id : null,
    });
  });

  console.log(finalCheckedStaff);
  let registEmployees = [];
  selectedEmployees.length > 0 &&
    selectedEmployees.map((j) => {
      if (j !== undefined && j !== false) {
        j = {
          id: j.id,
          name: j.employee.employeesValues.name,
          nationalidtype_id: j.employee.selectEmployeeValues.idTypeObject.id,
          ssn: j.employee.employeesValues.IdNumber,
          category_id:
            j.category.id !== "" &&
            j.category.id !== null &&
            j.category_id !== 0
              ? j.category.id
              : null,
          university: j.employee.employeesValues.highAcademicQualif,
          graduation_year: j.employee.employeesValues.graduiationYear,
          consultant_member_no: j.employee.employeesValues.certificateNumber,
          nationality_id: j.employee.selectEmployeeValues.nationalityObject.id,
          is_eng_comp_owner: j.employee.employeeChecks.officeOwner ? 1 : 0,
          is_responsible: j.employee.employeeChecks.manager ? 1 : 0,
          ssn_image: j.employee.images[0].value[0].data,
          certification_iamge: j.employee.images[1].value[0].data,
          emp_type_id: j.employee.selectEmployeeValues.employeeJobObject?.id,
          cv_file: j.employee.images[2].value[0].data,
          saudi_reg:
            j.employee.images[3] !== undefined &&
            j.employee.images[3].value !== undefined &&
            j.employee.images[3].value[0] !== undefined &&
            j.employee.images[3].value[0].data,
          ssn_issue_name: j.employee.employeesValues.idSide,
          ssn_end_date: moment(
            j.employee.employeeDates.IDFinishDate,
            "iYYYY/iMM/iDD"
          ).format("iDD/iMM/iYYYY"),
          consultant_end:
            j.employee?.employeeDates?.certificateFinishDate !== null
              ? moment(
                  j.employee?.employeeDates?.certificateFinishDate,
                  "iYYYY/iMM/iDD"
                ).format("iDD/iMM/iYYYY")
              : null,
          consultant_start:
            j.employee?.employeeDates?.certificateReleaseDate !== null
              ? moment(
                  j.employee?.employeeDates?.certificateReleaseDate,
                  "iYYYY/iMM/iDD"
                ).format("iDD/iMM/iYYYY")
              : null,
          position_id: j.employee.selectEmployeeValues.empProfLevelObject.id,
        };
        // if(j.employee?.employeeDates?.certificateFinishDate!==null&&j.employee?.employeeDates?.certificateReleaseDate!==null){

        // }
        registEmployees.push(j);
      }
    });
  let surveyData =
    formValues.gpsDevices !== ""
      ? {
          machines_image: uploadedImagesMultiple.equipmentSurveyingBillsStep2
            .map((x) => x.data)
            .join(","),
          form_image: uploadedImagesMultiple.VehicleFormsStep2.map(
            (x) => x.data
          ).join(","),
          machines_no_gps: formValues.gpsDevices,
          machines_no_ts: formValues.totalStationDevices,
        }
      : null;

  let officeData = {};
  let engCompObj = {
    name: formValues.officeName,
    address: formValues.address,
    phone: formValues.phone,
    mobile: "966" + formValues.mobile,
    office_id: formValues.amanaOfficeRegNum,
    fax: formValues.fax,
    email: formValues.email,
    office_type_id: selectValues.officeType.id,
    postal_code: formValues.postal_code,
    mail_box: formValues.mail_box,
    foundation_year: formValues.foundation_year,
    letter_reg: uploadedImagesSingle.RegistRequestImgStep1[0].data,
    ycoord: 26.415913620856266,
    xcoord: 50.07957456678446,
    ename: formValues.engofficeName,
    commercial_registration_no: formValues.commercial_registration_no,
    commercial_reg_end_date: moment(
      dates.commercial_reg_end_date,
      "iYYYY/iMM/iDD"
    ).format("iDD/iMM/iYYYY"),
    another_items: uploadedImagesMultiple.additionalFilesStep1,
    city: formValues.city,
    street: formValues.street,
    appart: formValues.appart,
    building: formValues.building,
    floor: formValues.floor,
    department_eng_comp:
      type == "edit" ? finalCheckedStaff : selectedCategories,
  };
  // if (formValues.amanaOfficeRegNum !== "") {
  //   engCompObj.office_id = formValues.amanaOfficeRegNum;
  // }
  officeData = {
    eng_approved: "ENG_COMPANY_APPROVE.ENGCOMPDETAILS",
    app_id: 13,
    module: "engCompanyRegister",
    engComp: engCompObj,
    json_file: mappingDataToOneObj(
      type,
      dates,
      formValues,
      selectValues,
      uploadedImagesMultiple,
      uploadedImagesSingle,
      selectedEmployees,
      jobs,
      selectedStaffData,
      officeRejections
    ),

    saudi_eng_license: {
      image: uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data,
      license_no: formValues.liceNum,
      start_date: moment(dates.Step2licereleaseDate, "iYYYY/iMM/iDD").format(
        "iDD/iMM/iYYYY"
      ),
      end_date: moment(dates.Step2licefinishDate, "iYYYY/iMM/iDD").format(
        "iDD/iMM/iYYYY"
      ),
      type: 2,
    },
    lics: [
      {
        image: uploadedImagesSingle.MunLicenseImgStep3[0].data,
        license_no: formValues.liceNum1,
        start_date: moment(dates.Step3releaseDate, "iYYYY/iMM/iDD").format(
          "iDD/iMM/iYYYY"
        ),
        end_date: moment(dates.Step3licFinishDate, "iYYYY/iMM/iDD").format(
          "iDD/iMM/iYYYY"
        ),
        type: 1,
      },
      {
        image: uploadedImagesSingle.SocialInsurCertifStep3[0].data,
        print_image: uploadedImagesSingle.SocialInsurPrintStep3[0].data,
        license_no: formValues.liceNum2,
        subscribe_no: formValues.subscripNum,
        end_date: moment(dates.certifFinishDate, "iYYYY/iMM/iDD").format(
          "iDD/iMM/iYYYY"
        ),
        type: 3,
      },
      {
        image: uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data,
        license_no: formValues.liceNum,
        start_date: moment(dates.Step2licereleaseDate, "iYYYY/iMM/iDD").format(
          "iDD/iMM/iYYYY"
        ),
        end_date: moment(dates.Step2licefinishDate, "iYYYY/iMM/iDD").format(
          "iDD/iMM/iYYYY"
        ),
        type: 2,
      },
    ],
    capatcha: captchaToken,
    surveyData: surveyData,
    employess: registEmployees,
  };
  if (type == "create") {
    officeData.userAccount = {
      username: formValues.username,
      password: formValues.password,
      confirmPass: formValues.confirmNewPassword,
      name: formValues.officeName,
    };
  }

  let officeEditData = {
    ...engCompObj,
    id: JSON.parse(localStorage.getItem("user"))?.engcompany_id,
    un_approve_path: JSON.parse(localStorage.getItem("user"))
      ?.engineering_companies?.un_approve_path,
    json_file: mappingDataToOneObj(
      type,
      dates,
      formValues,
      selectValues,
      uploadedImagesMultiple,
      uploadedImagesSingle,
      selectedEmployees,
      jobs,
      selectedStaffData,
      officeRejections
    ),
  };
  let config =
    type == "edit"
      ? {
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      : {};
  let result = await axios.post(
    `${window.ApiUrl}/${endPoint}`,
    type == "edit" ? officeEditData : officeData,
    config
  );
  return result;
};
