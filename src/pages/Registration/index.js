import React, { useState, useEffect, useRef, memo } from "react";
import { notification } from "antd";

import Loader from "../../containers/Loader";
import moment from "moment-hijri";
import axios from "axios";
import StaffData from "../../data/EmployeesData.json";
import { v4 as uuid } from "uuid";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";
import {
  getAllJobs,
  getEmployeesSpecialities,
  getNationalitiesWithTypeID,
  getNationalityType,
  getOfficeTypes,
  getProfessioalLevels,
} from "../../apis/FetchApi";
import { registerOffice } from "./helpers/registerOffice";
import { saveEditedEmployeeData } from "./helpers/saveEditedEmployeeData";
import StepsContainer from "./steps/StepsContainer";
import { getOfficeDataToEdit } from "./helpers/getOfficeDataToEdit";
import { SetFormData } from "./helpers/SetFormData";
import { mappingDataToOneObj } from "./helpers/mappingDataToOneObj";

function RegistrationPage(props) {
  //Handle Loader

  const [officeRejections, setOfficeRejections] = useState([]);

  const [nationalities, setTypeIdNationalities] = useState([]);

  const [loading, setLoader] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [IDTypes, setIDTypes] = useState([]);
  const [professionaLevels, setProfessionaLevels] = useState([]);
  const [employeeSpecialities, setemployeeSpecialities] = useState([]);
  //CheckBox //Step 1
  const [pledge, setPledge] = useState(false);
  const checkOKGeneralChecks = (e) => {
    setPledge(e.target.checked);
  };
  //Employee Modal Files
  const [empModalFiles] = useState([
    { label: "صورة الهوية", files: [], id: "0", name: "IDImgEmpModal" },
    {
      label: "صورة  شهادة التخصص",
      files: [],
      id: "1",
      name: "specialityCertificateImgEmpModal",
    },
    {
      label: "السيرة الذاتية",
      files: [],
      id: "2",
      name: "CvFileEmpModal",
    },
    {
      label: "   شهادة الإعتماد المهني (الهندسي)",
      id: "3",
      name: "certificateFileEmpModal",
    },
  ]);
  //Select value //Step1
  const [selectValues, setSelectValues] = useState({
    //Step 1
    officeType: {},
    //Step 2
    category: {},
    specialty: {},
    department: {},
  });
  const Step1FormRef = useRef(null);
  const Step2FormRef = useRef(null);
  const Step3FormRef = useRef(null);
  const Step4FormRef = useRef(null);

  const Step2EditFormRef = useRef(null);
  const Step2AddFormRef = useRef(null);

  const handleSelect = (name) => (value, e) => {
    if (name === "category" && e.id !== 2) {
      setSelectValues({
        ...selectValues,
        specialty: null,
        department: null,
      });
      Step2FormRef.current !== null &&
        Step2FormRef.current.setFieldsValue({
          specialty: null,
          department: null,
        });
    }
    if (name === "category" && e.id === 2) {
      setSelectValues({
        ...selectValues,
        specialty:
          e.obj.engineering_categories !== undefined &&
          e.obj.engineering_categories[0],
        department: null,
      });
      Step2FormRef.current.setFieldsValue({
        specialty:
          e.obj.engineering_categories !== undefined &&
          e.obj.engineering_categories[0].name,
        department: null,
      });
    }
    setSelectValues({ ...selectValues, [name]: e.obj });
  };
  let reqAtt = [];
  //Handle Inputs
  const [formValues, setFormValues] = useState({
    //Step 1
    officeName: "",
    engofficeName: "",
    mobile: "",
    email: "",
    amanaOfficeRegNum: "",
    foundation_year: "",
    commercial_registration_no: "",
    address: "",
    phone: "",
    fax: "",
    mail_box: "",
    postal_code: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    appart: "",

    //Step 2
    liceNum: "",
    gpsDevices: "",
    totalStationDevices: "",

    //Step 3
    liceNum1: "",
    liceNum2: "",
    subscripNum: "",

    //Step 4
    username: "",
    password: "",
    confirmNewPassword: "",
  });

  const captchaRef = useRef(null);

  const [captchaToken, setCaptchaToken] = useState(null);

  const verifyCapatcha = () => {
    captchaRef.current.getResponse().then((res) => {
      setCaptchaToken(res);
    });
  };
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
  };
  const formObject = JSON.parse(localStorage.getItem("formObject")) || {};

  const [officeTypes, setOfficeTypes] = useState([]);
  //Upload Single Images
  const [uploadedImagesSingle, setUploadedImagesSingle] = useState({
    //Modal files
    specialityCertificateImgEmpModal: [],
    IDImgEmpModal: [],
    CvFileEmpModal: [],
    certificateFileEmpModal: [],
    RegistRequestImgStep1: [],
    SaudiPostSubscImgStep1: [],
    SaudiAuthLicenseImgStep2: [],
    MunLicenseImgStep3: [],
    SocialInsurCertifStep3: [],
    SocialInsurPrintStep3: [],
  });
  const SetSingleFileUpload = (name) => async (e) => {
    const args = {
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("file", e?.file);

    if (
      (e?.file !== undefined &&
        e?.file.name !== undefined &&
        ["pdf", "PDF", "png", "PNG", "jpeg", "JPEG", "JPG", "jpg"].includes(
          e?.file.name.split(".").pop()
        ) &&
        name !== "CvFileEmpModal") ||
      (e?.file !== undefined &&
        e?.file.name !== undefined &&
        ["pdf", "PDF", "docx", "DOCX", "DOC", "doc"].includes(
          e?.file.name.split(".").pop()
        ) &&
        name === "CvFileEmpModal")
    ) {
      try {
        setLoader(true);
        await axios
          .post(window.ApiUrl + "/uploadMultifiles", fmData, config)
          .then((res) => {
            if (res.data.length === 0) {
              args.description =
                "هذا الملف فارغ .. برجاء التأكد من الملف ثم أعد المحاولة";
              notification.open(args);
              setUploadedImagesSingle({
                ...uploadedImagesSingle,
                [name]: [],
              });
            } else {
              res.data[0].thumbUrl =
                res.data[0].data !== undefined
                  ? window.filesURL + "/" + res.data[0].data
                  : undefined;

              setUploadedImagesSingle({
                ...uploadedImagesSingle,
                [name]: res.data,
              });
            }

            setLoader(false);
          });
      } catch (err) {
        setLoader(false);
      }
    } else if (
      (e?.file !== undefined &&
        e?.file.name !== undefined &&
        !["pdf", "PDF", "png", "PNG", "jpeg", "JPEG", "JPG", "jpg"].includes(
          e?.file.name.split(".").pop()
        ) &&
        name !== "CvFileEmpModal") ||
      (e?.file !== undefined &&
        e?.file.name !== undefined &&
        !["pdf", "PDF", "docx", "DOCX", "DOC", "doc"].includes(
          e.file.name.split(".").pop()
        ) &&
        name == "CvFileEmpModal")
    ) {
      args.description = "هذا الملف غير مدرج من ضمن الملفات المسموح باختيارها";
      notification.open(args);
    }
  };
  const DeleteSingleImage = (name) => (e) => {
    setUploadedImagesSingle({
      ...uploadedImagesSingle,
      [name]: [],
    });
  };

  //Upload Multiple Images
  const [uploadedImagesMultiple, setuploadedImagesMultiple] = useState({
    additionalFilesStep1: [],
    equipmentSurveyingBillsStep2: [],
    VehicleFormsStep2: [],
  });

  const SetMultipleFilesUpload = (name) => async (e) => {
    const args = {
      description: "هذا الملف غير مدرج من ضمن الملفات المسموح باختيارها",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    if (e.fileList !== undefined && e.fileList.length > 0) {
      const fmData = new FormData();
      e.fileList.map((f, index) =>
        fmData.append(`file[${index}]`, f.originFileObj)
      );
      if (
        ["pdf", "PDF", "png", "PNG", "jpeg", "JPEG", "JPG", "jpg"].includes(
          e.file.name.split(".").pop()
        )
      ) {
        setLoader(true);

        await axios
          .post(window.ApiUrl + "/uploadMultifiles", fmData, config)
          .then((res) => {
            if (res.data.length > 0) {
              reqAtt.push(
                ...res.data.map((f) => {
                  f.thumbUrl =
                    f.data !== undefined
                      ? window.filesURL + "/" + f.data
                      : undefined;
                  Object.assign({}, f);
                })
              );
            }
            setuploadedImagesMultiple({
              ...uploadedImagesMultiple,
              [name]: [...uploadedImagesMultiple[name], ...res.data],
            });
            setLoader(false);
          })

          .catch((err) => {
            setLoader(false);
          });
      } else {
        notification.open(args);
      }
    }
  };

  const DeleteMultipleImages = (name, file) => (e) => {
    setuploadedImagesMultiple({
      ...uploadedImagesMultiple,
      [name]: uploadedImagesMultiple[name].filter((f) => f !== file),
    });
    setLoader(false);
  };

  //Handle Dates
  const [dates, setDates] = useState({
    commercial_reg_end_date: null,
    Step2licereleaseDate: null,
    Step2licefinishDate: null,
    Step3releaseDate: null,
    Step3licFinishDate: null,
    certifFinishDate: null,
  });

  const onSelectDate = (name) => (value) => {
    setDates({
      ...dates,
      [name]: moment(new Date(value)).format("iYYYY/iMM/iDD"),
    });
  };
  const [steps, setSteps] = useState([
    {
      id: 0,
      finish: props?.type == "create" ? "" : "finish",
      title: "بيانات المكتب الهندسي",
    },
    {
      id: 1,
      finish: props.type == "create" ? "" : "finish",
      title: "بيانات تخصص المكتب والكادر",
    },
    {
      id: 2,
      finish: props.type == "create" ? "" : "finish",

      title: "تراخيص المكتب",
    },

    {
      id: 3,
      finish: props.type == "create" ? "" : "finish",
      title: "الملخص",
    },
    {
      id: 4,
      finish: props.type == "create" ? "" : "finish",
      title: "بيانات الحساب",
    },
  ]);

  const [showConfirmModal, setConfirmModal] = useState(false);
  const openConfirmModal = () => {
    setConfirmModal(!showConfirmModal);
  };
  //Handle Step
  const newdata = steps.slice();
  const [currentStep, gotoStep] = useState(0);
  const nextStep = () => {
    gotoStep(currentStep + 1);

    newdata[currentStep].finish = "finish";
    setSteps(newdata);
  };
  const prevStep = () => {
    gotoStep(currentStep - 1);
  };
  const gotoStepWithTitle = (id) => {
    gotoStep(id);
  };
  const [selectedCategories, setselectedOCategories] = useState([]);
  //GET JOBS depends on selects Step 2
  const [selectedStaffData, setStaffData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  //Edit Employees data step 2
  //Add Staff
  const addStaff = () => {
    let filtiredStaff = StaffData.filter(
      (job) =>
        job.class.id === selectValues.category.id &&
        (job.category.id === selectValues.specialty.id ||
          job.category.id === null) &&
        job.approve.id === selectValues.department.id
    );

    let selectedStaffSwap = [];
    let selectedEmployeesSwap = [];
    const args = {
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    if (filtiredStaff.length === 0) {
      args.description = "من فضلك تأكد من المدخلات";
      notification.open(args);
    }

    if (
      selectedStaffData.find(function (val) {
        return (
          val.approve !== undefined &&
          val.approve.id === selectValues.department.id &&
          val.class.id === selectValues.category.id
        );
      }) !== undefined
    ) {
      args.description = "من فضلك تأكد من عدم تكرار المدخلات";
      notification.open(args);
    }

    if (
      selectedStaffData.find(function (val) {
        return (
          val.approve !== undefined &&
          val.approve.id === selectValues.department.id
        );
      }) !== undefined
    ) {
      args.description = "من فضلك تأكد من عدم تكرار الادارة";
      notification.open(args);
    }
    //     //if selected Staff has data
    if (
      selectedStaffData.find(function (val) {
        return (
          (val.approve !== undefined &&
            val.approve.id === selectValues.department.id &&
            (val.category.id === selectValues.specialty.id ||
              val.category.id === null) &&
            val.class.id === selectValues.category.id) ||
          (val.approve !== undefined &&
            val.approve.id === selectValues.department.id)
        );
      }) === undefined
    ) {
      selectedEmployeesSwap.push(
        selectedStaffData.length > 0 &&
          selectedStaffData.map((s) => s.employees).flat(1),
        filtiredStaff[0]?.employees
      );
      selectedStaffSwap.push(...selectedStaffData, ...filtiredStaff);

      setStaffData(selectedStaffSwap);
      setSelectedEmployees(selectedEmployeesSwap.flat(1));
      let selectedCategorySwap = {};
      selectedCategorySwap["department_id"] = Object.assign(
        {},
        selectValues.department
      ).id;
      selectedCategorySwap["eng_comp_class_id"] = Object.assign(
        {},
        selectValues.category
      ).id;
      selectedCategorySwap["eng_comp_category_id"] =
        Object.assign({}, selectValues.category)?.engineering_categories
          ?.length > 1
          ? null
          : Object.assign({}, selectValues.category)?.engineering_categories !==
              undefined &&
            Object.assign({}, selectValues.category)?.engineering_categories[0]
              .id;

      let selectedCategoriesSwap = selectedCategories;
      selectedCategoriesSwap.push(selectedCategorySwap);

      selectedCategorySwap = Object.values(selectedCategorySwap).filter(
        (c, index) =>
          index ===
          Object.values(selectedCategorySwap).findIndex(
            (other) =>
              c !== null &&
              other !== null &&
              c !== undefined &&
              other !== undefined &&
              c?.id === other?.id &&
              c.approve === other.approve
          )
      );
      setselectedOCategories(selectedCategoriesSwap);
    }
  };
  //delete Selected Staff From Table step 2
  const deleteSelectedStaffFromTable = (e) => () => {
    var filtered = selectedStaffData.filter(function (value, index, arr) {
      return index !== selectedStaffData.indexOf(e);
    });

    var filteredEmployees = selectedEmployees.filter(
      (emp) =>
        filtered.find((f) => f.approve.id == emp?.approveId) ||
        emp?.approveId == undefined
    );
    setStaffData(filtered);
    setSelectedEmployees(filteredEmployees);
    const filteredselectedCategories = selectedCategories.filter((el) =>
      filtered.find(
        (f) => f.approve?.id === el.approve?.id && f.class?.id === el.class.id
      )
    );
    setselectedOCategories(filteredselectedCategories);
  };

  const [employeesValues, setemployeesValues] = useState({
    name: "",
    IdNumber: "",
    idSide: "",
    highAcademicQualif: "",
    graduiationYear: "",
    certificateNumber: "",
  });

  const handleEmployeesInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setemployeesValues({ ...employeesValues, [name]: value });
  };
  //Select emloyees value //Step2
  const [selectEmployeeValues, setSelectEmployeeValues] = useState({
    idType: undefined,
    idTypeObject: {},
    nationality: undefined,
    nationalityObject: {},
    empProfLevel: undefined,
    empProfLevelObject: {},
    employeeJob: undefined,
    employeeJobObject: {},
    employeeSpecialty: undefined,
    employeeSpecialtyObject: {},
  });
  const setEmployeeSpecialityByDefault = (Specialitydata) => {
    setSelectEmployeeValues({
      ...selectEmployeeValues,
      employeeSpecialtyObject: Object.assign({}, Specialitydata.category),
      employeeSpecialty: Specialitydata.category?.name,
      employeeJobObject: jobs.filter((x) => x.id == Specialitydata.id)[0],
      employeeJob: jobs.filter((x) => x.id == Specialitydata.id)[0]?.name,
    });

    Step2EditFormRef.current !== null &&
      Step2EditFormRef.current.setFieldsValue({
        ...selectEmployeeValues,
        employeeSpecialty: Object.assign({}, Specialitydata.category)?.name,
        employeeJob: jobs.filter((x) => x.id == Specialitydata.id)[0]?.name,
      });
  };
  const handleEmployeeSelect = (name, objName) => (value, e) => {
    if (name == "idType") {
      //get nationalities
      getNationalitiesWithTypeID(e.id).then((res) => {
        setLoader(false);
        setTypeIdNationalities(res.data.results);
        setSelectEmployeeValues({
          ...selectEmployeeValues,
          idTypeObject: e.obj,
          idType: value,
          nationalityObject: e.id == 1890 ? res.data.results[0] : null,
          nationality: e.id == 1890 ? res.data.results[0].local_name : null,
        });
        Step2EditFormRef.current !== null &&
          Step2EditFormRef.current.setFieldsValue({
            nationality: e.id === 1890 ? res.data.results[0].local_name : null,
          });
        Step2AddFormRef.current !== null &&
          Step2AddFormRef.current.setFieldsValue({
            nationality: e.id === 1890 ? res.data.results[0].local_name : null,
          });
      });
    }

    setSelectEmployeeValues({
      ...selectEmployeeValues,
      [objName]: e.obj,
      [name]: value,
    });
  };

  //Handle Employee dates
  const [employeeDates, setEmployeeDates] = useState({
    IDFinishDate: null,
    certificateReleaseDate: null,
    certificateFinishDate: null,
  });
  const onSelectEmployeeDate = (name) => (value) => {
    setEmployeeDates({
      ...employeeDates,
      [name]: moment(new Date(value)).format("iYYYY/iMM/iDD"),
    });
  };

  //handle employee CheckBox
  const [employeeChecks, setemployeeChecks] = useState({
    officeOwner: false,
    manager: false,
    EmployeeMeetConditions: false,
  });
  const employeeCheckOk = (e) => {
    setemployeeChecks({
      ...employeeChecks,
      [e.target.name]: e.target.checked,
    });
  };
  //Open edit modal
  const [showEditModal, setshowEditModal] = useState(null);
  const openEditModal = (emp) => () => {
    if (
      emp.employee !== undefined &&
      emp.employee.selectEmployeeValues !== undefined
    ) {
      getNationalitiesWithTypeID(
        emp.employee?.selectEmployeeValues?.idTypeObject?.id
      ).then((res) => {
        setTypeIdNationalities(res.data.results);
      });
    }
    setshowEditModal(emp.UniqueId);
    let empSpecility =
      emp.mandatory == 1
        ? emp.category
        : emp.employee.selectEmployeeValues.employeeSpecialtyObject;

    let empJob =
      emp.employee !== undefined &&
      emp.employee.selectEmployeeValues.employeeJobObject;

    if (
      emp.employee !== undefined &&
      emp.employee.images !== undefined &&
      emp.employee !== null &&
      emp.employee.images !== null
    ) {
      setUploadedImagesSingle({
        ...uploadedImagesSingle,
        IDImgEmpModal:
          emp.employee !== undefined && emp.employee.images !== undefined
            ? emp.employee.images[0].value
            : [],
        specialityCertificateImgEmpModal:
          emp.employee !== undefined && emp.employee.images !== undefined
            ? emp.employee.images[1].value
            : [],
        CvFileEmpModal:
          emp.employee !== undefined && emp.employee.images !== undefined
            ? emp.employee.images[2].value
            : [],
        certificateFileEmpModal:
          emp.employee !== undefined &&
          emp.employee.images !== undefined &&
          emp.employee.images[3] !== undefined
            ? emp.employee.images[3].value
            : [],
      });
      setemployeeChecks({
        officeOwner: emp.employee.employeeChecks.officeOwner,
        manager: emp.employee.employeeChecks.manager,
        EmployeeMeetConditions:
          emp.employee.employeeChecks.EmployeeMeetConditions,
      });
      setemployeesValues({
        name: emp.employee.employeesValues.name,
        IdNumber: emp.employee.employeesValues.IdNumber,
        idSide: emp.employee.employeesValues.idSide,
        highAcademicQualif: emp.employee.employeesValues.highAcademicQualif,
        graduiationYear: emp.employee.employeesValues.graduiationYear,
        certificateNumber: emp.employee.employeesValues.certificateNumber,
      });

      setSelectEmployeeValues({
        idTypeObject: emp.employee.selectEmployeeValues.idTypeObject,
        nationalityObject:
          emp?.employee?.selectEmployeeValues?.nationalityObject,
        empProfLevelObject:
          emp?.employee?.selectEmployeeValues?.empProfLevelObject,
        employeeJobObject: empJob,
        employeeSpecialtyObject: empSpecility,
        idType: emp.employee.selectEmployeeValues.idType,
        nationality: emp?.employee?.selectEmployeeValues?.nationality,
        empProfLevel: emp?.employee?.selectEmployeeValues?.empProfLevel,
        employeeJob: empJob?.name,
        employeeSpecialty: empSpecility.name,
      });
      setEmployeeDates({
        IDFinishDate: emp.employee.employeeDates.IDFinishDate,
        certificateReleaseDate:
          emp.employee.employeeDates.certificateReleaseDate,
        certificateFinishDate: emp.employee.employeeDates.certificateFinishDate,
      });
    }
  };
  const closeEditModal = () => {
    setshowEditModal(null);
    setemployeeChecks({
      officeOwner: false,
      manager: false,
      EmployeeMeetConditions: false,
    });
    setSelectEmployeeValues((prevState) => ({
      ...prevState,
      idType: undefined,
      nationality: undefined,
      empProfLevel: undefined,
      idTypeObject: {},
      nationalityObject: {},
      empProfLevelObject: {},
    }));
    setTypeIdNationalities(null);
    setUploadedImagesSingle({
      ...uploadedImagesSingle,
      specialityCertificateImgEmpModal: [],
      IDImgEmpModal: [],
      CvFileEmpModal: [],
      certificateFileEmpModal: [],
    });
    Step2EditFormRef.current !== null &&
      Step2EditFormRef.current.setFieldsValue({
        empProfLevel: null,
      });
  };
  useEffect(() => {
    if (showEditModal === false) {
      setUploadedImagesSingle((prevState) => ({
        ...prevState,
        specialityCertificateImgEmpModal: [],
        IDImgEmpModal: [],
        CvFileEmpModal: [],
        certificateFileEmpModal: [],
      }));
      setSelectEmployeeValues((prevState) => ({
        ...prevState,
        idType: undefined,
        nationality: undefined,
        empProfLevel: undefined,
        idTypeObject: {},
        nationalityObject: {},
        empProfLevelObject: {},
      }));
    }
  }, [showEditModal]);
  useEffect(() => {
    if (selectValues.category.id === 2) {
      setSelectValues({
        ...selectValues,
        specialty: selectValues.category.engineering_categories[0],
      });
    }
  }, [selectValues.category]);
  const [checkedStaff, setCheckedStaff] = useState([]);

  useEffect(() => {
    if (
      selectedStaffData.find((x) =>
        x.approve !== undefined ? x.approve.id === 228 : x.id == 228
      ) == undefined
    ) {
      setFormValues({ ...formValues, totalStationDevices: "", gpsDevices: "" });
      setuploadedImagesMultiple({
        ...uploadedImagesMultiple,
        equipmentSurveyingBillsStep2: [],
        VehicleFormsStep2: [],
      });
    }

    if (props.type == "edit") {
      let CheckSt = selectedStaffData.filter((x) =>
        JSON.parse(
          localStorage.getItem("user")
        )?.engineering_companies?.department_eng_comp.some(
          (d) => d.department_id == x.approve?.id && d.is_approved == 2
        )
      );
      setCheckedStaff(CheckSt);
    }
  }, [selectedStaffData]);

  const onCheckStaff = (e) => {
    let checkedArray = checkedStaff;
    if (
      e.target.checked == true
      // checkedStaff.find((x) => x.approve?.id == e.target.id) == undefined
    ) {
      checkedArray.push(e.target.staff);
      setCheckedStaff(checkedArray);
    } else {
      checkedArray = checkedArray.filter((d) => d.approve?.id !== e.target.id);
      setCheckedStaff(checkedArray);
    }

    // setCheckedStaff(checkedArray);
  };
  console.log(checkedStaff);
  const saveEmployeeData = (empData) => () => {
    saveEditedEmployeeData(
      empData,
      selectedStaffData,
      uploadedImagesSingle,
      employeeChecks,
      employeeDates,
      employeesValues,
      selectEmployeeValues,
      selectedEmployees
    );
    closeEditModal();
  };

  //open Add Modal
  const [showAddModal, setshowAddModal] = useState(null);
  const openAddEmployeeModal = () => {
    setshowAddModal(true);
    setUploadedImagesSingle((prevState) => ({
      ...prevState,
      specialityCertificateImgEmpModal: [],
      IDImgEmpModal: [],
      CvFileEmpModal: [],
      certificateFileEmpModal: [],
    }));
  };
  const closeAddEmployeeModal = () => {
    setshowAddModal(false);
    setemployeeChecks({
      officeOwner: false,
      manager: false,
      EmployeeMeetConditions: false,
    });
    setSelectEmployeeValues((prevState) => ({
      ...prevState,
      idType: undefined,
      nationality: undefined,
      empProfLevel: undefined,
      idTypeObject: {},
      nationalityObject: {},
      empProfLevelObject: {},
    }));
    setUploadedImagesSingle({
      ...uploadedImagesSingle,
      specialityCertificateImgEmpModal: [],
      IDImgEmpModal: [],
      CvFileEmpModal: [],
      certificateFileEmpModal: [],
    });
  };
  const saveAddNewEmployee = () => {
    let uniqueIID = uuid();
    let newEmployee = {
      mandatory: 0,
      // count: 1,
      category: selectEmployeeValues.employeeSpecialty,
      engineer:
        selectEmployeeValues.employeeJob.id === 2032 ||
        selectEmployeeValues.employeeJob.id === 2033
          ? 0
          : 1,
      name: selectEmployeeValues.employeeJob.name,
      id: selectEmployeeValues.employeeJob.id,
      UniqueId: uniqueIID,
      surveyor: 0,
      employee: {
        employeesValues,
        selectEmployeeValues,
        employeeDates,
        employeeChecks,
        images: [
          {
            name: "IDImgEmpModal",
            value: uploadedImagesSingle.IDImgEmpModal,
          },
          {
            name: "specialityCertificateImgEmpModal",
            value: uploadedImagesSingle.specialityCertificateImgEmpModal,
          },
          {
            name: "CvFileEmpModal",
            value: uploadedImagesSingle.CvFileEmpModal,
          },
          {
            name: "certificateFileEmpModal",
            value: uploadedImagesSingle.certificateFileEmpModal,
          },
        ],
      },
    };
    let jobsSwap = selectedEmployees;
    jobsSwap.push(newEmployee);

    closeAddEmployeeModal();
  };
  const deleteEmployee = (e) => () => {
    var filtered = selectedEmployees.filter((f) => f?.id !== e?.id);
    setSelectedEmployees(filtered);
  };
  const onRegist = () => {
    const args = {
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    setLoader(true);
    let endPoint =
      props.type == "create"
        ? "engineercompany/register"
        : "EngineeringCompany/EditEngComp";
    registerOffice(
      props.type,
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
      editedCompanyData,
      checkedStaff
    )
      .then((res) => {
        setLoader(false);
        args.description =
          props.type == "create"
            ? "تم تسجيل المكتب بنجاح"
            : "تم تعديل المكتب بنجاح";
        args.className = "registSuccNotification";
        notification.open(args);
        if (props.type == "edit") {
          let userLocalStorage = JSON.parse(localStorage.getItem("user"));
          userLocalStorage.engineering_companies.department_eng_comp =
            selectedCategories;
          localStorage.setItem("user", JSON.stringify(userLocalStorage));
        }
        window.location.replace(window.hostTest + "/home");
      })
      .catch((error) => {
        setLoader(false);
        if (error && error.response && error.response.status === 302) {
          args.description = "هذا المكتب مسجل من قبل";
          notification.open(args);
        }
        if (error && error.response && error.response.status === 500) {
          args.description = "حدث خطأ , برجاء المحاولة لاحقا";
          notification.open(args);
        }
        if (error && error.response && error.response.status === 400) {
          if (error.response.data == "Captch Error") {
            gotoStep(3);
          } else {
            args.description = "برجاء التأكد من البيانات المدخلة";
            notification.open(args);
          }
        }
      });
  };
  {
    console.log(currentStep);
  }
  const [editedCompanyData, setEditedCompanyData] = useState({});
  useEffect(() => {
    let isMounted = true;
    //get officeTypes
    getOfficeTypes()
      .then((res) => {
        setLoader(false);
        setOfficeTypes(res.data.results);
      })
      // get ID Types
      .catch(() => setLoader(false));
    getNationalityType()
      .then((res) => {
        setLoader(false);
        setIDTypes(res.data.results);
      })
      .catch(() => setLoader(false));

    //get professional Level

    getProfessioalLevels()
      .then((res) => {
        setLoader(false);
        if (res?.data?.results !== undefined) {
          setProfessionaLevels(res.data.results);
        }
      })
      .catch(() => setLoader(false));

    //get All jobs Specialities
    getEmployeesSpecialities()
      .then((res) => {
        setLoader(false);
        setemployeeSpecialities(res.data.results);
      })
      .catch(() => setLoader(false));
    //get All JOBS
    getAllJobs()
      .then((res) => {
        setLoader(false);
        setJobs(res.data.results);
      })
      .catch(() => setLoader(false));

    // get form data from localStorage

    if (localStorage.getItem("formObject") !== null) {
      // if (props.type === "create") {
      SetFormData(
        formObject,
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
      );
      // }
    }

    //get OfficeData to Edit
    if (props.type === "edit") {
      getOfficeDataToEdit()
        .then((res) => {
          if (res?.data) {
            setEditedCompanyData(res.data);
            SetFormData(
              res.data,
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
            );
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      isMounted = false;
    };
  }, []);
  {
    console.log(checkedStaff);
  }

  const saveEditsToLocalStorage = () => {
    let obj = mappingDataToOneObj(
      props.type,
      dates,
      formValues,
      selectValues,
      uploadedImagesMultiple,
      uploadedImagesSingle,
      selectedEmployees,
      jobs,
      selectedStaffData
    );
    localStorage.setItem("formObject", JSON.stringify(obj));

    const args = {
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "registSuccNotification",
      description: "تم حفظ البيانات بنجاح",
    };
    notification.open(args);
  };
  return (
    <div className="RegistrationPage">
      <SmallNavbar />
      {loading ? <Loader /> : null}
      <StepsContainer
        onCheckStaff={onCheckStaff}
        checkedStaff={checkedStaff}
        officeRejections={officeRejections}
        verifyCapatcha={verifyCapatcha}
        showConfirmModal={showConfirmModal}
        openConfirmModal={openConfirmModal}
        editedCompanyData={editedCompanyData}
        Step4FormRef={Step4FormRef}
        requestType={props.type}
        onRegist={onRegist}
        nationalities={nationalities}
        steps={steps}
        dates={dates}
        officeTypes={officeTypes}
        pledge={pledge}
        // resetCapatcha={resetCapatcha}
        // onRecapchaChange={onRecapchaChange}
        captchaRef={captchaRef}
        captchaToken={captchaToken}
        setCaptchaToken={setCaptchaToken}
        formValues={formValues}
        currentStep={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        onSelectDate={onSelectDate}
        gotoStepWithTitle={gotoStepWithTitle}
        saveEditsToLocalStorage={saveEditsToLocalStorage}
        selectValues={selectValues}
        uploadedImagesSingle={uploadedImagesSingle}
        uploadedImagesMultiple={uploadedImagesMultiple}
        selectedCategories={selectedCategories}
        employeeDates={employeeDates}
        employeeChecks={employeeChecks}
        DeleteMultipleImages={DeleteMultipleImages}
        SetSingleFileUpload={SetSingleFileUpload}
        handleUserInput={handleUserInput}
        closeEditModal={closeEditModal}
        openEditModal={openEditModal}
        showEditModal={showEditModal}
        employeeCheckOk={employeeCheckOk}
        saveEmployeeData={saveEmployeeData}
        showAddModal={showAddModal}
        handleSelect={handleSelect}
        DeleteSingleImage={DeleteSingleImage}
        setEmployeeSpecialityByDefault={setEmployeeSpecialityByDefault}
        selectedStaffData={selectedStaffData}
        selectedEmployees={selectedEmployees}
        checkOKGeneralChecks={checkOKGeneralChecks}
        employeesValues={employeesValues}
        handleEmployeeSelect={handleEmployeeSelect}
        setFormValues={setFormValues}
        Step1FormRef={Step1FormRef}
        addStaff={addStaff}
        deleteEmployee={deleteEmployee}
        closeAddEmployeeModal={closeAddEmployeeModal}
        onSelectEmployeeDate={onSelectEmployeeDate}
        SetMultipleFilesUpload={SetMultipleFilesUpload}
        Step2AddFormRef={Step2AddFormRef}
        Step2EditFormRef={Step2EditFormRef}
        Step2FormRef={Step2FormRef}
        Step3FormRef={Step3FormRef}
        deleteSelectedStaffFromTable={deleteSelectedStaffFromTable}
        handleEmployeesInput={handleEmployeesInput}
        selectEmployeeValues={selectEmployeeValues}
        openAddEmployeeModal={openAddEmployeeModal}
        saveAddNewEmployee={saveAddNewEmployee}
        empModalFiles={empModalFiles}
        IDTypes={IDTypes}
        jobs={jobs}
        employeeSpecialities={employeeSpecialities}
        professionaLevels={professionaLevels}
      />
      <SmallFooter />
    </div>
  );
}

export default memo(RegistrationPage);
