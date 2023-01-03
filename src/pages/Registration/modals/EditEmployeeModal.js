import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Checkbox, Upload } from "antd";
import { Container } from "react-bootstrap";
import axios from "axios";
import { DownCircleFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-hijri";
import DatePicker from "react-multi-date-picker";
import { CloudUploadOutlined } from "@material-ui/icons";

import { faTimes, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../containers/Loader";
import {
  getNationalityType,
  getProfessioalLevels,
} from "../../../apis/FetchApi";
export default function EmployeeModal(props) {
  const [loading, setLoader] = useState(false);
  const [professionaLevels, setProfessionaLevels] = useState([]);

  useEffect(() => {
    if (props.jobDetails.mandatory == 1) {
      props.setEmployeeSpecialityByDefault(props.jobDetails);
    }

    //get professional Level

    getProfessioalLevels()
      .then((res) => {
        setLoader(false);
        if (res?.data?.results !== undefined) {
          setProfessionaLevels(res.data.results);
        }
      })
      .catch(() => setLoader(false));
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Container fluid>
      <div>
        {/* <p>{props.showEditModal}</p> */}
        <h5 className="px-5 pt-4">
          <span>
            <FontAwesomeIcon
              icon={faTimes}
              className=" fa-1x"
              onClick={props.closeEditModal}
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
      {loading ? <Loader /> : false}
      <Form
        ref={props.Step2EditFormRef}
        onFinish={props.saveEmployeeData(props.jobDetails)}
        className="my-4 px-md-5 regForms"
        layout="vertical"
        name="validate_other"
        initialValues={{
          // name:
          //   props.jobDetails?.employee &&
          //   props.jobDetails?.employee?.employeesValues?.name,

          idType:
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.selectEmployeeValues &&
            props.jobDetails?.employee?.selectEmployeeValues?.idType,

          nationality:
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.selectEmployeeValues &&
            props.jobDetails?.employee?.selectEmployeeValues.nationality,
          // IdNumber:
          //   props.jobDetails?.employee &&
          //   props.jobDetails?.employee?.employeesValues?.IdNumber,
          employeeJob:
            props.jobDetails?.employee?.selectEmployeeValues?.employeeJob,
          employeeSpecialty:
            props.jobDetails.mandatory == 1
              ? props.jobDetails?.category?.name
              : props.jobDetails?.employee?.selectEmployeeValues
                  ?.employeeSpecialty,
          empProfLevel:
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.selectEmployeeValues &&
            props.jobDetails?.employee?.selectEmployeeValues.empProfLevel,
        }}>
        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل الإسم",
              required: true,
            },
          ]}
          name="name"
          initialValue={
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.employeesValues?.name
          }
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
          // initialValue={
          //   props.selectEmployeeValues.idType !== null
          //     ? props.selectEmployeeValues?.idType
          //     : props?.jobDetails?.employee &&
          //       props.jobDetails?.employee?.selectEmployeeValues &&
          //       props.jobDetails?.employee?.selectEmployeeValues?.idType
          // }
          name="idType"
          hasFeedback
          label="نوع الهوية">
          <Select
            suffixIcon={<DownCircleFilled />}
            className="dont-show"
            onChange={props.handleEmployeeSelect("idType", "idTypeObject")}
            value={props.selectEmployeeValues?.idTypeObject?.id}
            placeholder="اختر نوع الهوية"
            getPopupContainer={(trigger) => trigger.parentNode}
            optionFilterProp="value"
            filterOption={(input, option) => option.value.indexOf(input) >= 0}>
            {props.IDTypes !== null && props.IDTypes?.length !== 0
              ? props.IDTypes.map((inq, index) => (
                  <Select.Option
                    className="selectgroup"
                    value={inq.name}
                    key={inq.id}
                    obj={inq}
                    id={inq.id}
                    passport={inq.passport}>
                    {inq.name}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
        {props.nationalities !== null && props.nationalities?.length > 0 ? (
          <Form.Item
            rules={[
              {
                message: "من فضلك ادخل الجنسية",
                required: true,
              },
            ]}
            // initialValue={
            //   props.selectEmployeeValues.nationality !== null
            //     ? props.selectEmployeeValues?.nationality
            //     : props.jobDetails?.employee &&
            //       props.jobDetails?.employee?.selectEmployeeValues &&
            //       props.jobDetails?.employee?.selectEmployeeValues?.nationality

            // }
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
                props.selectEmployeeValues?.nationalityObject !== null &&
                props.selectEmployeeValues?.nationalityObject?.id
              }
              placeholder="اختر الجنسية"
              getPopupContainer={(trigger) => trigger.parentNode}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option.value.indexOf(input) >= 0
              }>
              {props.nationalities
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
                ))}
            </Select>
          </Form.Item>
        ) : null}
        <Form.Item
          name="IdNumber"
          hasFeedback
          label="رقم الهوية"
          initialValue={
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.employeesValues?.IdNumber
          }
          rules={[
            {
              message: "من فضلك ادخل رقم الهوية",
              required: true,
            },

            {
              min:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? 10
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
                  ? 10
                  : 8,
              message:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? "رقم الهوية لا يقل عن 10 أرقام"
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
                  ? "رقم الهوية لا يقل عن 10 أرقام"
                  : "رقم الهوية لا يقل عن 8 أرقام",
            },
            {
              max:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? 10
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
                  ? 10
                  : 14,
              message:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? "رقم الهوية لا يزيد عن 10 أرقام"
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
                  ? "رقم الهوية لا يزيد عن 10 أرقام"
                  : "رقم الهوية لا يزيد عن 14 رقم",
            },
            {
              pattern:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? new RegExp(/^1/)
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
                  ? new RegExp(/^2/)
                  : null,
              message:
                props.selectEmployeeValues?.idTypeObject?.id === 1890
                  ? "يجب أن يبدأ رقم الهوية بالرقم 1"
                  : props.selectEmployeeValues?.idTypeObject?.id === 1990
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
                      e.employee !== undefined &&                          e.id !== props.jobDetails.id &&

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
            value={props.employeesValues?.IdNumber}
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
          initialValue={
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.employeesValues?.idSide
          }
          hasFeedback
          label="جهة اصدار الهوية">
          <Input
            name="idSide"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues?.idSide}
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
            ]}
            initialValue={
              props.jobDetails?.employee &&
              props.jobDetails?.employee?.employeeDates?.IDFinishDate
            }>
            <DatePicker
              // currentDate={props.IDFinishDate}
              editable={false}
              minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
              placeholder="أختر تاريخ الانتهاء"
              value={props.employeeDates?.IDFinishDate}
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
          // initialValue={
          //   props.jobDetails?.employee &&
          //   props.jobDetails?.employee?.selectEmployeeValues?.employeeJob
          // }
          name="employeeJob"
          hasFeedback
          label="الوظيفة ">
          <Select
            disabled={props.jobDetails.mandatory == 1 ? true : false}
            suffixIcon={<DownCircleFilled />}
            className="dont-show"
            onChange={props.handleEmployeeSelect(
              "employeeJob",
              "employeeJobObject"
            )}
            value={
              props.selectEmployeeValues.employeeJob !== undefined &&
              props.selectEmployeeValues.employeeJobObject.id
            }
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
          (x) => x !== false && x !== undefined && x.employee
        ) == undefined ||
        props.selectedEmployees?.find(
          (x) =>
            x !== undefined &&
            x.employee !== undefined &&
            x.employee?.employeeChecks.officeOwner == true
        ) == undefined ||
        (props.jobDetails?.employee !== false &&
          props.jobDetails?.employee !== undefined &&
          props.jobDetails?.employee?.employeeChecks.officeOwner == true) ? (
          <Form.Item
            name="officeOwner"
            className="checkDiv"
            initialValue={
              props.jobDetails?.employee &&
              props.jobDetails?.employee?.employeeChecks.officeOwner
            }
            valuePropName="checked">
            <Checkbox
              name="officeOwner"
              checked={
                props.jobDetails?.employee &&
                props.jobDetails?.employee?.employeeChecks.officeOwner
              }
              className="ml-3"
              onChange={props.employeeCheckOk}>
              صاحب المكتب
            </Checkbox>
          </Form.Item>
        ) : null}
        {props.selectedEmployees?.find(
          (x) => x !== false && x !== undefined && x.employee
        ) == undefined ||
        props.selectedEmployees?.find(
          (x) =>
            x !== undefined &&
            x.employee !== undefined &&
            x.employee?.employeeChecks.manager == true
        ) == undefined ||
        (props.jobDetails?.employee !== false &&
          props.jobDetails?.employee !== undefined &&
          props.jobDetails?.employee?.employeeChecks.manager == true) ? (
          <Form.Item
            name="manager"
            className="checkDiv"
            initialValue={
              props.jobDetails?.employee &&
              props.jobDetails?.employee?.employeeChecks.manager
            }
            valuePropName="checked">
            <Checkbox
              name="manager"
              checked={
                props.jobDetails?.employee &&
                props.jobDetails?.employee?.employeeChecks.manager
              }
              className="ml-3"
              onChange={props.employeeCheckOk}>
              المدير المسئول
            </Checkbox>
          </Form.Item>
        ) : null}
        {props.jobDetails.id !== 2032 && props.jobDetails.id !== 2033 ? (
          <Form.Item
            rules={[
              {
                message: "من فضلك ادخل التخصص  ",
                required: true,
              },
            ]}
            // initialValue={
            //   props.jobDetails?.employee &&
            //   props.jobDetails?.employee?.selectEmployeeValues &&
            //   props.jobDetails.category.name
            // }
            name="employeeSpecialty"
            hasFeedback
            label="التخصص">
            <Select
              disabled={props.jobDetails.mandatory == 1 ? true : false}
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
        ) : null}

        <Form.Item
          rules={[
            {
              message: "من فضلك ادخل اعلي مؤهل دراسي",
              required: true,
            },
          ]}
          name="highAcademicQualif"
          initialValue={
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.employeesValues.highAcademicQualif
          }
          hasFeedback
          label="اعلي مؤهل دراسي">
          <Input
            name="highAcademicQualif"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues?.highAcademicQualif}
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
          initialValue={
            props.jobDetails?.employee &&
            props.jobDetails?.employee?.employeesValues?.graduiationYear
          }
          hasFeedback
          label="سنة التخرج">
          <Input
            type="number"
            name="graduiationYear"
            onChange={props.handleEmployeesInput}
            value={props.employeesValues?.graduiationYear}
            placeholder="سنة التخرج"
          />
        </Form.Item>
        {props.jobDetails.id !== 2032 && props.jobDetails.id !== 2033 ? (
          <>
            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل المرحلة المهنية ",
                  required: true,
                },
              ]}
              // initialValue={
              //   props.selectEmployeeValues.empProfLevel !== null
              //     ? props.selectEmployeeValues?.empProfLevel
              //     : props?.jobDetails?.employee &&
              //       props.jobDetails?.employee?.selectEmployeeValues &&
              //       props.jobDetails?.employee?.selectEmployeeValues
              //         ?.empProfLevel
              // }
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
                value={props.selectEmployeeValues?.empProfLevelObject?.id}
                placeholder="اختر المرحلة المهنية"
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }>
                {professionaLevels &&
                  professionaLevels.length !== 0 &&
                  professionaLevels.map((inq, index) => (
                    <Select.Option
                      className="selectgroup"
                      value={inq.name}
                      key={inq.id}
                      obj={inq}
                      id={inq.id}>
                      {inq.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  message: "من فضلك ادخل رقم شهادة الإعتماد المهني (الهندسي)",
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
                          e.id !== props.jobDetails.id &&
                          e.employee.employeesValues.certificateNumber == value
                      )
                    ) {
                      return Promise.reject("رقم الشهادة موجود مسبقا");
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
              name="certificateNumber"
              initialValue={
                props.jobDetails?.employee &&
                props.jobDetails?.employee?.employeesValues.certificateNumber
              }
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
            {!props.uniqueValues.certificateNumberUnique ? (
              <p className="errMsg">رقم الشهادة مستخدم من قبل</p>
            ) : null}
            <div className="calendatFormInput">
              <span>
                <FontAwesomeIcon
                  className="calendarFormIcon"
                  icon={faCalendar}
                />
              </span>
              <Form.Item
                name="certificateReleaseDate"
                label="تاريخ الاصدار "
                rules={[
                  {
                    message: "من فضلك ادخل تاريح الاصدار  ",
                    required: true,
                  },
                ]}
                initialValue={
                  props.jobDetails?.employee &&
                  props.jobDetails?.employee?.employeeDates
                    .certificateReleaseDate
                }>
                <DatePicker
                  // currentDate={props.IDFinishDate}
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
                ]}
                initialValue={
                  props.jobDetails?.employee &&
                  props.jobDetails?.employee?.employeeDates
                    .certificateFinishDate
                }>
                <DatePicker
                  // currentDate={props.IDFinishDate}
                  editable={false}
                  minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  placeholder="أختر تاريخ الانتهاء"
                  value={props.employeeDates.certificateFinishDate}
                  onChange={props.onSelectEmployeeDate("certificateFinishDate")}
                  locale="ar"
                  calendar="arabic"
                />
              </Form.Item>
            </div>
          </>
        ) : null}

        {props.jobDetails?.id !== 2032 && props.jobDetails?.id !== 2033
          ? props.empModalFiles.map((f, index) => (
              <Form.Item
                key={index}
                name={f.name}
                className={
                  props.uploadedImagesSingle[f.name] !== undefined &&
                  props.uploadedImagesSingle[f.name]?.length > 0
                    ? ["PDF", "pdf"].includes(
                        props.uploadedImagesSingle[f.name] !== undefined &&
                          props.uploadedImagesSingle[f.name][0] !== undefined &&
                          props.uploadedImagesSingle[f.name][0]?.data !==
                            undefined &&
                          props.uploadedImagesSingle[f.name][0]?.data
                            ?.split(".")
                            .pop()
                      )
                      ? "pdfFileee"
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          props.uploadedImagesSingle[f.name] !== undefined &&
                            props.uploadedImagesSingle[f.name][0] !==
                              undefined &&
                            props.uploadedImagesSingle[f.name][0]?.data !==
                              undefined &&
                            props.uploadedImagesSingle[f.name][0]?.data
                              ?.split(".")
                              .pop()
                        )
                      ? "wordFileee"
                      : ""
                    : props.jobDetails?.employee !== undefined &&
                      props.jobDetails?.employee?.images?.length > 0
                    ? ["PDF", "pdf"].includes(
                        props.jobDetails?.employee?.images[f.id] !==
                          undefined &&
                          props.jobDetails?.employee?.images[f.id]?.value !==
                            undefined &&
                          props.jobDetails?.employee?.images[f.id]?.value[0]
                            ?.data !== undefined &&
                          props.jobDetails?.employee?.images[
                            f.id
                          ]?.value[0]?.data
                            ?.split(".")
                            .pop()
                      )
                      ? "pdfFileee"
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          props.jobDetails?.employee?.images[f.id] !==
                            undefined &&
                            props.jobDetails?.employee?.images[f.id]?.value !==
                              undefined &&
                            props.jobDetails?.employee?.images[f.id]?.value[0]
                              ?.data !== undefined &&
                            props.jobDetails?.employee?.images[
                              f.id
                            ]?.value[0]?.data
                              ?.split(".")
                              .pop()
                        )
                      ? "wordFileee"
                      : ""
                    : null
                }
                valuePropName="list"
                getValueFromEvent={normFile}
                rules={[
                  {
                    message: `من فضلك قم بإرفاق ${f.label}`,
                    required:
                      props.uploadedImagesSingle[f.name]?.length > 0
                        ? false
                        : true,
                  },
                ]}
                label={f.label}>
                <Upload
                  accept={
                    f.name == "CvFileEmpModal"
                      ? ".pdf,.PDF,.docx,.DOCX,doc,DOC"
                      : ".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG"
                  }
                  fileList={
                    props.uploadedImagesSingle[f.name]?.length > 0
                      ? props.uploadedImagesSingle[f.name]
                      : // : props.jobDetails?.employee !== undefined &&
                        //   props.jobDetails?.employee?.images.length > 0
                        // ? props.jobDetails?.employee?.images[f.id].value
                        []
                  }
                  onRemove={props.DeleteSingleImage(f.name)}
                  beforeUpload={() => false}
                  multiple={false}
                  listType={
                    props.uploadedImagesSingle[f.name]?.length > 0
                      ? //  || (props.jobDetails?.employee !== undefined &&
                        //     props.jobDetails?.employee?.images.length > 0 &&
                        //     props.jobDetails?.employee?.images[f.id].value.length > 0)
                        "picture-card"
                      : ""
                  }
                  onChange={props.SetSingleFileUpload(f.name)}>
                  <Button block className="ant-uploaded">
                    تحميل <CloudUploadOutlined />
                  </Button>
                </Upload>
              </Form.Item>
            ))
          : props.empModalFiles.slice(0, 3).map((f, index) => (
              <Form.Item
                name={f.name}
                key={index}
                className={
                  props.uploadedImagesSingle[f.name]?.length > 0
                    ? ["PDF", "pdf"].includes(
                        props.uploadedImagesSingle[f.name] !== undefined &&
                          props.uploadedImagesSingle[f.name][0] !== undefined &&
                          props.uploadedImagesSingle[f.name][0]?.data !==
                            undefined &&
                          props.uploadedImagesSingle[f.name][0]?.data
                            ?.split(".")
                            .pop()
                      )
                      ? "pdfFileee"
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          props.uploadedImagesSingle[f.name] !== undefined &&
                            props.uploadedImagesSingle[f.name][0]?.data !==
                              undefined &&
                            props.uploadedImagesSingle[f.name][0]?.data
                              ?.split(".")
                              .pop()
                        )
                      ? "wordFileee"
                      : ""
                    : props.jobDetails?.employee !== undefined &&
                      props.jobDetails?.employee?.images?.length > 0
                    ? ["PDF", "pdf"].includes(
                        props.jobDetails?.employee?.images[f.id]?.value !==
                          undefined &&
                          props.jobDetails?.employee?.images[f.id]?.value[0]
                            ?.data == undefined &&
                          props.jobDetails?.employee?.images[
                            f.id
                          ]?.value[0]?.data
                            ?.split(".")
                            .pop()
                      )
                      ? "pdfFileee"
                      : ["DOCX", "docx", "DOC", "doc"].includes(
                          props.jobDetails?.employee?.images[f.id]?.value !==
                            undefined &&
                            props.jobDetails?.employee?.images[f.id]?.value[0]
                              ?.data !== undefined &&
                            props.jobDetails?.employee?.images[
                              f.id
                            ]?.value[0]?.data
                              ?.split(".")
                              .pop()
                        )
                      ? "wordFileee"
                      : ""
                    : null
                }
                valuePropName="list"
                getValueFromEvent={normFile}
                rules={[
                  {
                    message: `من فضلك قم بإرفاق ${f.label}`,
                    required:
                      props.uploadedImagesSingle[f.name]?.length > 0
                        ? false
                        : true,
                  },
                ]}
                label={f.label}>
                <Upload
                  accept={
                    f.name == "CvFileEmpModal"
                      ? ".pdf,.PDF,.docx,.DOCX,DOC,doc"
                      : ".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG"
                  }
                  fileList={
                    props.uploadedImagesSingle[f.name]?.length > 0
                      ? props.uploadedImagesSingle[f.name]
                      : // : props.jobDetails?.employee !== undefined &&
                        //   props.jobDetails?.employee?.images.length > 0
                        // ? props.jobDetails?.employee?.images[f.id].value
                        []
                  }
                  onRemove={props.DeleteSingleImage(f.name)}
                  beforeUpload={() => false}
                  multiple={false}
                  listType={
                    props.uploadedImagesSingle[f.name]?.length > 0
                      ? // || (props.jobDetails?.employee !== undefined &&
                        //   props.jobDetails?.employee?.images.length > 0 &&
                        //   props.jobDetails?.employee?.images[f.id].value.length > 0)
                        "picture-card"
                      : ""
                  }
                  onChange={props.SetSingleFileUpload(f.name)}>
                  <Button block className="ant-uploaded">
                    تحميل <CloudUploadOutlined />
                  </Button>
                </Upload>
              </Form.Item>
            ))}
        {Number(props.selectEmployeeValues?.idTypeObject?.id) === 1990 && (
          <Form.Item
            name="EmployeeMeetConditions"
            className="checkDiv"
            initialValue={
              props.jobDetails?.employee &&
              props.jobDetails?.employee?.employeeChecks?.EmployeeMeetConditions
            }
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
              checked={
                props.jobDetails?.employee &&
                props.jobDetails?.employee?.employeeChecks
                  ?.EmployeeMeetConditions
              }
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
