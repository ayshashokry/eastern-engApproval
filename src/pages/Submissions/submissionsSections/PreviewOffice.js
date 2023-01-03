import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { notification, Tabs } from "antd";
import { Table, Modal } from "react-bootstrap";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import pdfImage from "../../../assets/images/pdfImage.png";
import moment from "moment-hijri";
import { toArabic } from "arabic-digits";
import { useSelector } from "react-redux";
import Loader from "../../../containers/Loader";
import SureModal from "../modals/SureModal";
import SendMsgModal from "../modals/SendMsgModal";
import {
  getAllJobs,
  getNationalities,
  getNationalityType,
  getProfessioalLevels,
} from "../../../apis/FetchApi";
import EmployeesData from "../../../data/EmployeesData.json";
import PreviewEmployeeData from "./PreviewEmployeeData";
import SmallFooter from "../../../containers/SmallFooter";
import SmallNavbar from "../../../containers/SmallNavbar";
import StaffTable from "./StaffTable";

export default function PreviewOffice(props) {
  const [departments, setDepartments] = useState([]);
  // const [rej, setA] = useState(false);
  const [acceptModalShow, setAcceptModalShow] = useState(false);
  const [rejectModalShow, setrejectModalShow] = useState(false);
  const [msgModalShow, setMsgShow] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${window.ApiUrl}/api/Department?q=1&filter_key=approving_dep&operand==`
      )
      .then((res) => {
        setDepartments(res.data.results);
      });

    // if (
    //   officeData.rejections !== undefined &&
    //   officeData.rejections
    //     .map(
    //       (r, index) =>
    //         departments.filter((d) => d.name == r.department)[0]?.id ==
    //         JSON.parse(localStorage.getItem("user")).department_id
    //     )
    //     .includes(true)
    // ) {
    //   setA(true);
    // } else {
    //   setA(false);
    // }
  }, []);
  const [employeeSpecialities, setemployeeSpecialities] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [nationalityTypes, setNationalityTypes] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [professionaLevels, setProfessionaLevels] = useState([]);
  const [openSureClose, setSureClose] = useState(false);

  const [officeData, setOfficeData] = useState({});
  const officeDetails = useSelector((state) => state.officeDetailsReducer);
  let unApPath = officeDetails.officeDetails?.un_approve_path;

  const openSureModal = () => {
    setSureClose(true);
  };

  const closeSureModal = () => {
    setSureClose(false);
  };
  useEffect(() => {
    axios
      .get(`${window.hostURL}/${unApPath}`)
      .then((res) => {
        setOfficeData(res.data);
      })
      .catch((error) => console.log(error));

    //get all nationality type
    getNationalityType().then((res) => {
      setNationalityTypes(res.data.results);
    });
    //getAllNationlities
    getNationalities().then((res) => setNationalities(res.data.results));
    //get All jobs
    getAllJobs().then((res) => {
      setAllJobs(res.data.results);
    });
    //get All jobs Specialities
    axios.get(`${window.ApiUrl}/api/EngineeringCategory`).then((res) => {
      setemployeeSpecialities(res.data.results);
    });

    //getPositions
    getProfessioalLevels().then((res) => {
      setProfessionaLevels(res.data.results);
    });
  }, [unApPath]);
  const VehicleFormsStep2swap = [];
  if (officeData?.specialization_data?.approved_dep?.form_image !== "") {
    const sepratedVechList = Array.isArray(
      officeData?.specialization_data?.approved_dep?.form_image
    )
      ? officeData?.specialization_data?.approved_dep?.form_image
      : officeData?.specialization_data?.approved_dep?.form_image?.split(",");
    sepratedVechList?.length > 0 &&
      sepratedVechList?.map((s) =>
        VehicleFormsStep2swap.push({
          data: Array.isArray(
            officeData?.specialization_data?.approved_dep?.form_image
          )
            ? s.data
            : s,
          thumbUrl: Array.isArray(
            officeData?.specialization_data?.approved_dep?.form_image
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
  if (officeData?.specialization_data?.approved_dep?.machines_image !== "") {
    const sepratedVechList = Array.isArray(
      officeData?.specialization_data?.approved_dep?.machines_image
    )
      ? officeData?.specialization_data?.approved_dep?.machines_image
      : officeData?.specialization_data?.approved_dep?.machines_image?.split(
          ","
        );
    sepratedVechList?.length > 0 &&
      sepratedVechList?.map((s) =>
        equipmentSurveyingBillsStep2swap.push({
          data: Array.isArray(
            officeData?.specialization_data?.approved_dep?.machines_image
          )
            ? s.data
            : s,
          thumbUrl: Array.isArray(
            officeData?.specialization_data?.approved_dep?.machines_image
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

  const handleAcceptModalShow = () => {
    setAcceptModalShow(true);
  };

  const handleRejectModalShow = () => {
    setrejectModalShow(true);
  };

  const CloseSureModal = () => {
    setrejectModalShow(false);
    setAcceptModalShow(false);
    setMsgShow(false);
  };

  const handleSendMsgModal = () => {
    setMsgShow(true);
  };
  const seen = new Set();
  return (
    <div className="submissionPage1 previewOffice">
      <SmallNavbar />
      <div className="AppName"> اعتماد المكاتب الهندسية</div>
      {Object.values(officeData).length > 0 ? (
        <div className="  step5Div">
          <Tabs defaultActiveKey="1" tabPosition="right" className="prevTabs">
            <Tabs.TabPane tab="بيانات المكتب الهندسي" key="1" style>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="البيانات الاساسية للمكتب" key="1">
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      <tr>
                        <th>
                          أتعهد بأن جميع البيانات المدخلة صحيحة و تتوافق مع
                          الفئة و التخصص المطلوب و فى حال عدم صحة البيانات فإن
                          ذلك يعرض المكتب للعقوبات النظامية و منها حرمان المكتب
                          من الإعتماد لمدة زمنية لا تزيد عن ٦ شهور
                        </th>
                        <td>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className=" fa-1x"
                            style={{
                              textAlign: "left",
                              // float: "left",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th> نوع المكتب</th>
                        <td>
                          {
                            officeData.office_data?.eng_company_data
                              ?.office_type_id?.name
                          }
                        </td>
                      </tr>
                      <tr>
                        <th>اسم المكتب</th>
                        <td>{officeData.office_data.eng_company_data?.name}</td>
                      </tr>
                      <tr>
                        <th>اسم المكتب بالانجليزية</th>
                        <td>{officeData.office_data.eng_company_data.ename}</td>
                      </tr>
                      <tr>
                        <th>رقم الجوال</th>
                        <td>
                          {toArabic(
                            officeData.office_data.eng_company_data.mobile
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>البريد الالكتروني</th>
                        <td>{officeData.office_data.eng_company_data.email}</td>
                      </tr>
                      {officeData.office_data.eng_company_data.old_office_id !==
                        "" &&
                        officeData.office_data.eng_company_data
                          .old_office_id !== undefined && (
                          <tr>
                            <th>رقم تسجيل المكتب بالأمانة </th>
                            <td>
                              {toArabic(
                                officeData.office_data.eng_company_data
                                  .old_office_id
                              )}
                            </td>
                          </tr>
                        )}
                      <tr>
                        <th> سنة إنشاء المكتب </th>
                        <td>
                          {toArabic(
                            officeData.office_data.eng_company_data
                              .foundation_year
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> رقم السجل التجارى</th>
                        <td>
                          {toArabic(
                            officeData.office_data.eng_company_data
                              .commercial_registration_no
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> تاريخ انتهاء السجل التجارى</th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.office_data.eng_company_data
                                .commercial_reg_end_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> خطاب طلب التسجيل</th>
                        <td>
                          {officeData.office_data.eng_company_data
                            .letter_reg !== undefined && (
                            <img
                              onClick={() =>
                                window.open(
                                  `${
                                    (officeData.office_data.eng_company_data.letter_reg?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.office_data.eng_company_data.letter_reg.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.office_data.eng_company_data
                                      .letter_reg
                                  }`
                                )
                              }
                              alt="RegistRequestImg"
                              className="RegistRequestImg"
                              src={
                                ["PDF", "pdf"].includes(
                                  officeData.office_data.eng_company_data.letter_reg
                                    ?.split(".")
                                    .pop()
                                )
                                  ? pdfImage
                                  : (officeData.office_data.eng_company_data.letter_reg?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.office_data.eng_company_data.letter_reg.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.office_data.eng_company_data
                                      .letter_reg
                              }
                              style={{
                                width: "100px",
                                borderRadius: "inherit",
                                // height: "inherit",
                              }}
                            />
                          )}
                        </td>
                      </tr>
                      {officeData.office_data.eng_company_data.another_items &&
                        officeData.office_data.eng_company_data.another_items
                          .length >= 1 && (
                          <tr>
                            <th>ملفات إضافية أو سابقة الأعمال</th>
                            <td>
                              {officeData.office_data.eng_company_data
                                .another_items &&
                                officeData.office_data.eng_company_data
                                  .another_items.length >= 1 &&
                                officeData.office_data.eng_company_data.another_items.map(
                                  (f) => (
                                    <img
                                      onClick={() =>
                                        window.open(
                                          `${
                                            (f.data?.includes("GISAPI") ||
                                            f.data.includes("gisAPI")
                                              ? window.hostURL
                                              : window.filesURL) +
                                            "/" +
                                            f.data
                                          }`
                                        )
                                      }
                                      alt="RegistRequestImg"
                                      className="RegistRequestImg mx-2"
                                      src={
                                        ["PDF", "pdf"].includes(
                                          f.data?.split(".").pop()
                                        )
                                          ? pdfImage
                                          : (f.data.includes("GISAPI") ||
                                            f.data.includes("gisAPI")
                                              ? window.hostURL
                                              : window.filesURL) +
                                            "/" +
                                            f.data
                                      }
                                      style={{
                                        width: "100px",
                                        borderRadius: "inherit",
                                        // height: "inherit",
                                      }}
                                    />
                                  )
                                )}
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </Table>
                </Tabs.TabPane>
                <Tabs.TabPane tab="معلومات الموقع" key="2">
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      {officeData.office_data.office_info_licences.address !==
                        undefined &&
                        officeData.office_data.office_info_licences.address !==
                          "" && (
                          <tr>
                            <th> العنوان</th>
                            <td>
                              {toArabic(
                                officeData.office_data.office_info_licences
                                  .address
                              )}
                            </td>
                          </tr>
                        )}
                      <tr>
                        <th> رقم الهاتف</th>
                        <td>
                          {toArabic(
                            `966${officeData.office_data.office_info_licences.phone}`
                          )}
                        </td>
                      </tr>
                      {officeData.office_data.office_info_licences.fax !==
                        undefined &&
                        officeData.office_data.office_info_licences.fax !==
                          "" && (
                          <tr>
                            <th> الفاكس</th>
                            <td>
                              {toArabic(
                                officeData.office_data.office_info_licences.fax
                              )}
                            </td>
                          </tr>
                        )}
                      {officeData.office_data.office_info_licences.mail_box !==
                        undefined &&
                        officeData.office_data.office_info_licences.mail_box !==
                          "" && (
                          <tr>
                            <th> صندوق البريد</th>
                            <td>
                              {toArabic(
                                officeData.office_data.office_info_licences
                                  .mail_box
                              )}
                            </td>
                          </tr>
                        )}
                      {officeData.office_data.office_info_licences
                        .postal_code !== undefined &&
                        officeData.office_data.office_info_licences
                          .postal_code !== "" && (
                          <tr>
                            <th> الرمز البريدي</th>
                            <td>
                              {toArabic(
                                officeData.office_data.office_info_licences
                                  .postal_code
                              )}
                            </td>
                          </tr>
                        )}
                      <tr>
                        <th>اسم المدينة</th>
                        <td>
                          {toArabic(
                            officeData.office_data.office_info_licences.city
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>اسم الشارع </th>
                        <td>
                          {toArabic(
                            officeData.office_data.office_info_licences.street
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>اسم المبني</th>
                        <td>
                          {toArabic(
                            officeData.office_data.office_info_licences.building
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>الدور</th>
                        <td>
                          {toArabic(
                            officeData.office_data.office_info_licences.floor
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>الوحدة</th>
                        <td>
                          {toArabic(
                            officeData.office_data.office_info_licences.appart
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> صورة اشتراك البريد السعودي</th>
                        <td>
                          {officeData.office_data.office_info_licences
                            .saudi_mail_subscribe !== undefined && (
                            <img
                              onClick={() =>
                                window.open(
                                  `${
                                    (officeData.office_data.office_info_licences.saudi_mail_subscribe?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.office_data.office_info_licences.saudi_mail_subscribe.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.office_data.office_info_licences
                                      .saudi_mail_subscribe
                                  }`
                                )
                              }
                              alt="SaudiPostSubscImg"
                              className="SaudiPostSubscImg"
                              src={
                                ["PDF", "pdf"].includes(
                                  officeData.office_data.office_info_licences.saudi_mail_subscribe
                                    ?.split(".")
                                    .pop()
                                )
                                  ? pdfImage
                                  : (officeData.office_data.office_info_licences.saudi_mail_subscribe?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.office_data.office_info_licences.saudi_mail_subscribe.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.office_data.office_info_licences
                                      .saudi_mail_subscribe
                              }
                              style={{
                                width: "100px",
                                borderRadius: "inherit",
                                // height: "inherit",
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>

            <Tabs.TabPane tab="الاعتمادات" key="2">
              {officeData.specialization_data.approved_dep.department_eng_comp.map(
                (j, index) =>
                  j.class !== undefined && (
                    <>
                      {j.approve?.id ==
                      JSON.parse(localStorage.getItem("user")).department_id ? (
                        <StaffTable
                          j={j}
                          officeData={officeData}
                          VehicleFormsStep2swap={VehicleFormsStep2swap}
                          equipmentSurveyingBillsStep2swap={
                            equipmentSurveyingBillsStep2swap
                          }
                        />
                      ) : JSON.parse(localStorage.getItem("user"))
                          .department_id == 1928 ? (
                        <StaffTable
                          j={j}
                          officeData={officeData}
                          VehicleFormsStep2swap={VehicleFormsStep2swap}
                          equipmentSurveyingBillsStep2swap={
                            equipmentSurveyingBillsStep2swap
                          }
                        />
                      ) : null}
                    </>
                  )
              )}
            </Tabs.TabPane>

            <Tabs.TabPane tab="بيانات تخصص المكتب والكادر" key="3">
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="بيانات ترخيص الهيئة السعودية" key="1">
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      <tr>
                        <th>رقم الترخيص</th>
                        <td>
                          {toArabic(
                            officeData.specialization_data.saudi_eng_license
                              .license_no
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> تاريخ الإصدار </th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.specialization_data.saudi_eng_license
                                .start_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>تاريخ انتهاء الرخصة</th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.specialization_data.saudi_eng_license
                                .end_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>

                      <th> صوره ترخيص الهيئة السعودية</th>
                      <td>
                        {officeData.specialization_data.saudi_eng_license
                          .image !== undefined && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (officeData.specialization_data.saudi_eng_license.image?.includes(
                                    "GISAPI"
                                  ) ||
                                  officeData.specialization_data.saudi_eng_license.image.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  officeData.specialization_data
                                    .saudi_eng_license.image
                                }`
                              )
                            }
                            alt="RegistRequestImg"
                            className="RegistRequestImg"
                            src={
                              ["PDF", "pdf"].includes(
                                officeData.specialization_data.saudi_eng_license.image
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (officeData.specialization_data.saudi_eng_license.image?.includes(
                                    "GISAPI"
                                  ) ||
                                  officeData.specialization_data.saudi_eng_license.image.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  officeData.specialization_data
                                    .saudi_eng_license.image
                            }
                            style={{
                              width: "100px",
                              borderRadius: "inherit",
                              // height: "inherit",
                            }}
                          />
                        )}
                      </td>
                    </tbody>
                  </Table>
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>

            <Tabs.TabPane tab="الموظفين" key="4">
              <Tabs
                className="empTabsParent"
                popupClassName="empTabss"
                defaultActiveKey="1"
                moreIcon={<FontAwesomeIcon icon={faArrowDown} />}>
                {JSON.parse(localStorage.getItem("user")).department_id == 1928
                  ? employeeSpecialities
                      .filter((x) =>
                        officeData.specialization_data.engineers_data.main_engineers_model?.some(
                          (y) =>
                            y.category_id?.id == x.id &&
                            y.category_id?.id !== 2032 &&
                            y.category_id?.id !== 2033 &&
                            (y.id !== 2033 || y.id !== 2032)
                        )
                      )
                      ?.map((tab) => (
                        <Tabs.TabPane tab={tab.name} key={tab.id}>
                          {officeData.specialization_data.engineers_data.main_engineers_model?.map(
                            (emp) =>
                              (emp.id !== 2033 || emp.id !== 2032) &&
                              tab.id == emp.category_id?.id && (
                                <PreviewEmployeeData
                                  nationalities={nationalities}
                                  professionaLevels={professionaLevels}
                                  emp={emp}
                                  allJobs={allJobs}
                                  nationalityTypes={nationalityTypes}
                                  employeeSpecialities={employeeSpecialities}
                                />
                              )
                          )}
                        </Tabs.TabPane>
                      ))
                  : officeData?.specialization_data?.engineers_data?.main_engineers_model
                      .filter((y) =>
                        EmployeesData.map((s) => s.employees)
                          .flat(1)
                          .some(
                            (emp) =>
                              y.emp_type_id.id !== 2033 &&
                              y.emp_type_id?.id !== 2032 &&
                              (
                                (emp.approveId ==
                                  JSON.parse(localStorage.getItem("user"))
                                    .department_id
                                     &&
                                  emp.id == y.emp_type_id?.id))
                          )
                      )
                      .filter((el) => {
                        const duplicate = seen.has(el.category_id.id);
                        seen.add(el.category_id.id);
                        return !duplicate;
                      })
                      ?.map((tab) => (
                        <Tabs.TabPane
                          tab={tab.category_id?.name}
                          key={tab.category_id?.id}>
                          {officeData.specialization_data.engineers_data.main_engineers_model?.map(
                            (emp) =>
                              tab.category_id?.id == emp.category_id?.id && (
                                <PreviewEmployeeData
                                  nationalities={nationalities}
                                  professionaLevels={professionaLevels}
                                  emp={emp}
                                  allJobs={allJobs}
                                  nationalityTypes={nationalityTypes}
                                  employeeSpecialities={employeeSpecialities}
                                />
                              )
                          )}
                        </Tabs.TabPane>
                      ))}
                <>
                  {officeData?.specialization_data?.engineers_data?.main_engineers_model
                    .filter((y) =>
                      EmployeesData.map((s) => s.employees)
                        .flat(1)
                        .some(
                          (emp) =>
                            y.emp_type_id.id !== 2033 &&
                            y.emp_type_id?.id !== 2032 &&
                            (y.is_eng_comp_owner ||
                              y.is_responsible ||
                              y.mandatory == 0 ||
                              (emp.approveId ==
                                JSON.parse(localStorage.getItem("user"))
                                  .department_id 
                                  &&
                                emp.id == y.emp_type_id?.id
                                ))
                        )
                    )
                    .filter((el) => {
                      const duplicate = seen.has(el.category_id.id);
                      seen.add(el.category_id.id);
                      return !duplicate;
                    })
                    ?.map((tab) => (
                      <Tabs.TabPane
                        tab={tab.category_id?.name}
                        key={tab.category_id?.id}>
                        {officeData.specialization_data.engineers_data.main_engineers_model?.map(
                          (emp) =>
                            tab.category_id?.id == emp.category_id?.id &&
                            (emp.is_eng_comp_owner || emp.is_responsible) && (
                              <PreviewEmployeeData
                                nationalities={nationalities}
                                professionaLevels={professionaLevels}
                                emp={emp}
                                allJobs={allJobs}
                                nationalityTypes={nationalityTypes}
                                employeeSpecialities={employeeSpecialities}
                              />
                            )
                        )}
                      </Tabs.TabPane>
                    ))}
                </>
                <>
                  {officeData?.specialization_data?.engineers_data?.main_engineers_model.filter(
                    (y) =>
                      EmployeesData.map((s) => s.employees)
                        .flat(1)
                        .some(
                          (emp) =>
                            (y.is_eng_comp_owner == 1 ||
                              y.is_responsible == 1 ||
                              y.mandatory == 0 ||
                              JSON.parse(localStorage.getItem("user"))
                                .department_id == 1928 ||
                              (emp.approveId ==
                                JSON.parse(localStorage.getItem("user"))
                                  .department_id &&
                                emp.id == y.emp_type_id?.id)) &&
                            y.emp_type_id?.id == 2032
                        )
                  ).length > 0 ? (
                    <Tabs.TabPane tab="المساحين" key={"20322"}>
                      {officeData.specialization_data.engineers_data.main_engineers_model?.map(
                        (emp) =>
                          (emp.category_id?.id == null ||
                            emp.category_id?.id == "" ||
                            emp.category_id?.id == undefined) &&
                          emp?.emp_type_id?.id == 2032 && (
                            <PreviewEmployeeData
                              nationalities={nationalities}
                              professionaLevels={professionaLevels}
                              emp={emp}
                              allJobs={allJobs}
                              nationalityTypes={nationalityTypes}
                              employeeSpecialities={employeeSpecialities}
                            />
                          )
                      )}
                    </Tabs.TabPane>
                  ) : null}
                </>
                <>
                  {true ? (
                    officeData?.specialization_data?.engineers_data?.main_engineers_model.filter(
                      (y) =>
                        EmployeesData.map((s) => s.employees)
                          .flat(1)
                          .some(
                            (emp) =>
                              (y.is_eng_comp_owner == 1 ||
                                y.is_responsible == 1 ||
                                y.mandatory == 0 ||
                                JSON.parse(localStorage.getItem("user"))
                                  .department_id == 1928 ||
                                (emp.approveId ==
                                  JSON.parse(localStorage.getItem("user"))
                                    .department_id &&
                                  emp.id == y.emp_type_id?.id)) &&
                              y.emp_type_id?.id == 2033
                          )
                    ).length > 0 ? (
                      <Tabs.TabPane tab="الرسامين" key={"20333"}>
                        {officeData.specialization_data.engineers_data.main_engineers_model?.map(
                          (emp) =>
                            (emp.category_id?.id == null ||
                              emp.category_id?.id == "" ||
                              emp.category_id?.id == undefined) &&
                            emp?.emp_type_id?.id == 2033 && (
                              <PreviewEmployeeData
                                nationalities={nationalities}
                                professionaLevels={professionaLevels}
                                emp={emp}
                                allJobs={allJobs}
                                nationalityTypes={nationalityTypes}
                                employeeSpecialities={employeeSpecialities}
                              />
                            )
                        )}
                      </Tabs.TabPane>
                    ) : null
                  ) : null}
                </>
              </Tabs>
            </Tabs.TabPane>

            <Tabs.TabPane tab="تراخيص المكتب" key="5">
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="رخصة المكتب من البلدية" key="1">
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      <tr>
                        <th>رقم الترخيص</th>
                        <td>
                          {toArabic(
                            officeData.licences.office_info_licences.license_no
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> تاريخ الإصدار</th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.licences.office_info_licences
                                .start_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> تاريخ انتهاء الرخصة</th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.licences.office_info_licences.end_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th> صورة الرخصة الصادرة من البلدية</th>
                        <td>
                          {officeData.licences.office_info_licences.image !==
                            undefined && (
                            <img
                              onClick={() =>
                                window.open(
                                  `${
                                    (officeData.licences.office_info_licences.image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.office_info_licences.image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.office_info_licences
                                      .image
                                  }`
                                )
                              }
                              alt="RegistRequestImg"
                              className="RegistRequestImg"
                              src={
                                ["PDF", "pdf"].includes(
                                  officeData.licences.office_info_licences.image
                                    .split(".")
                                    .pop()
                                )
                                  ? pdfImage
                                  : (officeData.licences.office_info_licences.image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.office_info_licences.image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.office_info_licences
                                      .image
                              }
                              style={{
                                width: "100px",
                                borderRadius: "inherit",
                                // height: "inherit",
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tabs.TabPane>
                <Tabs.TabPane tab="بيانات التأمينات الاجتماعية" key="2">
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      <tr>
                        <th> رقم الترخيص</th>
                        <td>
                          {toArabic(
                            officeData.licences.insurance_license.license_no
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>رقم الاشتراك</th>
                        <td>
                          {toArabic(
                            officeData.licences.insurance_license.subscribe_no
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>تاريخ انتهاء الشهادة </th>
                        <td>
                          {toArabic(
                            moment(
                              officeData.licences.insurance_license.end_date,
                              "iDD/iMM/iYYYY"
                            ).format("iYYYY/iMM/iDD")
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th> شهادة التأمينات الاجتماعية</th>
                        <td>
                          {officeData.licences.insurance_license.image !==
                            undefined && (
                            <img
                              onClick={() =>
                                window.open(
                                  `${
                                    (officeData.licences.insurance_license.image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.insurance_license.image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.insurance_license.image
                                  }`
                                )
                              }
                              alt="SaudiPostSubscImg"
                              className="SaudiPostSubscImg"
                              src={
                                ["PDF", "pdf"].includes(
                                  officeData.licences.insurance_license.image
                                    .split(".")
                                    .pop()
                                )
                                  ? pdfImage
                                  : (officeData.licences.insurance_license.image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.insurance_license.image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.insurance_license.image
                              }
                              style={{
                                width: "100px",
                                borderRadius: "inherit",
                                // height: "inherit",
                              }}
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th> برنت التأمينات الاجتماعية</th>
                        <td>
                          {officeData.licences.insurance_license.print_image !==
                            undefined && (
                            <img
                              onClick={() =>
                                window.open(
                                  `${
                                    (officeData.licences.insurance_license.print_image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.insurance_license.print_image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.insurance_license
                                      .print_image
                                  }`
                                )
                              }
                              alt="SaudiPostSubscImg"
                              className="SaudiPostSubscImg"
                              src={
                                ["PDF", "pdf"].includes(
                                  officeData.licences.insurance_license.print_image
                                    .split(".")
                                    .pop()
                                )
                                  ? pdfImage
                                  : (officeData.licences.insurance_license.print_image?.includes(
                                      "GISAPI"
                                    ) ||
                                    officeData.licences.insurance_license.print_image.includes(
                                      "gisAPI"
                                    )
                                      ? window.hostURL
                                      : window.filesURL) +
                                    "/" +
                                    officeData.licences.insurance_license
                                      .print_image
                              }
                              style={{
                                width: "100px",
                                borderRadius: "inherit",
                                // height: "inherit",
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            {officeData.rejections !== undefined &&
              officeData.rejections
                .map(
                  (r, index) =>
                    departments.filter((d) => d.name == r.department)[0]?.id ==
                    JSON.parse(localStorage.getItem("user")).department_id
                )
                .includes(true) &&
              officeData.rejections &&
              officeData.rejections.length > 0 && (
                <Tabs.TabPane tab="الاعتذارات" key="6">
                  {officeData.rejections.map((r, index) =>
                    departments.filter((d) => d.name == r.department)[0]?.id ==
                    JSON.parse(localStorage.getItem("user")).department_id ? (
                      <>
                        <h5 className="empTitleName mt-4">
                          اعتذار {r.department}
                        </h5>
                        <Table className="inquiryTable mt-auto mr-auto">
                          <tbody>
                            <tr>
                              <th>سبب الاعتذار</th>
                              <td>{r.comment}</td>
                            </tr>
                            <tr>
                              <th>تاريخ الاعتذار</th>
                              <td>{toArabic(r.date)}</td>
                            </tr>
                            <tr>
                              <th> القسم</th>
                              <td>{r.department}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null
                  )}
                </Tabs.TabPane>
              )}
          </Tabs>
          <div className="steps-action my-3">
            {/* <Link to="/submissions"> */}
            <Button
              onClick={openSureModal}
              type="warning"
              className="showBtn ml-3">
              اغلاق
            </Button>
            {/* </Link> */}
            <Modal
              keyboard={false}
              className="AddOwnerModal confirmModal"
              style={{ textAlign: "right" }}
              show={openSureClose}
              onHide={closeSureModal}
              backdrop="static"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <p className="confirmText">هل أنت متأكد من هذا الإجراء؟</p>
              <div
                className="confirmModalBtns mt-3"
                style={{ textAlign: "left" }}>
                <Button
                  type="warning"
                  htmlType="submit"
                  className="showBtn ml-3"
                  onClick={closeSureModal}>
                  لا
                </Button>
                <Link to="/submissions">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="showBtn ml-3">
                    نعم
                  </Button>
                </Link>
              </div>
            </Modal>
            {!officeDetails.viewOnly && officeDetails.selectedTab === 1 && (
              <>
                <Button className="showBtn ml-3" onClick={handleSendMsgModal}>
                  ارسال رسالة نصية
                </Button>
                <SendMsgModal
                  CloseSureModal={CloseSureModal}
                  msgModalShow={msgModalShow}
                />
                <div style={{ float: "right" }}>
                  <Button
                    type="warning"
                    className="deleteBtn ml-3"
                    onClick={handleRejectModalShow}>
                    اعتذار
                  </Button>
                  <Button
                    type="warning"
                    className="acceptBtn mx-3"
                    onClick={handleAcceptModalShow}>
                    موافقة
                  </Button>
                  <SureModal
                    officeData={officeData}
                    handleAcceptModalShow={handleAcceptModalShow}
                    handleRejectModalShow={handleRejectModalShow}
                    acceptModalShow={acceptModalShow}
                    rejectModalShow={rejectModalShow}
                    CloseSureModal={CloseSureModal}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <SmallFooter />
    </div>
  );
}
