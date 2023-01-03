import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { changeOfficeStatus } from "../../../helpers/changeOfficeStatus";
import { useSelector } from "react-redux";
import axios from "axios";
import { approveSubmission } from "../../../apis/FetchApi";
import moment from "moment-hijri";

export default function SureModal(props) {
  const officeDetails = useSelector((state) => state.officeDetailsReducer);
  const [officeData, setOfficeData] = useState({});
  const [officeTypeID, setOfficeTypeID] = useState("");
  const [jsonFile, setJsonFile] = useState({});
  let unApPath = officeDetails.officeDetails.un_approve_path;
  useEffect(() => {
    axios
      .get(`${window.hostURL}/${unApPath}`)
      .then((res) => {
        setJsonFile(res.data);
        setOfficeData(res.data);
        setOfficeTypeID(
          res.data.office_data.eng_company_data.office_type_id?.id
        );
      })
      .catch((error) => console.log(error));
  }, [unApPath]);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${window.ApiUrl}/api/Department?q=1&filter_key=approving_dep&operand==`
      )
      .then((res) => {
        setDepartments(res.data.results);
      });
  }, []);
  const navigate = useNavigate();
  const [rejectReason, setRejectReason] = useState("");
  const [acceptReason, setacceptReason] = useState("");

  const handleInputReject = (e) => {
    setRejectReason(e.target.value);
  };

  const handleInputAccept = (e) => {
    setacceptReason(e.target.value);
  };
  const doneReject = (e) => {
    let approveData = {
      eng_approved: "ENG_COMPANY_APPROVE.ENGCOMPDETAILS",
      app_id: 13,
      module: "engCompanyRegister",
      engComp: {
        ...officeData.office_data.eng_company_data,
        office_type_id: officeTypeID,
      },
    };
    let registEmployees = [];
    officeData.specialization_data.engineers_data.main_engineers_model.length >
      0 &&
      officeData.specialization_data.engineers_data.main_engineers_model.map(
        (j) => {
          if (j !== undefined) {
            j = {
              ...j,
              nationalidtype_id: j.nationalidtype_id.id,
              category_id:
                j.category_id.id !== "" &&
                j.category_id.id !== null &&
                j.category_id.id !== 0
                  ? Number(j.category_id?.id)
                  : null,
              nationality_id: j.nationality_id?.id,
              emp_type_id: j.emp_type_id?.id,
              position_id: j.position_id?.id,
            };
            registEmployees.push(j);
          }
        }
      );
    let userToken = localStorage.getItem("token");
    let surveyData = officeData.specialization_data.approved_dep.machines_no_gps
      ? {
          machines_image:
            officeData.specialization_data.approved_dep.machines_image,
          form_image: officeData.specialization_data.approved_dep.form_image,
          machines_no_gps:
            officeData.specialization_data.approved_dep.machines_no_gps,
          machines_no_ts:
            officeData.specialization_data.approved_dep.machines_no_ts,
        }
      : null;

    if (props.rejectModalShow === true) {
      let rejObj = {
        comment: rejectReason,
        date: moment(new Date()).format("iYYYY/iMM/iDD"),
        department: departments.filter(
          (d) => d.id == JSON.parse(localStorage.getItem("user")).department_id
        )[0].name,
      };

      Array.isArray(officeData.rejections) &&
      officeData.rejections !== undefined &&
      officeData.rejections.length > 0
        ? officeData.rejections.push(rejObj)
        : (officeData.rejections = [rejObj]);
    }

    approveData.engComp.id = officeDetails.officeDetails.id;
    officeDetails.officeDetails.department_eng_comp.map(
      (a) => (a.is_modified = 1)
    );
    approveData.engComp.department_eng_comp =
      officeDetails.officeDetails.department_eng_comp;
    approveData.engComp.address =
      officeData.office_data.office_info_licences.address;
    approveData.saudi_eng_license =
      officeData.specialization_data.saudi_eng_license;
    approveData.employess = registEmployees;
    approveData.lics = Object.values(officeData.licences).map((x) => x);
    // approveData.lics = approveData.push(
    //   officeData.specialization_data.saudi_eng_license
    // );
    approveData.surveyData = surveyData;
    approveData.rejections = officeData.rejections;
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
    };
    if (props.rejectModalShow === true) {
      approveData.engComp.office_type_id =
        officeData.office_data.eng_company_data.office_type_id;

      changeOfficeStatus(
        "refuse",
        userToken,
        officeDetails.officeDetails.id,
        rejectReason,
        officeData
      )
        .then((res) => {
          statusChanged.description = "تم الاعتذار بنجاح";
          notification.open(statusChanged);
          props.CloseSureModal();
          navigate("/submissions");
        })
        .catch((error) => {
          notification.open(errorFound);
          props.CloseSureModal();
        });
    }
    if (props.acceptModalShow === true) {
      approveData.json_file = jsonFile;
      approveSubmission(approveData)
        .then((res) => {
          statusChanged.description = "تم الموافقة بنجاح";

          notification.open(statusChanged);
          props.CloseSureModal();
          navigate("/submissions");
        })
        .catch((error) => {
          if (error && error.response && error.response.status === 302) {
            notification.open(statusChanged);
            navigate("/submissions");
          } else {
            notification.open(errorFound);
          }
          props.CloseSureModal();
        });
    }
  };

  return (
    <Modal
      keyboard={false}
      onHide={props.CloseSureModal}
      show={
        props.acceptModalShow === true
          ? props.acceptModalShow
          : props.rejectModalShow === true
          ? props.rejectModalShow
          : false
      }
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Form onFinish={doneReject} layout="vertical">
        {props.acceptModalShow ? (
          <Form.Item
            name="acceptReason"
            label="نص الرسالة"
            rules={[
              {
                message: "من فضلك ادخل نص الرسالة",
                required: true,
              },
            ]}>
            <Input
              onChange={handleInputAccept}
              name="acceptReason"
              value={acceptReason}
              placeholder="من فضلك ادخل نص الرسالة"
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="rejectReason"
            label="سبب الاعتذار"
            rules={[
              {
                message: "من فضلك سبب الاعتذار",
                required: true,
              },
            ]}>
            <Input
              onChange={handleInputReject}
              name="rejectReason"
              value={rejectReason}
              placeholder="من فضلك ادخل سبب الاعتذار"
            />
          </Form.Item>
        )}
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
