import moment from "moment-hijri";
export const mappingDataToOneObj = (
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
) => {
  let registEmployees = [];
  selectedEmployees.length > 0 &&
    selectedEmployees.map((j) => {
      if (j !== undefined && j !== false) {
        j = {
          id: j.id,
          name: j.employee?.employeesValues?.name,
          mandatory: j.mandatory,
          nationalidtype_id: j.employee?.selectEmployeeValues.idTypeObject,
          ssn: j.employee?.employeesValues.IdNumber,
          category_id:
            j.mandatory == 1
              ? j.category
              : j.employee?.selectEmployeeValues?.employeeSpecialtyObject,
          university: j.employee?.employeesValues.highAcademicQualif,
          graduation_year: j.employee?.employeesValues.graduiationYear,
          consultant_member_no: j.employee?.employeesValues.certificateNumber,
          nationality_id: j.employee?.selectEmployeeValues.nationalityObject,
          is_eng_comp_owner: j.employee?.employeeChecks.officeOwner ? 1 : 0,
          is_responsible: j.employee?.employeeChecks.manager ? 1 : 0,
          ssn_image:
            j.employee == undefined && j.employee?.images == undefined
              ? undefined
              : j.employee?.images !== undefined &&
                j.employee?.images !== null &&
                j.employee?.images[0].value !== undefined &&
                j.employee?.images[0].value[0].data,
          certification_iamge:
            j.employee == undefined && j.employee?.images == undefined
              ? undefined
              : j.employee?.images !== undefined &&
                j.employee?.images !== null &&
                j.employee?.images[1].value !== undefined &&
                j.employee?.images[1].value[0].data,
          emp_type_id:
            j.employee?.selectEmployeeValues?.employeeJobObject == undefined
              ? jobs.filter((x) => x.id == j.id)[0]
              : j.employee?.selectEmployeeValues?.employeeJobObject,
          cv_file:
            j.employee == undefined && j.employee?.images == undefined
              ? undefined
              : j.employee?.images !== undefined &&
                j.employee?.images !== null &&
                j.employee?.images[2].value !== undefined &&
                j.employee?.images[2].value[0].data,
          saudi_reg:
            j.employee == undefined && j.employee?.images == undefined
              ? undefined
              : j.employee?.images !== undefined &&
                j.employee?.images !== null &&
                j.employee?.images[3] !== undefined &&
                j.employee?.images[3].value !== undefined &&
                j.employee?.images[3].value[0] !== undefined &&
                j.employee?.images[3].value[0].data,
          ssn_issue_name: j.employee?.employeesValues.idSide,
          ssn_end_date:
            j.employee !== undefined &&
            j.employee.employeeDates !== undefined &&
            j.employee?.employeeDates.IDFinishDate !== null
              ? moment(
                  j.employee?.employeeDates.IDFinishDate,
                  "iYYYY/iMM/iDD"
                ).format("iDD/iMM/iYYYY")
              : null,
          consultant_end:
            j.employee !== undefined &&
            j.employee.employeeDates !== undefined &&
            j.employee?.employeeDates?.certificateFinishDate !== null
              ? moment(
                  j.employee?.employeeDates?.certificateFinishDate,
                  "iYYYY/iMM/iDD"
                ).format("iDD/iMM/iYYYY")
              : null,
          consultant_start:
            j.employee !== undefined &&
            j.employee.employeeDates !== undefined &&
            j.employee?.employeeDates?.certificateReleaseDate !== null
              ? moment(
                  j.employee?.employeeDates?.certificateReleaseDate,
                  "iYYYY/iMM/iDD"
                ).format("iDD/iMM/iYYYY")
              : null,
          position_id: j.employee?.selectEmployeeValues?.empProfLevelObject,
        };
        registEmployees.push(j);
      }
    });
  let officeData = {};

  officeData = {
    office_data: {
      eng_company_data: {
        another_items: uploadedImagesMultiple?.additionalFilesStep1,
        letter_reg:
          uploadedImagesSingle?.RegistRequestImgStep1 !== undefined &&
          uploadedImagesSingle?.RegistRequestImgStep1[0] !== undefined
            ? uploadedImagesSingle?.RegistRequestImgStep1[0].data
            : "",
        approved_sak: 1,
        office_type_id: selectValues?.officeType,
        name: formValues?.officeName,
        ename: formValues?.engofficeName,
        "mobile-part": formValues?.mobile,
        mobile: "966" + formValues?.mobile,
        email: formValues?.email,
        office_id: formValues?.amanaOfficeRegNum,
        foundation_year: formValues?.foundation_year,
        commercial_registration_no: formValues?.commercial_registration_no,
        commercial_reg_end_date:
          dates?.commercial_reg_end_date !== null
            ? moment(dates?.commercial_reg_end_date, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
      },
      office_info_licences: {
        saudi_mail_subscribe:
          uploadedImagesSingle?.SaudiPostSubscImgStep1 !== undefined &&
          uploadedImagesSingle?.SaudiPostSubscImgStep1[0] !== undefined
            ? uploadedImagesSingle?.SaudiPostSubscImgStep1[0].data
            : "",
        address: formValues?.address,
        phone: formValues?.phone,
        fax: formValues?.fax,
        mail_box: formValues?.mail_box,
        postal_code: formValues?.postal_code,
        city: formValues?.city,
        street: formValues?.street,
        building: formValues?.building,
        floor: formValues?.floor,
        appart: formValues?.appart,
        eng_comp_location: {
          position: [26.415913620856266, 50.07957456678446],
          address: "المنطقة الشرقية السعودية",
        },
        ycoord: 26.415913620856266,
        xcoord: 50.07957456678446,
      },
    },
    specialization_data: {
      saudi_eng_license: {
        image:
          uploadedImagesSingle?.SaudiAuthLicenseImgStep2 !== undefined &&
          uploadedImagesSingle?.SaudiAuthLicenseImgStep2[0] !== undefined
            ? uploadedImagesSingle?.SaudiAuthLicenseImgStep2[0].data
            : "",
        license_no: formValues?.liceNum,
        start_date:
          dates?.Step2licereleaseDate !== null
            ? moment(dates?.Step2licereleaseDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        end_date:
          dates?.Step2licefinishDate !== null
            ? moment(dates?.Step2licefinishDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        type: 2,
      },
      approved_dep: {
        department_eng_comp: selectedStaffData,
        eng_company_class_id: null,
        main_category_selected: selectedStaffData,
        survey_department: false,
        machines_image: uploadedImagesMultiple?.equipmentSurveyingBillsStep2
          .map((x) => x.data)
          .join(","),
        form_image: uploadedImagesMultiple?.VehicleFormsStep2.map(
          (x) => x.data
        ).join(","),
        machines_no_gps: formValues?.gpsDevices,
        machines_no_ts: formValues?.totalStationDevices,
        engineering_categories: null,
      },
      engineers_data: {
        main_engineers_model: registEmployees,
      },
      c_item: {
        undefined: [],
        eng_company_class_id: null,
        department_eng_comp: selectedStaffData,
        engineering_categories: null,
        main_category_selected: selectedStaffData,
        survey_department: true,
        machines_image: uploadedImagesMultiple?.equipmentSurveyingBillsStep2
          .map((x) => x.data)
          .join(","),
        form_image: uploadedImagesMultiple?.VehicleFormsStep2.map(
          (x) => x.data
        ).join(","),
        machines_no_gps: formValues?.gpsDevices,
        machines_no_ts: formValues?.totalStationDevices,
      },
      selected_class: null,
      selected_approve: null,
      selected_category: null,
    },
    licences: {
      office_info_licences: {
        image:
          uploadedImagesSingle?.MunLicenseImgStep3 !== undefined &&
          uploadedImagesSingle?.MunLicenseImgStep3[0] !== undefined
            ? uploadedImagesSingle?.MunLicenseImgStep3[0].data
            : "",
        license_no: formValues?.liceNum1,
        start_date:
          dates?.Step3releaseDate !== null
            ? moment(dates?.Step3releaseDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        end_date:
          dates?.Step3licFinishDate !== null
            ? moment(dates?.Step3licFinishDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        type: 1,
      },
      saudi_eng_license: {
        image:
          uploadedImagesSingle?.SaudiAuthLicenseImgStep2 !== undefined &&
          uploadedImagesSingle?.SaudiAuthLicenseImgStep2[0] !== undefined
            ? uploadedImagesSingle?.SaudiAuthLicenseImgStep2[0].data
            : "",
        license_no: formValues?.liceNum,
        start_date:
          dates?.Step2licereleaseDate !== null
            ? moment(dates?.Step2licereleaseDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        end_date:
          dates?.Step2licefinishDate !== null
            ? moment(dates?.Step2licefinishDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        type: 2,
      },
      insurance_license: {
        image:
          uploadedImagesSingle?.SocialInsurCertifStep3 !== undefined &&
          uploadedImagesSingle?.SocialInsurCertifStep3[0] !== undefined
            ? uploadedImagesSingle?.SocialInsurCertifStep3[0].data
            : "",
        print_image:
          uploadedImagesSingle?.SocialInsurPrintStep3 !== undefined &&
          uploadedImagesSingle?.SocialInsurPrintStep3[0] !== undefined
            ? uploadedImagesSingle?.SocialInsurPrintStep3[0].data
            : "",
        license_no: formValues?.liceNum2,
        subscribe_no: formValues?.subscripNum,
        end_date:
          dates?.certifFinishDate !== null
            ? moment(dates?.certifFinishDate, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
        type: 3,
      },
    },

    summary: {
      eng_company_data: {
        another_items: uploadedImagesMultiple?.additionalFilesStep1,
        letter_reg:
          uploadedImagesSingle?.RegistRequestImgStep1 !== undefined &&
          uploadedImagesSingle?.RegistRequestImgStep1[0] != undefined
            ? uploadedImagesSingle?.RegistRequestImgStep1[0].data
            : "",
        approved_sak: 1,
        office_type_id: selectValues?.officeType,
        name: formValues?.officeName,
        ename: formValues?.engofficeName,
        "mobile-part": formValues?.mobile,
        mobile: "966" + formValues?.mobile,
        email: formValues?.email,
        old_office_id: formValues?.amanaOfficeRegNum,
        foundation_year: formValues?.foundation_year,
        commercial_registration_no: formValues?.commercial_registration_no,
        commercial_reg_end_date:
          dates?.commercial_reg_end_date !== null
            ? moment(dates?.commercial_reg_end_date, "iYYYY/iMM/iDD").format(
                "iDD/iMM/iYYYY"
              )
            : null,
      },
      office_info_licences: {
        saudi_mail_subscribe:
          uploadedImagesSingle?.SaudiPostSubscImgStep1 !== undefined &&
          uploadedImagesSingle?.SaudiPostSubscImgStep1[0] !== undefined
            ? uploadedImagesSingle?.SaudiPostSubscImgStep1[0].data
            : "",
        address: formValues?.address,
        phone: formValues?.phone,
        fax: formValues?.fax,
        mail_box: formValues?.mail_box,
        postal_code: formValues?.postal_code,
        city: formValues?.city,
        street: formValues?.street,
        building: formValues?.building,
        floor: formValues?.floor,
        appart: formValues?.appart,
        eng_comp_location: {
          position: [26.415913620856266, 50.07957456678446],
          address: "المنطقة الشرقية السعودية",
        },
        ycoord: 26.415913620856266,
        xcoord: 50.07957456678446,
      },
    },
    comments: {
      eng_company_data0: [{}],
      office_info_licences0: [{}],
      insurance_license1: [{}],
      engineers0: [{}],
    },
  };

  if (type == "create") {
    officeData.account_data = {
      username: formValues?.username,
      password: formValues?.password,
      confirmPass: formValues?.confirmNewPassword,
    };
  }

  if (type == "edit") {
    officeData.rejections = officeRejections.rejections;
  }
  return officeData;
};
