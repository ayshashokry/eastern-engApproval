import React from "react";
import { Table } from "react-bootstrap";
import pdfImage from "../../../assets/images/pdfImage.png";
import { toArabic } from "arabic-digits";
export default function StaffTable({
  j,
  officeData,
  VehicleFormsStep2swap,
  equipmentSurveyingBillsStep2swap,
}) {
  return (
    <>
      <p className="briefParagraph mt-3">اعتماد {j.approve?.name}</p>
      <Table className="inquiryTable mt-auto mr-auto">
        <tbody>
          <tr>
            <th>الفئة</th>
            <td>{j.class !== undefined && j.class.name}</td>
          </tr>
          <tr>
            <th> التخصص</th>
            <td>{j.category && j.category.name}</td>
          </tr>
          <tr>
            <th>الإدارة المقدم إليها طلب الاعتماد</th>
            <td>{j.approve !== undefined && j.approve.name}</td>
          </tr>

          {(officeData.specialization_data.approved_dep.machines_no_gps !==
            undefined ||
            officeData.specialization_data.approved_dep.machines_no_ts !==
              undefined) &&
            j.approve?.id === 228 && (
              <>
                {officeData.specialization_data.approved_dep.machines_no_gps !==
                  undefined && (
                  <tr>
                    <th>عدد أجهزة gps </th>
                    <td>
                      {toArabic(
                        officeData.specialization_data.approved_dep
                          .machines_no_gps
                      )}
                    </td>
                  </tr>
                )}
                {officeData.specialization_data.approved_dep.machines_no_ts !==
                  undefined && (
                  <tr>
                    <th>عدد أجهزة total station</th>
                    <td>
                      {toArabic(
                        officeData.specialization_data.approved_dep
                          .machines_no_ts
                      )}
                    </td>
                  </tr>
                )}

                {equipmentSurveyingBillsStep2swap &&
                  equipmentSurveyingBillsStep2swap.length >= 1 && (
                    <tr>
                      <th>صور فواتير المعدات واجهزة الرفع المساحي</th>
                      <td>
                        {equipmentSurveyingBillsStep2swap.length >= 1 &&
                          equipmentSurveyingBillsStep2swap.map((f) => (
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
                                  : (f.data?.includes("GISAPI") ||
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
                          ))}
                      </td>
                    </tr>
                  )}

                {VehicleFormsStep2swap.length >= 1 && (
                  <tr>
                    <th>صور استمارات سيارات دفع رباعي</th>
                    <td>
                      {VehicleFormsStep2swap.length >= 1 &&
                        VehicleFormsStep2swap.map((f) => (
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
                              ["PDF", "pdf"].includes(f.data?.split(".").pop())
                                ? pdfImage
                                : (f.data?.includes("GISAPI") ||
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
                        ))}
                    </td>
                  </tr>
                )}
              </>
            )}
        </tbody>
      </Table>
    </>
  );
}
