import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal } from "react-bootstrap";
import { Button, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-hijri";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import pdfImage from "../../../assets/images/pdfImage.png";
import wordImage from "../../../assets/images/wordImage.png";
import { toArabic } from "arabic-digits";
import ConfirmRegistModal from "../modals/ConfirmRegistModal";
import EmployeesData from "../../../data/EmployeesData.json";
import Step5EmployeeData from "./Step5EmployeeData";

export default function RegistStep4(props) {
  const [employeeSpecialities, setemployeeSpecialities] = useState([]);

  useEffect(() => {
    //get All jobs Specialities
    axios.get(`${window.ApiUrl}/api/EngineeringCategory`).then((res) => {
      setemployeeSpecialities(res.data.results);
    });
  }, []);
  return (
    <div className="step5Div">
      <Tabs defaultActiveKey="1" tabPosition="right">
        <Tabs.TabPane tab="بيانات المكتب الهندسي" key="1">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="البيانات الاساسية للمكتب" key="1">
              <Table className="inquiryTable mt-auto mr-auto">
                <tbody>
                  <tr>
                    <th>
                      أتعهد بأن جميع البيانات المدخلة صحيحة و تتوافق مع الفئة و
                      التخصص المطلوب و فى حال عدم صحة البيانات فإن ذلك يعرض
                      المكتب للعقوبات النظامية و منها حرمان المكتب من الإعتماد
                      لمدة زمنية لا تزيد عن ٦ شهور
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
                    <td>{props.selectValues.officeType.name}</td>
                  </tr>
                  <tr>
                    <th>اسم المكتب</th>
                    <td>{toArabic(props.formValues.officeName)}</td>
                  </tr>
                  <tr>
                    <th>اسم المكتب بالانجليزية</th>
                    <td>{props.formValues.engofficeName}</td>
                  </tr>
                  <tr>
                    <th>رقم الجوال</th>
                    <td>{toArabic(`966${props.formValues.mobile}`)}</td>
                  </tr>
                  <tr>
                    <th>البريد الالكتروني</th>
                    <td>{props.formValues.email}</td>
                  </tr>
                  {props.formValues.amanaOfficeRegNum !== "" &&
                    props.formValues.amanaOfficeRegNum !== undefined && (
                      <tr>
                        <th>رقم تسجيل المكتب بالأمانة </th>
                        <td>{toArabic(props.formValues.amanaOfficeRegNum)}</td>
                      </tr>
                    )}
                  <tr>
                    <th> سنة إنشاء المكتب </th>
                    <td>{toArabic(props.formValues.foundation_year)}</td>
                  </tr>
                  <tr>
                    <th> رقم السجل التجارى</th>
                    <td>
                      {toArabic(props.formValues.commercial_registration_no)}
                    </td>
                  </tr>
                  <tr>
                    <th> تاريخ انتهاء السجل التجارى</th>
                    <td>{toArabic(props.dates.commercial_reg_end_date)} </td>
                  </tr>
                  <tr>
                    <th> خطاب طلب التسجيل</th>
                    <td>
                      {props.uploadedImagesSingle.RegistRequestImgStep1 &&
                        props.uploadedImagesSingle.RegistRequestImgStep1
                          .length >= 1 && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (props.uploadedImagesSingle.RegistRequestImgStep1[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.RegistRequestImgStep1[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .RegistRequestImgStep1[0].data
                                }`
                              )
                            }
                            alt="RegistRequestImg"
                            className="RegistRequestImg"
                            src={
                              ["PDF", "pdf"].includes(
                                props.uploadedImagesSingle.RegistRequestImgStep1[0].data
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (props.uploadedImagesSingle.RegistRequestImgStep1[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.RegistRequestImgStep1[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .RegistRequestImgStep1[0].data
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
                  {props.uploadedImagesMultiple?.additionalFilesStep1 &&
                    props.uploadedImagesMultiple.additionalFilesStep1.length >=
                      1 && (
                      <tr>
                        <th>ملفات إضافية أو سابقة الأعمال</th>
                        <td>
                          {props.uploadedImagesMultiple?.additionalFilesStep1 &&
                            props.uploadedImagesMultiple.additionalFilesStep1
                              .length >= 1 &&
                            props.uploadedImagesMultiple.additionalFilesStep1.map(
                              (f) => (
                                <img
                                  onClick={() =>
                                    window.open(
                                      `${
                                        (f.data?.includes("GISAPI") ||
                                        f.data?.includes("gisAPI")
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
                                      : (f.data?.includes("GISAPI") ||
                                        f.data?.includes("gisAPI")
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
                  {props.formValues.address !== "" && (
                    <tr>
                      <th> العنوان</th>
                      <td>{toArabic(props.formValues.address)}</td>
                    </tr>
                  )}
                  <tr>
                    <th> رقم الهاتف</th>
                    <td>{toArabic(`966${props.formValues.phone}`)}</td>
                  </tr>
                  {props.formValues.fax !== "" && (
                    <tr>
                      <th> الفاكس</th>
                      <td>{toArabic(props.formValues.fax)}</td>
                    </tr>
                  )}
                  {props.formValues.mail_box !== "" && (
                    <tr>
                      <th> صندوق البريد</th>
                      <td>{toArabic(props.formValues.mail_box)}</td>
                    </tr>
                  )}
                  {props.formValues.postal_code !== "" && (
                    <tr>
                      <th> الرمز البريدي</th>
                      <td>{toArabic(props.formValues.postal_code)}</td>
                    </tr>
                  )}
                  <tr>
                    <th>اسم المدينة</th>
                    <td>{toArabic(props.formValues.city)}</td>
                  </tr>
                  <tr>
                    <th>اسم الشارع </th>
                    <td>{toArabic(props.formValues.street)}</td>
                  </tr>
                  <tr>
                    <th>اسم المبني</th>
                    <td>{toArabic(props.formValues.building)}</td>
                  </tr>
                  <tr>
                    <th>الدور</th>
                    <td>{toArabic(props.formValues.floor)}</td>
                  </tr>
                  <tr>
                    <th>الوحدة</th>
                    <td>{toArabic(props.formValues.appart)}</td>
                  </tr>
                  <tr>
                    <th> صورة اشتراك البريد السعودي</th>
                    <td>
                      {props.uploadedImagesSingle.SaudiPostSubscImgStep1 &&
                        props.uploadedImagesSingle.SaudiPostSubscImgStep1
                          .length >= 1 && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (props.uploadedImagesSingle.SaudiPostSubscImgStep1[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SaudiPostSubscImgStep1[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SaudiPostSubscImgStep1[0].data
                                }`
                              )
                            }
                            alt="SaudiPostSubscImg"
                            className="SaudiPostSubscImg"
                            src={
                              ["PDF", "pdf"].includes(
                                props.uploadedImagesSingle.SaudiPostSubscImgStep1[0].data
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (props.uploadedImagesSingle.SaudiPostSubscImgStep1[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SaudiPostSubscImgStep1[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SaudiPostSubscImgStep1[0].data
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
          {props.selectedStaffData.map(
            (j, index) =>
              (j.class !== undefined || j.id !== null) && (
                <>
                  <p className="briefParagraph">
                    اعتماد {j.approve !== undefined ? j.approve?.name : j.name}
                  </p>
                  <Table className="inquiryTable mt-auto mr-auto">
                    <tbody>
                      <tr>
                        <th>الفئة</th>
                        <td>
                          {j.class !== undefined
                            ? j.class?.name
                            : "مكتب هندسى استشارى جميع التخصصات فئة (أ)"}
                        </td>
                      </tr>
                      <tr>
                        <th> التخصص</th>
                        <td>
                          {j.category !== undefined && j.category !== null
                            ? j.category.name
                            : "بدون"}
                        </td>
                      </tr>
                      <tr>
                        <th>الإدارة المقدم إليها طلب الاعتماد</th>
                        <td>
                          {j.approve !== undefined ? j.approve?.name : j.name}
                        </td>
                      </tr>
                      {(props.formValues.gpsDevices !== "" ||
                        props.formValues.totalStationDevices !== "") &&
                        (j.approve !== undefined
                          ? j.approve.id === 228
                          : j.id == 228) && (
                          <>
                            {props.formValues.gpsDevices !== "" && (
                              <tr>
                                <th>عدد أجهزة gps </th>
                                <td>{toArabic(props.formValues.gpsDevices)}</td>
                              </tr>
                            )}
                            {props.formValues.totalStationDevices !== "" && (
                              <tr>
                                <th>عدد أجهزة total station</th>
                                <td>
                                  {toArabic(
                                    props.formValues.totalStationDevices
                                  )}
                                </td>
                              </tr>
                            )}
                            {props.uploadedImagesMultiple
                              ?.equipmentSurveyingBillsStep2 &&
                              props.uploadedImagesMultiple
                                .equipmentSurveyingBillsStep2.length >= 1 && (
                                <tr>
                                  <th>
                                    صور فواتير المعدات واجهزة الرفع المساحي
                                  </th>
                                  <td>
                                    {props.uploadedImagesMultiple
                                      ?.equipmentSurveyingBillsStep2 &&
                                      props.uploadedImagesMultiple
                                        .equipmentSurveyingBillsStep2.length >=
                                        1 &&
                                      props.uploadedImagesMultiple.equipmentSurveyingBillsStep2.map(
                                        (f) => (
                                          <img
                                            onClick={() =>
                                              window.open(
                                                `${
                                                  (f.data?.includes("GISAPI") ||
                                                  f.data?.includes("gisAPI")
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
                                                : (f.data?.includes("GISAPI") ||
                                                  f.data?.includes("gisAPI")
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
                            {props.uploadedImagesMultiple?.VehicleFormsStep2 &&
                              props.uploadedImagesMultiple.VehicleFormsStep2
                                .length >= 1 && (
                                <tr>
                                  <th>صور استمارات سيارات دفع رباعي</th>
                                  <td>
                                    {props.uploadedImagesMultiple
                                      ?.VehicleFormsStep2 &&
                                      props.uploadedImagesMultiple
                                        .VehicleFormsStep2.length >= 1 &&
                                      props.uploadedImagesMultiple.VehicleFormsStep2.map(
                                        (f) => (
                                          <img
                                            onClick={() =>
                                              window.open(
                                                `${
                                                  (f.data?.includes("GISAPI") ||
                                                  f.data?.includes("gisAPI")
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
                                                : (f.data?.includes("GISAPI") ||
                                                  f.data?.includes("gisAPI")
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
                          </>
                        )}
                    </tbody>
                  </Table>
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
                    <td>{toArabic(props.formValues.liceNum)}</td>
                  </tr>
                  <tr>
                    <th> تاريخ الإصدار </th>
                    <td>{toArabic(props.dates.Step2licereleaseDate)} هـ</td>
                  </tr>
                  <tr>
                    <th>تاريخ انتهاء الرخصة</th>
                    <td>{toArabic(props.dates.Step2licefinishDate)} هـ</td>
                  </tr>

                  <th> صوره ترخيص الهيئة السعودية</th>
                  <td>
                    {props.uploadedImagesSingle.SaudiAuthLicenseImgStep2 &&
                      props.uploadedImagesSingle.SaudiAuthLicenseImgStep2
                        .length >= 1 && (
                        <img
                          onClick={() =>
                            window.open(
                              `${
                                (props.uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data?.includes(
                                  "GISAPI"
                                ) ||
                                props.uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data?.includes(
                                  "gisAPI"
                                )
                                  ? window.hostURL
                                  : window.filesURL) +
                                "/" +
                                props.uploadedImagesSingle
                                  .SaudiAuthLicenseImgStep2[0].data
                              }`
                            )
                          }
                          alt="RegistRequestImg"
                          className="RegistRequestImg"
                          src={
                            ["PDF", "pdf"].includes(
                              props.uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data
                                ?.split(".")
                                .pop()
                            )
                              ? pdfImage
                              : (props.uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data?.includes(
                                  "GISAPI"
                                ) ||
                                props.uploadedImagesSingle.SaudiAuthLicenseImgStep2[0].data?.includes(
                                  "gisAPI"
                                )
                                  ? window.hostURL
                                  : window.filesURL) +
                                "/" +
                                props.uploadedImagesSingle
                                  .SaudiAuthLicenseImgStep2[0].data
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
            {employeeSpecialities
              ?.filter((x) =>
                props.selectedEmployees.some(
                  (y) =>
                    y !== false &&
                    y !== undefined &&
                    y?.employee.selectEmployeeValues.employeeSpecialtyObject
                      ?.id == x.id
                )
              )
              .map((tab) => (
                <Tabs.TabPane tab={tab?.name} key={tab?.id}>
                  {props.selectedEmployees.map(
                    (emp) =>
                      emp !== false &&
                      emp !== undefined &&
                      tab.id ==
                        emp.employee.selectEmployeeValues
                          .employeeSpecialtyObject?.id && (
                        <Step5EmployeeData
                          requestType={props.requestType}
                          emp={emp}
                        />
                      )
                  )}
                </Tabs.TabPane>
              ))}
            {EmployeesData.map((s) => s.employees)
              .flat(1)
              ?.filter((x) =>
                props.selectedEmployees.some(
                  (y) =>
                    y !== false &&
                    y !== undefined &&
                    (y.category?.id == x.category?.id ||
                      y.category?.id == null) &&
                    y.id == 2032
                )
              ).length > 0 && (
              <Tabs.TabPane tab={"المساحين"} key={"2032"}>
                {props.selectedEmployees.map(
                  (emp) =>
                    emp !== false &&
                    emp !== undefined &&
                    emp.id == 2032 && (
                      <Step5EmployeeData
                        requestType={props.requestType}
                        emp={emp}
                      />
                    )
                )}
              </Tabs.TabPane>
            )}

            {EmployeesData.map((s) => s.employees)
              .flat(1)
              ?.filter((x) =>
                props.selectedEmployees.some(
                  (y) =>
                    y !== false &&
                    y !== undefined &&
                    (y.category?.id == x.category?.id ||
                      y.category?.id == null) &&
                    y.id == 2033
                )
              ).length > 0 && (
              <Tabs.TabPane tab={"الرسامين"} key={"2023"}>
                {props.selectedEmployees.map(
                  (emp) =>
                    emp !== false &&
                    emp !== undefined &&
                    emp.id == 2033 && (
                      <Step5EmployeeData
                        requestType={props.requestType}
                        emp={emp}
                      />
                    )
                )}
              </Tabs.TabPane>
            )}
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="تراخيص المكتب" key="5">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="رخصة المكتب من البلدية" key="1">
              <Table className="inquiryTable mt-auto mr-auto">
                <tbody>
                  <tr>
                    <th>رقم الترخيص</th>
                    <td>{toArabic(props.formValues.liceNum1)}</td>
                  </tr>
                  <tr>
                    <th> تاريخ الإصدار</th>
                    <td>{toArabic(props.dates.Step3releaseDate)} هـ</td>
                  </tr>
                  <tr>
                    <th> تاريخ انتهاء الرخصة</th>
                    <td>{toArabic(props.dates.Step3licFinishDate)} هـ</td>
                  </tr>

                  <tr>
                    <th> صورة الرخصة الصادرة من البلدية</th>
                    <td>
                      {props.uploadedImagesSingle.MunLicenseImgStep3 &&
                        props.uploadedImagesSingle.MunLicenseImgStep3.length >=
                          1 && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (props.uploadedImagesSingle.MunLicenseImgStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.MunLicenseImgStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .MunLicenseImgStep3[0].data
                                }`
                              )
                            }
                            alt="RegistRequestImg"
                            className="RegistRequestImg"
                            src={
                              ["PDF", "pdf"].includes(
                                props.uploadedImagesSingle.MunLicenseImgStep3[0].data
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (props.uploadedImagesSingle.MunLicenseImgStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.MunLicenseImgStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .MunLicenseImgStep3[0].data
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
                    <td>{toArabic(props.formValues.liceNum2)}</td>
                  </tr>
                  <tr>
                    <th>رقم الاشتراك</th>
                    <td>{toArabic(props.formValues.subscripNum)}</td>
                  </tr>
                  <tr>
                    <th>تاريخ انتهاء الشهادة </th>
                    <td>{toArabic(props.dates.certifFinishDate)} هـ</td>
                  </tr>

                  <tr>
                    <th> شهادة التأمينات الاجتماعية</th>
                    <td>
                      {props.uploadedImagesSingle.SocialInsurCertifStep3 &&
                        props.uploadedImagesSingle.SocialInsurCertifStep3
                          .length >= 1 && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (props.uploadedImagesSingle.SocialInsurCertifStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SocialInsurCertifStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SocialInsurCertifStep3[0].data
                                }`
                              )
                            }
                            alt="SaudiPostSubscImg"
                            className="SaudiPostSubscImg"
                            src={
                              ["PDF", "pdf"].includes(
                                props.uploadedImagesSingle.SocialInsurCertifStep3[0].data
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (props.uploadedImagesSingle.SocialInsurCertifStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SocialInsurCertifStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SocialInsurCertifStep3[0].data
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
                      {props.uploadedImagesSingle.SocialInsurPrintStep3 &&
                        props.uploadedImagesSingle.SocialInsurPrintStep3
                          .length >= 1 && (
                          <img
                            onClick={() =>
                              window.open(
                                `${
                                  (props.uploadedImagesSingle.SocialInsurPrintStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SocialInsurPrintStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SocialInsurPrintStep3[0].data
                                }`
                              )
                            }
                            alt="SaudiPostSubscImg"
                            className="SaudiPostSubscImg"
                            src={
                              ["PDF", "pdf"].includes(
                                props.uploadedImagesSingle.SocialInsurPrintStep3[0].data
                                  ?.split(".")
                                  .pop()
                              )
                                ? pdfImage
                                : (props.uploadedImagesSingle.SocialInsurPrintStep3[0].data?.includes(
                                    "GISAPI"
                                  ) ||
                                  props.uploadedImagesSingle.SocialInsurPrintStep3[0].data?.includes(
                                    "gisAPI"
                                  )
                                    ? window.hostURL
                                    : window.filesURL) +
                                  "/" +
                                  props.uploadedImagesSingle
                                    .SocialInsurPrintStep3[0].data
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
        {/* {props.requestType == "create" && (
          <Tabs.TabPane tab="بيانات الحساب" key="6">
            <Table className="inquiryTable mt-auto mr-auto">
              <tbody>
                <tr>
                  <th> اسم المستخدم</th>
                  <td>{props.formValues.username}</td>
                </tr>
                <tr>
                  <th>كلمة المرور</th>
                  <td>{props.formValues.password}</td>
                </tr>
              </tbody>
            </Table>
          </Tabs.TabPane>
        )} */}

        {props.officeRejections && props.officeRejections.length > 0 && (
          <Tabs.TabPane tab="الاعتذارات" key="6">
            {props.officeRejections.map((r, index) => (
              <>
                <h5 className="empTitleName mt-4">اعتذار {index + 1}</h5>
                <Table className="inquiryTable mt-auto mr-auto">
                  <tbody>
                    <tr>
                      <th>سبب الاعتذار</th>
                      <td>{r.comment}</td>
                    </tr>
                    <tr>
                      <th>تاريخ الاعتذار</th>
                      <td>
                        {moment(r.date, "iDD/iMM/iYYYY")
                          .format("iYYYY/iMM/iDD")
                          .includes(NaN)
                          ? toArabic(r.date)
                          : toArabic(
                              moment(r.date, "iDD/iMM/iYYYY").format(
                                "iYYYY/iMM/iDD"
                              )
                            )}
                      </td>
                    </tr>
                    <tr>
                      <th> القسم</th>
                      <td>{r.department}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ))}
          </Tabs.TabPane>
        )}
      </Tabs>
      <div className="steps-action my-3">
        {props.requestType == "create" ? (
          <Button
            onClick={props.nextStep}
            type="primary"
            htmlType="submit"
            className="showBtn ml-3">
            التالي
            <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="showBtn ml-3"
            onClick={props.openConfirmModal}>
            إرسال
            <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
          </Button>
        )}{" "}
        <Button
          onClick={props.saveEditsToLocalStorage}
          className="saveEditsBtn mx-2">
          حفظ التعديلات
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => props.prevStep()}
          className="showBtn prevBtn ml-3"
          // disabled={Object.keys(this.props.selectedDepartment).length === 0}
        >
          <FontAwesomeIcon className=" ml-2 " icon={faArrowRight} />
          السابق
        </Button>
      </div>{" "}
      <ConfirmRegistModal
        onRegist={props.onRegist}
        openConfirmModal={props.openConfirmModal}
        showConfirmModal={props.showConfirmModal}
      />
    </div>
  );
}
