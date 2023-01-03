import React from "react";
import { Modal } from "react-bootstrap";
import { Button, notification } from "antd";
import axios from "axios";
export default function ActiveFreezeOfficeModal(props) {
  const activate = (e) => {
    let userToken = localStorage.getItem("token");
    const statusChanged = {
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
    };        props.setLoader(true)

    axios
      .post(
        `${window.ApiUrl}/engineercompany/SetMainStatus/${
          props.res.id
        }/${props.res.status === 1 ? 0 : 1}`,
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
        props.setLoader(false)
        statusChanged.description =
          props.res.status === 1
            ? "تم تجميد المكتب بنجاح"
            : "تم تنشيط المكتب بنجاح";
        notification.open(statusChanged);
        props.closeActivateModal();
        props.changeTablesData(2, "updateOnly");
      })
      .catch((error) => notification.open(errorFound));
  };

  return (
    <Modal
      keyboard={false}
      onHide={props.closeActivateModal}
      show={props.res.id == props.activeModalShow}
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <p className="confirmText">
        هل أنت متأكد من {props.res.status === 1 ? " تجميد " : " تنشيط "}
        المكتب ؟؟
      </p>
      <div className="confirmModalBtns">
        <Button className="showBtn ml-3" onClick={props.closeActivateModal}>
          لا
        </Button>
        <Button className="showBtn ml-3" onClick={activate}>
          نعم
        </Button>
      </div>
    </Modal>
  );
}
