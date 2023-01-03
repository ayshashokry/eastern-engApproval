import moment from "moment-hijri";
import { v4 as uuid } from "uuid";

export const SetFormData = (
  formData,
  Step1FormRef,
  formValues,
  setFormValues,
  selectValues,
  setSelectValues,
  dates,
  setDates,
  uploadedImagesSingle,
  setUploadedImagesSingle,
  uploadedImagesMultiple,
  setuploadedImagesMultiple,
  Step2FormRef,
  Step3FormRef,
  setStaffData,
  Step4FormRef,
  setselectedOCategories,
  setSelectedEmployees,
  Step2EditFormRef,
  setPledge,
  setOfficeRejections
) => {
  const RegistRequestImgStep1swap = [];
  if (formData?.office_data?.eng_company_data?.letter_reg !== "") {
    RegistRequestImgStep1swap.push({
      data: formData?.office_data?.eng_company_data?.letter_reg,
      thumbUrl:
        (formData?.office_data?.eng_company_data?.letter_reg.includes(
          "GISAPI"
        ) ||
        formData?.office_data?.eng_company_data?.letter_reg.includes("gisAPI")
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.office_data?.eng_company_data?.letter_reg,
    });
  }
  const SaudiAuthLicenseImgStep2swap = [];
  if (formData?.specialization_data?.saudi_eng_license?.image !== "") {
    SaudiAuthLicenseImgStep2swap.push({
      data: formData?.specialization_data?.saudi_eng_license?.image,
      thumbUrl:
        (formData?.specialization_data?.saudi_eng_license?.image?.includes(
          "GISAPI"
        ) ||
        formData?.specialization_data?.saudi_eng_license?.image.includes(
          "gisAPI"
        )
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.specialization_data?.saudi_eng_license?.image,
    });
  }

  const SaudiPostSubscImgStep1swap = [];
  if (
    formData?.office_data?.office_info_licences?.saudi_mail_subscribe !== ""
  ) {
    SaudiPostSubscImgStep1swap.push({
      data: formData?.office_data?.office_info_licences?.saudi_mail_subscribe,
      thumbUrl:
        (formData?.office_data?.office_info_licences?.saudi_mail_subscribe?.includes(
          "GISAPI"
        ) ||
        formData?.office_data?.office_info_licences?.saudi_mail_subscribe.includes(
          "gisAPI"
        )
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.office_data?.office_info_licences?.saudi_mail_subscribe,
    });
  }

  const SocialInsurPrintStep3swap = [];
  if (formData?.licences?.insurance_license?.print_image !== "") {
    SocialInsurPrintStep3swap.push({
      data: formData?.licences?.insurance_license?.print_image,
      thumbUrl:
        (formData?.licences?.insurance_license?.print_image?.includes(
          "GISAPI"
        ) ||
        formData?.licences?.insurance_license?.print_image.includes("gisAPI")
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.licences?.insurance_license?.print_image,
    });
  }
  const SocialInsurCertifStep3swap = [];

  if (formData?.licences?.insurance_license?.image !== "") {
    SocialInsurCertifStep3swap.push({
      data: formData?.licences?.insurance_license?.image,
      thumbUrl:
        (formData?.licences?.insurance_license?.image?.includes("GISAPI") ||
        formData?.licences?.insurance_license?.image.includes("gisAPI")
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.licences?.insurance_license?.image,
    });
  }

  const MunLicenseImgStep3swap = [];

  if (formData?.licences?.office_info_licences?.image !== "") {
    MunLicenseImgStep3swap.push({
      data: formData?.licences?.office_info_licences?.image,
      thumbUrl:
        (formData?.licences?.office_info_licences?.image?.includes("GISAPI") ||
        formData?.licences?.office_info_licences?.image.includes("gisAPI")
          ? window.hostURL
          : window.filesURL) +
        "/" +
        formData?.licences?.office_info_licences?.image,
    });
  }
  const VehicleFormsStep2swap = [];
  if (formData?.specialization_data?.approved_dep?.form_image !== "") {
    const sepratedVechList = Array.isArray(
      formData?.specialization_data?.approved_dep?.form_image
    )
      ? formData?.specialization_data?.approved_dep?.form_image
      : formData?.specialization_data?.approved_dep?.form_image?.split(",");
    sepratedVechList?.length > 0 &&
      sepratedVechList?.map((s) =>
        VehicleFormsStep2swap.push({
          data: Array.isArray(
            formData?.specialization_data?.approved_dep?.form_image
          )
            ? s.data
            : s,
          thumbUrl: Array.isArray(
            formData?.specialization_data?.approved_dep?.form_image
          )
            ? (s.data?.includes("GISAPI") || s.data?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s.data
            : (s?.includes("GISAPI") || s?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s,
        })
      );
  }
  const equipmentSurveyingBillsStep2swap = [];

  if (formData?.specialization_data?.approved_dep?.machines_image !== "") {
    const sepratedVechList = Array.isArray(
      formData?.specialization_data?.approved_dep?.machines_image
    )
      ? formData?.specialization_data?.approved_dep?.machines_image
      : formData?.specialization_data?.approved_dep?.machines_image?.split(",");
    sepratedVechList?.length > 0 &&
      sepratedVechList?.map((s) =>
        equipmentSurveyingBillsStep2swap.push({
          data: Array.isArray(
            formData?.specialization_data?.approved_dep?.machines_image
          )
            ? s.data
            : s,
          thumbUrl: Array.isArray(
            formData?.specialization_data?.approved_dep?.machines_image
          )
            ? (s.data?.includes("GISAPI") || s.data?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s.data
            : (s?.includes("GISAPI") || s?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s,
        })
      );
  }

  const additionalImages = [];

  if (formData?.office_data?.eng_company_data?.another_items !== "") {
    const anotheImages = Array.isArray(
      formData?.office_data?.eng_company_data?.another_items
    )
      ? formData?.office_data?.eng_company_data?.another_items
      : formData?.office_data?.eng_company_data?.another_items?.split(",");
    anotheImages?.length > 0 &&
      anotheImages?.map((s) =>
        additionalImages.push({
          data: Array.isArray(
            formData?.office_data?.eng_company_data?.another_items
          )
            ? s.data
            : s,
          thumbUrl: Array.isArray(
            formData?.office_data?.eng_company_data?.another_items
          )
            ? (s.data?.includes("GISAPI") || s.data?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s.data
            : (s?.includes("GISAPI") || s?.includes("gisAPI")
                ? window.hostURL
                : window.filesURL) +
              "/" +
              s,
        })
      );
  }

  let commercial_reg_end_date =
    formData?.office_data?.eng_company_data?.commercial_reg_end_date !== null
      ? moment(
          formData?.office_data?.eng_company_data?.commercial_reg_end_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  let saudiStartDate =
    formData?.specialization_data?.saudi_eng_license?.start_date !== null
      ? moment(
          formData?.specialization_data?.saudi_eng_license?.start_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  let saudiEndDate =
    formData?.specialization_data?.saudi_eng_license?.end_date !== null
      ? moment(
          formData?.specialization_data?.saudi_eng_license?.end_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  let Step3releaseDate =
    formData?.licences?.office_info_licences?.start_date !== null
      ? moment(
          formData?.licences?.office_info_licences?.start_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  let Step3licFinishDate =
    formData?.licences?.office_info_licences?.end_date !== null
      ? moment(
          formData?.licences?.office_info_licences?.end_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  let certifFinishDate =
    formData.licences.insurance_license.end_date !== null
      ? moment(
          formData.licences.insurance_license.end_date,
          "iDD/iMM/iYYYY"
        ).format("iYYYY/iMM/iDD")
      : null;
  setPledge(true);
  Step1FormRef.current !== null &&
    Step1FormRef.current.setFieldsValue({
      pledge: true,
      officeType: formData?.office_data?.eng_company_data?.office_type_id?.name,
      officeName: formData.office_data.eng_company_data.name,
      engofficeName: formData.office_data.eng_company_data.ename,
      mobile: formData.office_data.eng_company_data["mobile-part"],
      email: formData.office_data.eng_company_data.email,
      amanaOfficeRegNum:
        formData.office_data.eng_company_data.office_id !== null &&
        formData.office_data.eng_company_data.office_id !== "" &&
        formData.office_data.eng_company_data.office_id !== undefined
          ? formData.office_data.eng_company_data.office_id
          : JSON.parse(localStorage.getItem("user"))?.engineering_companies
              ?.office_id,
      foundation_year: formData.office_data.eng_company_data.foundation_year,
      commercial_registration_no:
        formData.office_data.eng_company_data.commercial_registration_no,
      commercial_reg_end_date: commercial_reg_end_date,
      RegistRequestImgStep1: RegistRequestImgStep1swap,
      SaudiPostSubscImgStep1: SaudiPostSubscImgStep1swap,
      address: formData.office_data.office_info_licences.address,
      phone: formData.office_data.office_info_licences.phone,
      fax: formData.office_data.office_info_licences.fax,
      postal_code: formData.office_data.office_info_licences.postal_code,
      mail_box: formData.office_data.office_info_licences.mail_box,
      city: formData.office_data.office_info_licences.city,
      appart: formData.office_data.office_info_licences.appart,
      floor: formData.office_data.office_info_licences.floor,
      street: formData.office_data.office_info_licences.street,
      building: formData.office_data.office_info_licences.building,
      additionalFilesStep1:
        formData?.office_data?.eng_company_data?.another_items || [],
    });

  Step2FormRef.current !== null &&
    Step2FormRef.current.setFieldsValue({
      liceNum: formData.specialization_data.saudi_eng_license.license_no,
      SaudiAuthLicenseImgStep2: SaudiAuthLicenseImgStep2swap,
      // VehicleFormsStep2:
      //   formData?.specialization_data?.approved_dep?.form_image,
      equipmentSurveyingBillsStep2: equipmentSurveyingBillsStep2swap || [],
      gpsDevices: formData?.specialization_data?.approved_dep?.machines_no_gps,
      totalStationDevices:
        formData?.specialization_data?.approved_dep?.machines_no_ts,
    });
  Step3FormRef.current !== null &&
    Step3FormRef.current.setFieldsValue({
      liceNum1: formData?.licences?.office_info_licences?.license_no,
      liceNum2: formData?.licences?.insurance_license?.license_no,
      subscripNum: formData.licences.insurance_license.subscribe_no,
      Step3releaseDate: Step3releaseDate,
      Step3licFinishDate: Step3licFinishDate,
      MunLicenseImgStep3: MunLicenseImgStep3swap,
      certifFinishDate: certifFinishDate,
      SocialInsurCertifStep3: SocialInsurCertifStep3swap,
      SocialInsurPrintStep3: SocialInsurPrintStep3swap,
    });

  Step4FormRef.current !== null &&
    Step4FormRef.current.setFieldsValue({
      username: formData?.account_data?.username,
      password: formData?.account_data?.password,
      confirmNewPassword: formData?.account_data?.confirmPass,
    });
  setFormValues({
    ...formValues,
    officeName: formData.office_data.eng_company_data.name,
    engofficeName: formData.office_data.eng_company_data.ename,
    mobile: formData.office_data.eng_company_data["mobile-part"],
    email: formData.office_data.eng_company_data.email,
    amanaOfficeRegNum:
      formData.office_data.eng_company_data.office_id !== null &&
      formData.office_data.eng_company_data.office_id !== "" &&
      formData.office_data.eng_company_data.office_id !== undefined
        ? formData.office_data.eng_company_data.office_id
        : JSON.parse(localStorage.getItem("user"))?.engineering_companies
            ?.office_id,
    foundation_year: formData.office_data.eng_company_data.foundation_year,
    commercial_registration_no:
      formData.office_data.eng_company_data.commercial_registration_no,
    address: formData.office_data.office_info_licences.address,
    phone: formData.office_data.office_info_licences.phone,
    fax: formData.office_data.office_info_licences.fax,
    postal_code: formData.office_data.office_info_licences.postal_code,
    mail_box: formData.office_data.office_info_licences.mail_box,
    city: formData.office_data.office_info_licences.city,
    appart: formData.office_data.office_info_licences.appart,
    floor: formData.office_data.office_info_licences.floor,
    street: formData.office_data.office_info_licences.street,
    building: formData.office_data.office_info_licences.building,
    liceNum: formData.specialization_data.saudi_eng_license.license_no,
    gpsDevices: formData?.specialization_data?.approved_dep?.machines_no_gps,
    totalStationDevices:
      formData?.specialization_data?.approved_dep?.machines_no_ts,
    liceNum1: formData?.licences?.office_info_licences?.license_no,
    liceNum2: formData?.licences?.insurance_license?.license_no,
    subscripNum: formData.licences.insurance_license.subscribe_no,
    username: formData?.account_data?.username,
    password: formData?.account_data?.password,
    confirmNewPassword: formData?.account_data?.confirmPass,
  });

  setSelectValues({
    ...selectValues,
    officeType: formData?.office_data?.eng_company_data?.office_type_id,
  });

  setDates({
    ...dates,
    commercial_reg_end_date: commercial_reg_end_date,
    Step2licereleaseDate: saudiStartDate,
    Step2licefinishDate: saudiEndDate,
    Step3licFinishDate: Step3licFinishDate,
    certifFinishDate: certifFinishDate,
    Step3releaseDate: Step3releaseDate,
  });
  setUploadedImagesSingle({
    ...uploadedImagesSingle,
    RegistRequestImgStep1: RegistRequestImgStep1swap,
    SaudiPostSubscImgStep1: SaudiPostSubscImgStep1swap,
    SaudiAuthLicenseImgStep2: SaudiAuthLicenseImgStep2swap,
    MunLicenseImgStep3: MunLicenseImgStep3swap,
    SocialInsurCertifStep3: SocialInsurCertifStep3swap,
    SocialInsurPrintStep3: SocialInsurPrintStep3swap,
  });

  setuploadedImagesMultiple({
    ...uploadedImagesMultiple,
    additionalFilesStep1: additionalImages || [],
    VehicleFormsStep2: VehicleFormsStep2swap,
    equipmentSurveyingBillsStep2: equipmentSurveyingBillsStep2swap || [],
  });

  setStaffData(formData?.specialization_data.approved_dep.department_eng_comp);
  let selectedCategoriesSwap = [];
  formData?.specialization_data.approved_dep.department_eng_comp.map((f) =>
    selectedCategoriesSwap.push({
      department_id: f.approve !== undefined ? f.approve?.id : f.id,
      eng_comp_class_id: f.class !== undefined ? f.class.id : 5,
      eng_comp_category_id:
        f.category !== undefined && f.category !== null ? f.category.id : null,
    })
  );
  let swapedEmployees = [];
  formData?.specialization_data?.engineers_data?.main_engineers_model?.map(
    (e) => {
      if (e !== undefined) {
        Step2EditFormRef.current !== null &&
          Step2EditFormRef.current.setFieldsValue({
            empProfLevel: e.position_id !== undefined ? e.position_id.name : "",
            employeeSpecialty: e.category_id?.name,
            employeeJob: e.emp_type_id?.name,
            nationality: e.nationality_id?.local_name,
            idType: e.nationalidtype_id?.name,
          });
        e = {
          id: e.id == undefined ? e.emp_type_id?.id : e.id,
          mandatory: e.mandatory !== undefined ? e.mandatory : 0,
          category: e.category_id !== undefined ? e.category_id : {},
          employee: {
            employeesValues: {
              name: e.name,
              IdNumber: e.ssn,
              idSide: e.ssn_issue_name || e.issue_name,
              highAcademicQualif: e.university,
              graduiationYear: e.graduation_year,
              certificateNumber: e.consultant_member_no,
            },

            selectEmployeeValues: {
              idTypeObject: e.nationalidtype_id,
              nationalityObject: e.nationality_id,
              empProfLevelObject:
                e.position_id !== undefined ? e.position_id : {},
              employeeSpecialtyObject: e.category_id,
              employeeJobObject: e.emp_type_id,
              idType: e.nationalidtype_id?.name,
              nationality: e.nationality_id?.local_name,
              empProfLevel: e.position_id?.name,
              employeeJob: e.emp_type_id?.name,
              employeeSpecialty: e.category_id?.name,
            },
            employeeDates: {
              IDFinishDate: moment(
                e.ssn_end_date || e.issue_date,
                "iDD/iMM/iYYYY"
              ).format("iYYYY/iMM/iDD"),
              certificateReleaseDate: e.consultant_start
                ? moment(e.consultant_start, "iDD/iMM/iYYYY").format(
                    "iYYYY/iMM/iDD"
                  )
                : null,
              certificateFinishDate: e.consultant_end
                ? moment(e.consultant_end, "iDD/iMM/iYYYY").format(
                    "iYYYY/iMM/iDD"
                  )
                : null,
            },

            employeeChecks: {
              officeOwner:
                e.is_eng_comp_owner == 0 || e.is_eng_comp_owner == undefined
                  ? false
                  : true,
              manager:
                e.is_responsible == 0 || e.is_responsible == undefined
                  ? false
                  : true,
              EmployeeMeetConditions: true,
            },

            images:
              e.ssn_image !== undefined ||
              e.cv_file !== undefined ||
              e.saudi_reg !== undefined ||
              e.certification_iamge !== undefined
                ? [
                    {
                      name: "IDImgEmpModal",
                      value:
                        e.ssn_image !== undefined
                          ? [
                              {
                                data: e.ssn_image,
                                thumbUrl:
                                  (e.ssn_image?.includes("GISAPI") ||
                                  e.ssn_image?.includes("gisAPI")
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  e.ssn_image,
                              },
                            ]
                          : undefined,
                    },
                    {
                      name: "specialityCertificateImgEmpModal",
                      value:
                        e.certification_iamge !== undefined
                          ? [
                              {
                                data: e.certification_iamge,
                                thumbUrl:
                                  (e.certification_iamge?.includes("GISAPI") ||
                                  e.certification_iamge?.includes("gisAPI")
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  e.certification_iamge,
                              },
                            ]
                          : undefined,
                    },
                    {
                      name: "CvFileEmpModal",
                      value:
                        e.cv_file !== undefined
                          ? [
                              {
                                data: e.cv_file,
                                thumbUrl:
                                  (e.cv_file?.includes("GISAPI") ||
                                  e.cv_file?.includes("gisAPI")
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  e.cv_file,
                              },
                            ]
                          : undefined,
                    },
                    {
                      name: "certificateFileEmpModal",
                      value: e.saudi_reg
                        ? [
                            {
                              data: e.saudi_reg,
                              thumbUrl:
                                (e.saudi_reg?.includes("GISAPI") ||
                                e.saudi_reg?.includes("gisAPI")
                                  ? window.hostURL
                                  : window.filesURL) +
                                "/" +
                                e.saudi_reg,
                            },
                          ]
                        : undefined,
                    },
                  ]
                : null,
          },
        };
        e.UniqueId = uuid();

        swapedEmployees.push(e);
      }
    }
  );
  setSelectedEmployees(swapedEmployees);
  if (formData.rejections) {
    setOfficeRejections(formData.rejections);
  }
  setselectedOCategories(selectedCategoriesSwap);
};
