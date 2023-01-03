import React from "react";
import { Table, Modal } from "react-bootstrap";
import { Button, Tabs } from "antd";
export default function ConfirmRegistModal(props) {
  const ConfirmRegist = () => {
    props.onRegist();
    props.openConfirmModal();
  };
  return (
    <Modal
      keyboard={false}
      className="AddOwnerModal confirmModal"
      style={{ textAlign: "right" }}
      show={props.showConfirmModal}
      onHide={props.openConfirmModal}
      backdrop="static"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <p className="confirmText">هل أنت متأكد من هذا الإجراء؟</p>
      <div className="confirmModalBtns mt-3" style={{ textAlign: "left" }}>
        <Button
          type="warning"
          className="showBtn ml-3"
          onClick={props.openConfirmModal}
        >
          لا
        </Button>
        <Button
          type="primary"
          className="showBtn ml-3"
          onClick={ConfirmRegist}
        >
          نعم
        </Button>
      </div>

  
    </Modal>
  );
}
