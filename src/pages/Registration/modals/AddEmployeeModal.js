import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Checkbox, Upload } from "antd";
import { Container } from "react-bootstrap";
import axios from "axios";
import { DownCircleFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-hijri";
import DatePicker from "react-multi-date-picker";
import { CloudUploadOutlined } from "@material-ui/icons";

import { faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";
export default function AddEmployeeModal(props) {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Container fluid>
      <div>
        <h5 className="px-5 pt-4">
          <span>
            <FontAwesomeIcon
              icon={faTimes}
              className=" fa-1x"
              onClick={props.closeAddEmployeeModal}
              style={{
                textAlign: "left",
                float: "left",
                cursor: "pointer",
              }}
            />
          </span>
          تفاصيل الموظف
        </h5>
      </div>

      <Form
        ref={props.Step2AddFormRef}
        initialValues={{
          nationality:
            props.selectEmployeeValues.nationality !== null &&
            props.selectEmployeeValues.nationality,
        }}
        onFinish={props.saveAddNewEmployee}
        className="my-4 px-md-5 regForms"
        layout="vertical"
        name="validate_other">
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل الإسم",
              required: true,
            },
          ]}
          name="name"
          hasFeedback
          label="الإسم">
          <Input
            name="name"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues?.name}
            placeholder="الإسم"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل نوع الهوية",
              required: true,
            },
          ]}
          name="idType"
          hasFeedback
          label="نوع الهوية">
          <Select
            suffixIcon={<DownCircleFilled />}
            className="dont-show"
            onChange={props.handleEmployeeSelect("idType", "idTypeObject")}
            value={props.selectEmployeeValues.idTypeObject?.id}
            placeholder="اختر نوع الهوية"
            getPopupContainer={(trigger) => trigger.parentNode}
            optionFilterProp="value"
            filterOption={(input, option) => option.value.indexOf(input) >= 0}>
            {props.IDTypes && props.IDTypes.length !== 0
              ? props.IDTypes.map((inq, index) => (
                  <Select.Option
                    className="selectgroup"
                    value={inq.name}
                    key={inq.id}
                    id={inq.id}
                    obj={inq}
                    passport={inq.passport}>
                    {inq.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={
            props.selectEmployeeValues.nationality !== null &&
            props.selectEmployeeValues.nationality
          }
          rules={[
            {
              message: "من فضلك ادخل الجنسية",
              required: true,
            },
          ]}
          name="nationality"
          hasFeedback
          label="الجنسية">
          <Select
            suffixIcon={<DownCircleFilled />}
            className="dont-show"
            onChange={props.handleEmployeeSelect(
              "nationality",
              "nationalityObject"
            )}
            value={
              props.selectEmployeeValues.nationalityObject !== null &&
              props.selectEmployeeValues.nationalityObject.id
            }
            placeholder="اختر الجنسية"
            getPopupContainer={(trigger) => trigger.parentNode}
            optionFilterProp="value"
            filterOption={(input, option) => option.value.indexOf(input) >= 0}>
            {props.nationalities && props.nationalities.length !== 0
              ? props.nationalities
                  .sort((a, b) => (a.sort_id > b.sort_id ? 1 : -1))
                  .sort((a, b) => (a.sort_id === 0) - (b.sort_id === 0))
                  .map((inq, index) => (
                    <Select.Option
                      className="selectgroup"
                      value={inq.local_name}
                      key={inq.id}
                      obj={inq}
                      id={inq.id}>
                      {inq.local_name}
                    </Select.Option>
                  ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item
          name="IdNumber"
          hasFeedback
          label="رقم الهوية"
          rules={[
            {
              message: "من فضلك ادخل رقم الهوية",
              required: true,
            },

            {
              min:
                props.selectEmployeeValues.idTypeObject?.id === 1890
                  ? 10
                  : props.selectEmployeeValues.idTypeObject?.id === 1990
                  ? 10
                  : 8,
              message:
                props.selectEmployeeValues.idTypeObject?.id === 1890
                  ? "رقم الهوية لا يقل عن 10 أرقام"
                  : props.selectEmployeeValues.idTypeObject?.id === 1990
                  ? "رقم الهوية لا يقل عن 10 أرقام"
                  : "رقم الهوية لا يقل عن 8 أرقام",
            },
            {
              max:
                props.selectEmployeeValues.idTypeObject?.id === 1890
                  ? 10
                  : props.selectEmployeeValues.idTypeObject?.id === 1990
                  ? 10
                  : 14,
              message:
                props.selectEmployeeValues.idTypeObject?.id === 1890
                  ? "رقم الهوية لا يزيد عن 10 أرقام"
                  : props.selectEmployeeValues.idTypeObject?.id === 1990
                  ? "رقم الهوية لا يزيد عن 10 أرقام"
                  : "رقم الهوية لا يزيد عن 14 رقم",
            },
            {
              pattern:
                props.selectEmployeeValues.idTypeObject.id === 1890
                  ? new RegExp(/^1/)
                  : props.selectEmployeeValues.idTypeObject.id === 1990
                  ? new RegExp(/^2/)
                  : null,
              message:
                props.selectEmployeeValues.idTypeObject.id === 1890
                  ? "يجب أن يبدأ رقم الهوية بالرقم 1"
                  : props.selectEmployeeValues.idTypeObject.id === 1990
                  ? "يجب أن يبدأ رقم الهوية بالرقم 2"
                  : null,
            },
            () => ({
              validator(_, value) {
                if (
                  props.selectedEmployees?.find(
                    (e) =>
                      e !== false &&
                      e !== undefined &&
                      e.employee !== undefined &&
                      e.employee.employeesValues.IdNumber == value
                  )
                ) {
                  return Promise.reject("رقم الهوية موجود مسبقا");
                }

                return Promise.resolve();
              },
            }),
          ]}>
          <Input
            type="number"
            onChange={props.handleEmployeesInput}
            onInput={props.handleEmployeesInput}
            // onKeyPress={keyPressMobile}
            name="IdNumber"
            value={props.employeesValues.IdNumber}
            placeholder="ادخل رقم الهوية"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل جهة اصدار الهوية",
              required: true,
            },
          ]}
          name="idSide"
          hasFeedback
          label="جهة اصدار الهوية">
          <Input
            name="idSide"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues.idSide}
            placeholder="جهة اصدار الهوية"
          />
        </Form.Item>

        <div className="calendatFormInput">
          <span>
            <FontAwesomeIcon className="calendarFormIcon" icon={faCalendar} />
          </span>
          <Form.Item
            name="IDFinishDate"
            label="تاريخ انتهاء الهوية "
            rules={[
              {
                message: "من فضلك ادخل تاريح انتهاء الهوية  ",
                required: true,
              },
            ]}>
            <DatePicker
              editable={false}
              minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
              placeholder="أختر تاريخ الانتهاء"
              value={props.employeeDates.commercial_reg_end_date}
              onChange={props.onSelectEmployeeDate("IDFinishDate")}
              locale="ar"
              calendar="arabic"
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل الوظيفة  ",
              required: true,
            },
          ]}
          name="employeeJob"
          hasFeedback
          label="الوظيفة ">
          <Select
            suffixIcon={<DownCircleFilled />}
            className="dont-show"
            onChange={props.handleEmployeeSelect(
              "employeeJob",
              "employeeJobObject"
            )}
            value={props.selectEmployeeValues?.employeeJobObject?.id}
            placeholder="اختر الوظيفة "
            getPopupContainer={(trigger) => trigger.parentNode}
            optionFilterProp="value"
            filterOption={(input, option) => option.value.indexOf(input) >= 0}>
            {props.jobs && props.jobs.length !== 0
              ? props.jobs.map((inq, index) => (
                  <Select.Option
                    className="selectgroup"
                    value={inq.name}
                    key={inq.id}
                    obj={inq}
                    id={inq.id}>
                    {inq.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>

        {props.selectedEmployees?.find(
          (x) =>
            x !== undefined &&
            x !== false &&
            x.employee !== undefined &&
            x.employee.employeeChecks.officeOwner === true
        ) !== undefined ? null : (
          <Form.Item
            name="officeOwner"
            className="checkDiv"
            valuePropName="checked">
            <Checkbox
              name="officeOwner"
              className="ml-3"
              onChange={props.employeeCheckOk}>
              صاحب المكتب
            </Checkbox>
          </Form.Item>
        )}

        {props.selectedEmployees?.find(
          (x) =>
            x !== false &&
            x !== undefined &&
            x.employee !== undefined &&
            x.employee.employeeChecks.manager === true
        ) !== undefined ? null : (
          <Form.Item
            name="manager"
            className="checkDiv"
            valuePropName="checked">
            <Checkbox
              name="manager"
              className="ml-3"
              onChange={props.employeeCheckOk}>
              المدير المسئول
            </Checkbox>
          </Form.Item>
        )}
        {props.selectEmployeeValues.employeeJob !== "رسام" &&
          props.selectEmployeeValues.employeeJob !== "مساح" && (
            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل التخصص  ",
                  required: true,
                },
              ]}
              name="employeeSpecialty"
              hasFeedback
              label="التخصص ">
              <Select
                suffixIcon={<DownCircleFilled />}
                className="dont-show"
                onChange={props.handleEmployeeSelect(
                  "employeeSpecialty",
                  "employeeSpecialtyObject"
                )}
                value={props.selectEmployeeValues.employeeSpecialtyObject?.id}
                placeholder="اختر التخصص "
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }>
                {props.employeeSpecialities &&
                props.employeeSpecialities.length !== 0
                  ? props.employeeSpecialities.map((inq, index) => (
                      <Select.Option
                        className="selectgroup"
                        value={inq.name}
                        key={inq.id}
                        obj={inq}
                        id={inq.id}>
                        {inq.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          )}
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل اعلي مؤهل دراسي",
              required: true,
            },
          ]}
          name="highAcademicQualif"
          hasFeedback
          label="اعلي مؤهل دراسي">
          <Input
            name="highAcademicQualif"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues.highAcademicQualif}
            placeholder="اعلي مؤهل دراسي"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل سنة التخرج",
              required: true,
            },
            () => ({
              validator(_, value) {
                if (Number(value) < 1000) {
                  return Promise.reject("لا يجب ان تقل سنة التخرج عن 1000");
                }

                return Promise.resolve();
              },
            }),
          ]}
          name="graduiationYear"
          hasFeedback
          label="سنة التخرج">
          <Input
            type="number"
            name="graduiationYear"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues.graduiationYear}
            placeholder="سنة التخرج"
          />
        </Form.Item>
        {props.selectEmployeeValues.employeeJob !== "رسام" &&
          props.selectEmployeeValues.employeeJob !== "مساح" && (
            <>
              <Form.Item
                rules={[
                  {
                    message: "من فضلك ادخل المرحلة المهنية ",
                    required: true,
                  },
                ]}
                name="empProfLevel"
                hasFeedback
                label="المرحلة المهنية">
                <Select
                  suffixIcon={<DownCircleFilled />}
                  className="dont-show"
                  onChange={props.handleEmployeeSelect(
                    "empProfLevel",
                    "empProfLevelObject"
                  )}
                  value={props.selectEmployeeValues.empProfLevelObject?.id}
                  placeholder="اختر المرحلة المهنية"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  optionFilterProp="value"
                  filterOption={(input, option) =>
                    option.value.indexOf(input) >= 0
                  }>
                  {props.professionaLevels &&
                  props.professionaLevels.length !== 0
                    ? props.professionaLevels.map((inq, index) => (
                        <Select.Option
                          className="selectgroup"
                          value={inq.name}
                          key={inq.id}
                          obj={inq}
                          id={inq.id}>
                          {inq.name}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    message:
                      "من فضلك ادخل رقم شهادة الإعتماد المهني (الهندسي)ج",
                    required: true,
                  },
                  () => ({
                    validator(_, value) {
                      if (
                        props.selectedEmployees?.find(
                          (e) =>
                            e !== false &&
                            e !== undefined &&
                            e.employee !== undefined &&
                            e.employee.employeesValues.certificateNumber ==
                              value
                        )
                      ) {
                        return Promise.reject("رقم الشهادة موجود مسبقا");
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
                name="certificateNumber"
                hasFeedback
                label="رقم شهادة الإعتماد المهني (الهندسي)">
                <Input
                  type="number"
                  name="certificateNumber"
                  onChange={props.handleEmployeesInput}
                  value={props.employeesValues.certificateNumber}
                  placeholder="رقم شهادة الإعتماد المهني (الهندسي)"
                />
              </Form.Item>
              <div className="calendatFormInput">
                <span>
                  <FontAwesomeIcon
                    className="calendarFormIcon"
                    icon={faCalendar}
                  />
                </span>
                <Form.Item
                  name="certificateReleaseDate"
                  label="تاريخ الاصدار  "
                  rules={[
                    {
                      message: "من فضلك ادخل تاريح الاصدار  ",
                      required: true,
                    },
                  ]}>
                  <DatePicker
                    editable={false}
                    maxDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                    placeholder="أختر تاريخ الاصدار"
                    value={props.employeeDates.certificateReleaseDate}
                    onChange={props.onSelectEmployeeDate(
                      "certificateReleaseDate"
                    )}
                    locale="ar"
                    calendar="arabic"
                  />
                </Form.Item>
              </div>
              <div className="calendatFormInput">
                <span>
                  <FontAwesomeIcon
                    className="calendarFormIcon"
                    icon={faCalendar}
                  />
                </span>
                <Form.Item
                  name="certificateFinishDate"
                  label="تاريخ الانتهاء  "
                  rules={[
                    {
                      message: "من فضلك ادخل تاريح الانتهاء  ",
                      required: true,
                    },
                  ]}>
                  <DatePicker
                    editable={false}
                    minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                    placeholder="أختر تاريخ الانتهاء"
                    value={props.employeeDates.certificateFinishDate}
                    onChange={props.onSelectEmployeeDate(
                      "certificateFinishDate"
                    )}
                    locale="ar"
                    calendar="arabic"
                  />
                </Form.Item>
              </div>
            </>
          )}

        {props.selectEmployeeValues.employeeJob !== "رسام" &&
        props.selectEmployeeValues.employeeJob !== "مساح"
          ? props.empModalFiles.map((f) => (
              <Form.Item
                className={
                  props.uploadedImagesSingle[f.name].length > 0
                    ? ["PDF", "pdf"].includes(
                        props.uploadedImagesSingle[f.name][0].data
                          .split(".")
                          .pop()
                      )
                      ? "pdfFileee"
                      : ["PDF", "pdf"].includes(
                          props.uploadedImagesSingle[f.name][0].data
                            .split(".")
                            .pop()
                        )
                      ? "wordFileee"
                      : ""
                    : ""
                }
                name={f.name}
                valuePropName="list"
                getValueFromEvent={normFile}
                rules={[
                  {
                    message: `من فضلك قم بإرفاق ${f.label}`,
                    required: true,
                  },
                ]}
                label={f.label}>
                <Upload
                  accept={
                    f.name == "CvFileEmpModal"
                      ? ".pdf,.PDF,.docx,.DOCX,DOC,doc"
                      : ".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG"
                  }
                  className={
                    props.uploadedImagesSingle[f.name].length > 0
                      ? ["PDF", "pdf"].includes(
                          props.uploadedImagesSingle[f.name][0]?.data
                            .split(".")
                            .pop()
                        )
                        ? "pdfFileee"
                        : ["DOCX", "docx", "DOC", "doc"].includes(
                            props.uploadedImagesSingle[f.name][0]?.data
                              .split(".")
                              .pop()
                          )
                        ? "wordFileee"
                        : ""
                      : null
                  }
                  fileList={
                    props.uploadedImagesSingle[f.name].length > 0
                      ? props.uploadedImagesSingle[f.name]
                      : []
                  }
                  onRemove={props.DeleteSingleImage(f.name)}
                  beforeUpload={() => false}
                  multiple={false}
                  listType={"picture-card"}
                  onChange={props.SetSingleFileUpload(f.name)}>
                  <Button block className="ant-uploaded">
                    تحميل <CloudUploadOutlined />
                  </Button>
                </Upload>
              </Form.Item>
            ))
          : props.empModalFiles.slice(0, 3).map((f) => (
              <Form.Item
                name={f.name}
                valuePropName="list"
                getValueFromEvent={normFile}
                rules={[
                  {
                    message: `من فضلك قم بإرفاق ${f.label}`,
                    required: true,
                  },
                ]}
                label={f.label}>
                <Upload
                  accept={
                    f.name == "CvFileEmpModal"
                      ? ".pdf,.PDF,.docx,.DOCX,doc,DOC"
                      : ".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG"
                  }
                  className={
                    props.uploadedImagesSingle[f.name].length > 0
                      ? ["PDF", "pdf"].includes(
                          props.uploadedImagesSingle[f.name][0]?.data
                            .split(".")
                            .pop()
                        )
                        ? "pdfFileee"
                        : ["DOCX", "docx", "DOC", "doc"].includes(
                            props.uploadedImagesSingle[f.name][0]?.data
                              .split(".")
                              .pop()
                          )
                        ? "wordFileee"
                        : ""
                      : null
                  }
                  fileList={
                    props.uploadedImagesSingle[f.name].length > 0
                      ? props.uploadedImagesSingle[f.name]
                      : []
                  }
                  onRemove={props.DeleteSingleImage(f.name)}
                  beforeUpload={() => false}
                  multiple={false}
                  listType={"picture-card"}
                  onChange={props.SetSingleFileUpload(f.name)}>
                  <Button block className="ant-uploaded">
                    تحميل <CloudUploadOutlined />
                  </Button>
                </Upload>
              </Form.Item>
            ))}
        {Number(props.selectEmployeeValues.idTypeObject?.id) === 1990 && (
          <Form.Item
            name="EmployeeMeetConditions"
            className="checkDiv"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("من فضلك وافق علي الشروط")),
              },
            ]}>
            <Checkbox
              name="EmployeeMeetConditions"
              className="ml-3"
              onChange={props.employeeCheckOk}>
              الموظف مستوفى شروط العمل النظامية من حيث الكفالة وعقد الأجير
            </Checkbox>
          </Form.Item>
        )}
        <div className="pt-4" style={{ textAlign: "left" }}>
          <Button type="primary" htmlType="submit" className="showBtn">
            حفظ
          </Button>
        </div>
      </Form>
    </Container>
  );
}
