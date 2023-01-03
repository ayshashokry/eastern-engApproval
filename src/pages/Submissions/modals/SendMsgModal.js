import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, notification } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function SendMsgModal(props) {
  const [msgText, setMsgText] = useState("");
  const params = useParams();
  const handleInputMsg = (e) => {
    setMsgText(e.target.value);
  };

  const sendMsg = (e) => {
    let userToken = localStorage.getItem("token");

    const statusChanged = {
      description: "تم ارسال الرسالة بنجاح",
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

    axios
      .post(
        `${window.ApiUrl}/SendSms`,
        { MessageText: msgText, MobileNo: [], Submission_id: params.id },
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
        props.CloseSureModal();
      }).catch(error=>notification.open(errorFound));
  };

  return (
    <Modal
      keyboard={false}
      onHide={props.CloseSureModal}
      show={props.msgModalShow}
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Form onFinish={sendMsg} layout="vertical">
        <Form.Item
          name="msgText"
          label="نص الرسالة"
          rules={[
            {
              message: "من فضلك ادخل نص الرسالة",
              required: true,
            },
          ]}>
          <Input
            onChange={handleInputMsg}
            name="msgText"
            value={msgText}
            placeholder="من فضلك ادخل نص الرسالة"
          />
        </Form.Item>

        <div className="confirmModalBtns">
          <Button className="addbtn" htmlType="submit">
            حفظ
          </Button>
          <Button className="cancelbtn" onClick={props.CloseSureModal}>
            اغلاق
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
