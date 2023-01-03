// export const tableBody=

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ActiveFreezeOfficeModal from "../modals/ActiveFreezeOfficeModal";
import UnApproveModal from "../modals/UnApproveModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOfficeDetails } from "../../../redux/actions/SetOfficeDetails";
import { notification } from "antd";
import ShowLicModal from "../modals/ShowLicModal";
import moment from "moment-hijri";
import { toArabic } from "arabic-digits";
import Loader from "../../../containers/Loader";

export const tableHeader = (
  <tr>
    <th>اسم المكتب الهندسي</th>
    {/* <th>رقم التسجيل</th> */}
    <th>تاريخ انتهاء رخصة الهيئة السعودية </th>
    <th>نوع المكتب الهندسي</th>
    <th>الاجراءات</th>
  </tr>
);
function AllApprovedTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeModalShow, setActiveModalShow] = useState(null);
  const openActiveModal = (e) => {
    setActiveModalShow(e.target.id);
  };
  const closeActivateModal = () => {
    setActiveModalShow(null);
  };
  const [loader, setLoader] = useState(false);
  const errorFound = {
    description: "حدث خطأ اثناء استرجاع البيانات",
    duration: 7,
    placement: "bottomLeft",
    bottom: 5,
    className: "selectSureNotification",
  };
  const getViewDetails = (path) => {
    axios
      .get(`${window.hostURL}/${path.approve_path}`)
      .then((res) => {
        if (res) {
          dispatch(addOfficeDetails(path, props.viewOnly, props.selectedTab));
          navigate(`/submissions/${path.id}`);
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 404) {
          notification.open(errorFound);
        }
      });
  };
  const [unApproveModalShow, setUnapproveModalShow] = useState(false);
  const CloseUnapproveModal = () => {
    setUnapproveModalShow(false);
  };
  const openUnapproveModal = (e) => {
    setUnapproveModalShow(e.target.id);
  };

  const [LicShowModal, setLicShowModal] = useState(false);
  const closeLicModal = () => {
    setLicShowModal(false);
  };
  const openLicModal = (e) => {
    setLicShowModal(e.target.id);
  };
  return (
    <>
      {loader ? <Loader /> : null}
      {props.t.RequestsData !== undefined &&
        props.t.RequestsData.length > 0 &&
        props.t.RequestsData.map((res, index) => (
          <tr
            className={
              (res.municipality_license?.end_date !== undefined &&
                moment(
                  res.municipality_license?.end_date,
                  "iDD/iMM/iYYYY"
                ).isAfter(moment())) ||
              (res.insurance_license?.end_date !== undefined &&
                moment(
                  res.insurance_license?.end_date,
                  "iDD/iMM/iYYYY"
                ).isAfter(moment())) ||
              (res.saudi_license?.end_date !== undefined &&
                moment(res.saudi_license?.end_date, "iDD/iMM/iYYYY").isAfter(
                  moment()
                ))
                ? "redRow"
                : ""
            }
            key={res.id}
            style={{
              borderBottom: "1px solid #d4d6de",
            }}>
            <td>{res.name}</td>
            {/* <td></td>  */}
            <td>
              {res.saudi_license !== null ? (
                toArabic(
                  moment(res.saudi_license?.end_date, "iDD/iMM/iYYYY").format(
                    "iYYYY/iMM/iDD"
                  )
                )
              ) : (
                <span>----</span>
              )}
            </td>
            <td>{res.office_types.name}</td>
            <td>
              <Button
                className="showBtn m-1"
                onClick={() => getViewDetails(res)}>
                عرض
              </Button>

              <Button
                className={
                  (res.municipality_license?.end_date !== undefined &&
                    moment(
                      res.municipality_license?.end_date,
                      "iDD/iMM/iYYYY"
                    ).isAfter(moment())) ||
                  (res.insurance_license?.end_date !== undefined &&
                    moment(
                      res.insurance_license?.end_date,
                      "iDD/iMM/iYYYY"
                    ).isAfter(moment())) ||
                  (res.saudi_license?.end_date !== undefined &&
                    moment(
                      res.saudi_license?.end_date,
                      "iDD/iMM/iYYYY"
                    ).isAfter(moment()))
                    ? "m-1 deleteBtn"
                    : "showBtn"
                }
                id={res.id}
                onClick={openLicModal}>
                عرض التراخيص
              </Button>
              <ShowLicModal
                closeLicModal={closeLicModal}
                LicShowModal={LicShowModal}
                res={res}
              />
              <Button
                id={res.id}
                className={res.status === 1 ? "m-1 freezeBtn" : "m-1 showBtn"}
                onClick={openActiveModal}>
                {res.status === 1 ? "تجميد" : "تنشيط"}
              </Button>
              <ActiveFreezeOfficeModal
                setLoader={setLoader}
                activeModalShow={activeModalShow}
                changeTablesData={props.changeTablesData}
                closeActivateModal={closeActivateModal}
                res={res}
              />
              <Button
                className="deleteBtn m-1"
                id={res.id}
                onClick={openUnapproveModal}>
                الغاء الاعتماد
              </Button>
              <UnApproveModal
                unApproveModalShow={unApproveModalShow}
                CloseUnapproveModal={CloseUnapproveModal}
                changeTablesData={props.changeTablesData}
                res={res}
              />
            </td>
          </tr>
        ))}
    </>
  );
}

export default React.memo(AllApprovedTable);
