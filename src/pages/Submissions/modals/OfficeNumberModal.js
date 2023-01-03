import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import Loader from "../../../containers/Loader";

export default function OfficeNumberModal(props) {
  const [officeRegNum, setFormData] = useState("");
  const handleUserInput = (e) => {
    setFormData(e.target.value);
  };
  const [loading, setLoader] = useState(false);

  const [uniqueRegNum, setUniqueRegNum] = useState(true);
  const CheckUniqueValue = (value) => {
    setLoader(true);

    axios
      .get(
        `${window.ApiUrl}/api/engineeringcompany/CheckUnique/?key=office_id&q=${value}`
      )
      .then((res) => {
        setLoader(false);
        setUniqueRegNum(true);
      })
      .catch((error) => {
        setLoader(false);

        if (error.response && error.response.statusText === "Found") {
          setUniqueRegNum(false);
        }
      });
  };
  useEffect(() => {
    const timeoutId = setTimeout(
      () => officeRegNum !== "" && CheckUniqueValue(officeRegNum),
      1000
    );
    return () => clearTimeout(timeoutId);
  }, [officeRegNum]);
  const setRegNumber = () => {
    let userToken = localStorage.getItem("token");
    const numberChanged = {
      description: "تم تسجيل رقم المكتب بنجاح",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "registSuccNotification",
    }; const errorFound = {
      description: "حدث خطأ, يرجي مراجعة قسم الدعم الفني",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    if (uniqueRegNum === true) {
      axios
        .post(
          `${window.ApiUrl}/engineercompany/setofficeid?id=${props.res.id}&office_id=${officeRegNum}`,
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: `bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          notification.open(numberChanged);
          props.changeTablesData(1,'updateOnly');
        })
        .catch((error) => {notification.open(errorFound)});

      props.closeRegistNumberModal();
    }
  };
  return (
    <Modal
      keyboard={false}
      onHide={props.closeRegistNumberModal}
      show={props.res.id == props.showRegNumModal}
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {loading && <Loader />}
    
      <Form onFinish={setRegNumber} layout="vertical">
        <Form.Item name="officeRegNum" label="رقم تسجيل المكتب بالأمانة">
          <Input
            type="number"
            onChange={handleUserInput}
            name="officeRegNum"
            value={officeRegNum}
            placeholder="من فضلك ادخل رقم تسجيل المكتب بالأمانة"
          />
        </Form.Item>
        {!uniqueRegNum ? (
          <p className="errMsg">هذا الرقم مستخدم من قبل</p>
        ) : null}
        <div className="confirmModalBtns">
          <Button className="addbtn" htmlType="submit">
            حفظ
          </Button>
          <Button className="cancelbtn" onClick={props.closeRegistNumberModal}>
            اغلاق
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
