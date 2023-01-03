import React from "react";
import { Modal } from "react-bootstrap";
import { Button, notification } from "antd";
import axios from "axios";

export default function UnApproveModal(props) {

  const doneReject = (e) => {
    let userToken = localStorage.getItem("token");
    const statusChanged = {
      description: "تم الغاء الاعتماد بنجاح",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "registSuccNotification",
    };
    const errorFound = {
      description: "حدث خطأ, يرجي مراجعة قسم الدعم الفني",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    axios
      .post(
        `${window.ApiUrl}/engineercompany/UnApprove/${props.res.id}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${userToken}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        notification.open(statusChanged);
        props.CloseUnapproveModal();
        props.changeTablesData(2, "updateOnly");
      }).catch(error=>notification.open(errorFound));
  };

  return (
    <Modal
      keyboard={false}
      onHide={props.CloseUnapproveModal}
      show={props.unApproveModalShow == props.res.id}
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <p className="confirmText">هل أنت متأكد من الغاء الاعتماد؟</p>
      <div className="confirmModalBtns">
        <Button className="cancelbtn" onClick={props.CloseUnapproveModal}>
          اغلاق
        </Button>
        <Button className="addbtn" onClick={doneReject}>
          حفظ
        </Button>
      </div>
    </Modal>
  );
}
