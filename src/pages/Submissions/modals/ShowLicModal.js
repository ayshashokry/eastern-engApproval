import React from "react";
import { Modal, Table } from "react-bootstrap";
import {  Button } from "antd";
import { toArabic } from "arabic-digits";
import moment from "moment";

export default function SureModal(props) {
  return (
    <Modal
      keyboard={false}
      onHide={props.closeLicModal}
      show={props.LicShowModal == props.res.id}
      backdrop="static"
      className="AddOwnerModal confirmModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <div className="confirmModalBtns">
        <Table striped className="mt-2 inquiryTable">
          <thead>
            <tr>
              <th>تاريخ الانتهاء </th>
              <th>الرخصة </th>
            </tr>
          </thead>
          <tbody>
            {props.res.municipality_license?.end_date !== undefined && (
              <tr>
                <td>{toArabic(
                moment(props.res.municipality_license?.end_date, "DD/MM/YYYY").format("YYYY/MM/DD")
              )}</td>
                <td>رخصة البلدية </td>
              </tr>
            )}
            {props.res.saudi_license?.end_date !== undefined && (
              <tr>
                <td>
                
                
                
                {toArabic(
                moment(props.res.saudi_license?.end_date, "DD/MM/YYYY").format("YYYY/MM/DD")
              )}</td>
                <td>رخصة الجهة السعودية </td>
              </tr>
            )}
            {props.res.insurance_license?.end_date !== undefined && (
              <tr>
                <td>
                
                {toArabic(
                moment(props.res.insurance_license?.end_date, "DD/MM/YYYY").format("YYYY/MM/DD")
              )}
                
                </td>
                <td>رخصة التأمينات </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Button className="cancelbtn" onClick={props.closeLicModal}>
          اغلاق
        </Button>
      </div>
    </Modal>
  );
}
