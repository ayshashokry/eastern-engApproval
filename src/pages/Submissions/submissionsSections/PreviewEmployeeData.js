import React, { useState, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import pdfImage from "../../../assets/images/pdfImage.png";
import wordImage from "../../../assets/images/wordImage.png";
import { toArabic } from "arabic-digits";
import { Button } from "antd";
import moment from "moment";
import { CheckUniqueSSN, getOfficeById } from "../../../apis/FetchApi";

export default function PreviewEmployeeData({ emp, allJobs }) {
  const [officeData, setOfficeData] = useState({});
  const [empFound, setEmpFound] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(null);
  const openOfficeModal = (id) => {
    setShowOfficeModal(id);
  };
  const closeOfficeModal = () => {
    setShowOfficeModal(null);
  };
  useEffect(() => {
    CheckUniqueSSN(emp?.ssn)
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
  }, []);
  return (
    <>
      <h5 className="empTitleName">
        {allJobs.find((obj) => obj.id == emp.emp_type_id.id)?.name}
      </h5>{" "}
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
            <td>{emp.name}</td>
          </tr>
          <tr>
            <th> نوع الهوية</th>
            <td>{emp.nationalidtype_id?.name}</td>
          </tr>
          <tr>
            <th> الجنسية</th>
            <td>{emp.nationality_id?.local_name}</td>
          </tr>
          <tr>
            <th> رقم الهوية</th>
            <td>{toArabic(emp.ssn)}</td>
          </tr>
          <tr>
            <th>جهة اصدار الهوية</th>
            <td>{emp.ssn_issue_name || emp.issue_name}</td>
          </tr>
          <tr>
            <th>تاريخ انتهاء الهوية</th>
            <td>
              {toArabic(
                moment(emp.ssn_end_date || emp.issue_date, "DD/MM/YYYY").format(
                  "YYYY/MM/DD"
                )
              )}
            </td>
          </tr>
          <tr>
            <th> الوظيفة </th>
            <td>
              {allJobs.find((obj) => obj.id == emp.emp_type_id?.id)?.name}
            </td>
          </tr>
          {emp.is_eng_comp_owner ? (
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
          ) : null}
          {emp.is_responsible ? (
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
          ) : null}
          {emp.nationalidtype_id?.id == 1990 ? (
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
          ) : null}
          {emp.emp_type_id?.id !== 2032 && emp.emp_type_id?.id !== 2033 && (
            <tr>
              <th> التخصص</th>
              <td>{emp.category_id?.name}</td>
            </tr>
          )}
          <tr>
            <th> اعلي مؤهل دراسي</th>
            <td>{emp.university}</td>
          </tr>
          <tr>
            <th> سنة التخرج</th>
            <td>{toArabic(emp.graduation_year)}</td>
          </tr>
          {emp.emp_type_id?.id !== 2032 && emp.emp_type_id?.id !== 2033 && (
            <>
              {emp.position_id !== undefined && emp.position_id !== null && (
                <tr>
                  <th>المرحلة المهنية </th>
                  <td>{emp.position_id?.name}</td>
                </tr>
              )}
              {emp.consultant_member_no !== undefined && (
                <tr>
                  <th>رقم شهادة الإعتماد المهني (الهندسي)</th>
                  <td>{toArabic(emp.consultant_member_no)}</td>
                </tr>
              )}
              {emp.consultant_start !== undefined && (
                <tr>
                  <th>تاريخ الاصدار </th>
                  <td>
                    {toArabic(
                      moment(emp.consultant_start, "DD/MM/YYYY").format(
                        "YYYY/MM/DD"
                      )
                    )}
                  </td>
                </tr>
              )}

              {emp.consultant_end !== undefined && (
                <tr>
                  <th>تاريخ الانتهاء </th>
                  <td>
                    {" "}
                    {toArabic(
                      moment(emp.consultant_end, "DD/MM/YYYY").format(
                        "YYYY/MM/DD"
                      )
                    )}
                  </td>
                </tr>
              )}
            </>
          )}
          {emp.cv_file !== undefined && (
            <tr>
             
              <th>السيرة الذاتية</th>

              <td>
                <img
                  onClick={() =>
                    window.open(
                      `${
                        (emp.cv_file?.includes("GISAPI") ||
                        emp.cv_file.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.cv_file
                      }`
                    )
                  }
                  alt="RegistRequestImg"
                  className="RegistRequestImg"
                  src={
                    ["PDF", "pdf"].includes(emp.cv_file.split(".").pop())
                      ? pdfImage
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          emp.cv_file.split(".").pop()
                        )
                      ? wordImage
                      : (emp.cv_file?.includes("GISAPI") ||
                        emp.cv_file.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.cv_file
                  }
                  style={{
                    width: "100px",
                    borderRadius: "inherit",
                    // height: "inherit",
                  }}
                />
              </td>
            </tr>
          )}
          {emp.certification_iamge !== undefined && (
            <tr>
              <th>صورة شهادة التخصص</th>

              <td>
                <img
                  onClick={() =>
                    window.open(
                      `${
                        (emp.certification_iamge?.includes("GISAPI") ||
                        emp.certification_iamge.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.certification_iamge
                      }`
                    )
                  }
                  alt="RegistRequestImg"
                  className="RegistRequestImg"
                  src={
                    ["PDF", "pdf"].includes(
                      emp.certification_iamge.split(".").pop()
                    )
                      ? pdfImage
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          emp.certification_iamge.split(".").pop()
                        )
                      ? wordImage
                      : (emp.certification_iamge?.includes("GISAPI") ||
                        emp.certification_iamge.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.certification_iamge
                  }
                  style={{
                    width: "100px",
                    borderRadius: "inherit",
                    // height: "inherit",
                  }}
                />
              </td>
            </tr>
          )}
          {emp.ssn_image !== undefined && (
            <tr>
              <th>صورة الهوية</th>

              <td>
                <img
                  onClick={() =>
                    window.open(
                      `${
                        (emp.ssn_image?.includes("GISAPI") ||
                        emp.ssn_image.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.ssn_image
                      }`
                    )
                  }
                  alt="RegistRequestImg"
                  className="RegistRequestImg"
                  src={
                    ["PDF", "pdf"].includes(emp.ssn_image.split(".").pop())
                      ? pdfImage
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          emp.ssn_image.split(".").pop()
                        )
                      ? wordImage
                      : (emp.ssn_image?.includes("GISAPI") ||
                        emp.ssn_image.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.ssn_image
                  }
                  style={{
                    width: "100px",
                    borderRadius: "inherit",
                    // height: "inherit",
                  }}
                />
              </td>
            </tr>
          )}
          {emp.saudi_reg !== undefined && emp.saudi_reg !== false &&emp.saudi_reg!==null&& (
            <tr>
              <th>شهادة الإعتماد المهني (الهندسي)</th>

              <td>
                <img
                  onClick={() =>
                    window.open(
                      `${
                        (emp.saudi_reg?.includes("GISAPI") ||
                        emp.saudi_reg?.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.saudi_reg
                      }`
                    )
                  }
                  alt="RegistRequestImg"
                  className="RegistRequestImg"
                  src={
                    ["PDF", "pdf"].includes(emp.saudi_reg?.split(".").pop())
                      ? pdfImage
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          emp.saudi_reg?.split(".").pop()
                        )
                      ? wordImage
                      : (emp.saudi_reg?.includes("GISAPI") ||
                        emp.saudi_reg?.includes("gisAPI")
                          ? window.hostURL
                          : window.filesURL) +
                        "/" +
                        emp.saudi_reg
                  }
                  style={{
                    width: "100px",
                    borderRadius: "inherit",
                    // height: "inherit",
                  }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
