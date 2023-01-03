// export const tableBody=

import React, { useState } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { addOfficeDetails } from "../../../redux/actions/SetOfficeDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import axios from "axios";
import OfficeNumberModal from "../modals/OfficeNumberModal";
export const tableHeader = (
  <tr>
    <th>اسم المكتب الهندسي</th>
    <th>نوع المكتب الهندسي</th>
    <th>الاجراءات</th>
  </tr>
);

function AccreditationRequestsTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorFound = {
    description: "حدث خطأ اثناء استرجاع البيانات",
    duration: 7,
    placement: "bottomLeft",
    bottom: 5,
    className: "selectSureNotification",
  };
  const getViewDetails = (path) => {
    axios
      .get(`${window.hostURL}/${path.un_approve_path}`)
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

  const [showRegNumModal, setShowRegNumModal] = useState(false);
  const openRegistNumberModal = (e) => {
    setShowRegNumModal(e.target.id);
  };
  const closeRegistNumberModal = () => {
    setShowRegNumModal(false);
  };
  return (
    <>
      {props.t.RequestsData !== undefined &&
        props.t.RequestsData.length > 0 &&
        props.t.RequestsData.map((res, index) => (
          <tr
            key={res.id}
            style={{
              borderBottom: "1px solid #d4d6de",
            }}>
            <td>{res.name}</td> <td>{res.office_types.name}</td>
            <td>
              <Button className="showBtn" onClick={() => getViewDetails(res)}>
                عرض
              </Button>

              {props.viewOnly === true && (
                <Button
                  className="mx-2 showBtn"
                  id={res.id}
                  onClick={openRegistNumberModal}>
                  رقم المكتب
                </Button>
              )}
              <OfficeNumberModal
                changeTablesData={props.changeTablesData}
                res={res}
                showRegNumModal={showRegNumModal}
                closeRegistNumberModal={closeRegistNumberModal}
              />
            </td>
          </tr>
        ))}
    </>
  );
}

export default React.memo(AccreditationRequestsTable);
