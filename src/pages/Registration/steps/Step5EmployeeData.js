import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal } from "react-bootstrap";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import pdfImage from "../../../assets/images/pdfImage.png";
import wordImage from "../../../assets/images/wordImage.png";
import { toArabic } from "arabic-digits";
import { CheckUniqueSSN, getOfficeById } from "../../../apis/FetchApi";
export default function Step5EmployeeData({ emp,requestType }) {
  const [officeData, setOfficeData] = useState({});
  const [empFound, setEmpFound] = useState(false);
  useEffect(() => {
    if (requestType == "edit") {
      CheckUniqueSSN(emp.employee.employeesValues.IdNumber)
        .then((res) => {
          setEmpFound(false);
          setOfficeData({});
          setShowOfficeModal(null);
        })
        .catch((error) => {
          if (error?.response?.status == 302) {
            setEmpFound(true);
            getOfficeById(error.response.data.eng_comp_id).then((res) =>
              setOfficeData(res.data)
            );
          }
        });
    }
  }, []);

  const [showOfficeModal, setShowOfficeModal] = useState(null);
  const openOfficeModal = (id) => {
    setShowOfficeModal(id);
  };
  const closeOfficeModal = () => {
    setShowOfficeModal(null);
  };
  return (
    <div>
      <h5 className="empTitleName">
        {emp?.employee?.selectEmployeeValues?.employeeJob}
      </h5>
      {empFound ? (
        <p className="EmpFound">
          هذا الموظف مسجل من قبل ب
          <span
            className="officeNameTitle"
            id={officeData?.id}
            onClick={() => openOfficeModal(officeData?.id)}>
            {officeData?.name}
          </span>
        </p>
      ) : null}
      <Modal
        keyboard={false}
        onHide={closeOfficeModal}
        show={showOfficeModal === officeData.id}
        backdrop="static"
        className="AddOwnerModal confirmModal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <div className="confirmModalBtns">
          <Table striped className="mt-2 inquiryTable">
            <tbody>
              <tr>
                <td>{officeData?.name}</td>
                <td>اسم المكتب</td>
              </tr>
              <tr>
                <td>{officeData?.phone}</td>
                <td> رقم الهاتف</td>
              </tr>
              <tr>
                <td>{officeData?.email}</td>
                <td>البريد الالكتروني</td>
              </tr>
            </tbody>
          </Table>

          <Button className="cancelbtn" onClick={closeOfficeModal}>
            اغلاق
          </Button>
        </div>
      </Modal>
      <Table className="inquiryTable mt-auto mr-auto">
        <tbody>
          <tr>
            <th>الاسم</th>
            <td>{toArabic(emp.employee.employeesValues.name)}</td>
          </tr>
          <tr>
            <th> نوع الهوية</th>
            <td>{emp.employee.selectEmployeeValues.idType}</td>
          </tr>
          <tr>
            <th> الجنسية</th>
            <td>{emp.employee.selectEmployeeValues.nationality}</td>
          </tr>
          <tr>
            <th> رقم الهوية</th>
            <td>{toArabic(emp.employee.employeesValues.IdNumber)}</td>
          </tr>
          <tr>
            <th>جهة اصدار الهوية</th>
            <td>{toArabic(emp.employee.employeesValues.idSide)}</td>
          </tr>
          <tr>
            <th>تاريخ انتهاء الهوية</th>
            <td>{toArabic(emp.employee.employeeDates.IDFinishDate)} هـ</td>
          </tr>
          <tr>
            <th> الوظيفة </th>
            <td>{emp?.employee?.selectEmployeeValues?.employeeJob}</td>
          </tr>
          {emp.employee.employeeChecks.officeOwner && (
            <tr>
              <th> صاحب المكتب </th>
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
          )}
          {emp.employee.employeeChecks.manager && (
            <tr>
              <th> المدير المسؤل </th>
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
          )}
          {emp.employee.employeeChecks.EmployeeMeetConditions &&
            emp.employee.selectEmployeeValues.idTypeObject?.id == 1990 && (
              <tr>
                <th>
                  الموظف مستوفى شروط العمل النظامية من حيث الكفالة وعقد الأجير
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
            )}
          {emp.id !== 2032 && emp.id !== 2033 && (
            <tr>
              <th> التخصص</th>
              <td>{emp.employee.selectEmployeeValues.employeeSpecialty}</td>
            </tr>
          )}
          <tr>
            <th> اعلي مؤهل دراسي</th>
            <td>{emp.employee.employeesValues.highAcademicQualif}</td>
          </tr>

          <tr>
            <th> سنة التخرج</th>
            <td>{toArabic(emp.employee.employeesValues.graduiationYear)}</td>
          </tr>
          {emp.id !== 2032 && emp.id !== 2033 && (
            <>
              <tr>
                <th>المرحلة المهنية </th>
                <td>{emp.employee.selectEmployeeValues.empProfLevel}</td>
              </tr>
              <tr>
                <th>رقم شهادة الإعتماد المهني (الهندسي)</th>
                <td>
                  {toArabic(emp.employee.employeesValues.certificateNumber)}
                </td>
              </tr>

              <tr>
                <th>تاريخ الاصدار </th>
                <td>
                  {toArabic(emp.employee.employeeDates.certificateReleaseDate)}{" "}
                  هـ
                </td>
              </tr>

              <tr>
                <th>تاريخ الانتهاء </th>
                <td>
                  {toArabic(emp.employee.employeeDates.certificateFinishDate)}{" "}
                  هـ
                </td>
              </tr>
            </>
          )}
          {emp.employee.images.map(
            (im) =>
              Array.isArray(im.value) && (
                <tr>
                  {im.name === "CvFileEmpModal" ? (
                    <th>السيرة الذاتية</th>
                  ) : im.name === "specialityCertificateImgEmpModal" ? (
                    <th>صورة شهادة التخصص</th>
                  ) : im.name === "certificateFileEmpModal" ? (
                    <th>شهادة الإعتماد المهني (الهندسي)</th>
                  ) : (
                    <th>صورة الهوية</th>
                  )}
                  <td>
                    <img
                      onClick={() =>
                        window.open(
                          `${
                            (im.value[0].data?.includes("GISAPI") ||
                            im.value[0].data?.includes("gisAPI")
                              ? window.hostURL
                              : window.filesURL) +
                            "/" +
                            im.value[0].data
                          }`
                        )
                      }
                      alt="RegistRequestImg"
                      className="RegistRequestImg"
                      src={
                        ["PDF", "pdf"].includes(
                          im.value[0].data?.split(".").pop()
                        )
                          ? pdfImage
                          : ["DOCX", "docx", "DOC", "doc"].includes(
                              im.value[0].data?.split(".").pop()
                            )
                          ? wordImage
                          : (im.value[0].data?.includes("GISAPI") ||
                            im.value[0].data?.includes("gisAPI")
                              ? window.hostURL
                              : window.filesURL) +
                            "/" +
                            im.value[0].data
                      }
                      style={{
                        width: "100px",
                        borderRadius: "inherit",
                        // height: "inherit",
                      }}
                    />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </div>
  );
}
