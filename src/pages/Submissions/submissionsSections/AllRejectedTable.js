// export const tableBody=

import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOfficeDetails } from "../../../redux/actions/SetOfficeDetails";
import { notification } from "antd";
export const tableHeader = (
  <tr>
    <th>اسم المكتب الهندسي</th>
    <th>نوع المكتب الهندسي</th>
    <th>الاجراءات</th>
  </tr>
);
 function AllApprovedTable(props) {
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
  return (
    <>
      {props.t.RequestsData !== undefined &&
        props.t.RequestsData.length > 0 &&
        props.t.RequestsData.map((res, index) => (
          <tr
            index={res.id}
            style={{
              borderBottom: "1px solid #d4d6de",
            }}>
            <td>{res.name}</td> <td>{res.office_types.name}</td>
            <td>
              <Button className="showBtn" onClick={() => getViewDetails(res)}>
                عرض
              </Button>
            </td>
          </tr>
        ))}
    </>
  );
}


export default React.memo(AllApprovedTable)