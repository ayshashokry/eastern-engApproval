import React, { useState, useEffect } from "react";
import {
  Collapse,
  Button,
  Form,
  Input,
  Select,
  notification,
  Checkbox,
} from "antd";
import Loader from "../../../containers/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { DownCircleFilled } from "@ant-design/icons";
import { Table, Modal } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import moment from "moment-hijri";
import EditEmployeeModal from "../modals/EditEmployeeModal";
import AddEmployeeModal from "../modals/AddEmployeeModal";
import UploadFile from "../../../containers/inputs/UploadFile";
import UploadMultipleFiles from "../../../containers/inputs/UploadMultipleFiles";
import { toArabic } from "arabic-digits";
import { CheckUniqueLic } from "../../../apis/FetchApi";
export default function RegistStep2(props) {
  const { Panel } = Collapse;

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  //upload MultipleImages
  const [imagesMul] = useState([
    {
      id: 1,
      name: "equipmentSurveyingBillsStep2",
      label: "صور فواتير المعدات واجهزة الرفع المساحي",
    },
    {
      id: 2,
      name: "VehicleFormsStep2",
      label: "صور استمارات سيارات دفع رباعي",
    },
  ]);
  useEffect(() => {
    //get Categories
    axios.get(`${window.ApiUrl}/api/EnginneringCompanyClass`).then((res) => {
      setCategories(res.data.results);
    });

    // get departments
    axios
      .get(
        `${window.ApiUrl}/api/Department?q=1&filter_key=approving_dep&operand==`
      )
      .then((res) => {
        setDepartments(res.data.results);
      });
  }, []);
  const [loading, setLoader] = useState(false);

  //Check unique values
  const [uniqueValues, setUniqueValues] = useState({
    certificateNumberUnique: true,
  });

  // const [requiredImages, setRequiredimages] = useState({
  //   equipmentSurveyingBillsStep2: false,
  //   VehicleFormsStep2: false,
  // });
  const CheckUniqueValue = (key, value, title) => {
    setLoader(true);
    axios
      .get(
        `${window.ApiUrl}/api/EngCompnayEmployee/CheckUnique/?key=${key}&q=${value}`
      )
      .then((res) => {
        setLoader(false);
        setUniqueValues({ ...uniqueValues, [title]: true });
      })
      .catch((error) => {
        setLoader(false);
        if (error.response && error.response.statusText === "Found") {
          setLoader(false);
          setUniqueValues({
            ...uniqueValues,
            [title]: false,
          });
        }
      });
  };
  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        props.employeesValues.certificateNumber !== "" &&
        CheckUniqueValue(
          "consultant_member_no",
          props.employeesValues.certificateNumber,
          "certificateNumberUnique"
        ),

      1000
    );
    return () => clearTimeout(timeoutId);
  }, [props.employeesValues.certificateNumber]);
  const nextStepFun = (e) => {
    const args = {
      description: "من فضلك تأكد من ادخال بيانات جميع الموظفين",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    const owner = {
      description: "من فضلك تأكد من ادخال صاحب المكتب ",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    const manager = {
      description: "من فضلك تأكد من ادخال المدير المسئول",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };

    const ownerNationality = {
      description: "يجب أن يكون صاحب المكتب سعودي",
      duration: 7,
      placement: "bottomLeft",
      bottom: 5,
      className: "selectSureNotification",
    };
    // if (
    //   props.selectedStaffData.map(
    //     (j) =>
    //       j.approve &&
    //       j.approve.id === 228 &&
    //       props.uploadedImagesMultiple.equipmentSurveyingBillsStep2.length === 0
    //   )
    // ) {
    //   setRequiredimages({
    //     ...requiredImages,
    //     equipmentSurveyingBillsStep2: true,
    //   });
    // }
    // if (
    //   props.selectedStaffData.map(
    //     (j) =>
    //       j.approve &&
    //       j.approve.id === 228 &&
    //       props.uploadedImagesMultiple.VehicleFormsStep2.length === 0
    //   )
    // ) {
    //   setRequiredimages({ ...requiredImages, VehicleFormsStep2: true });
    // }
    if (liceNumUnique) {
      if (
        props.selectedEmployees.find(
          (j) =>
            j !== undefined &&
            j !== false &&
            j?.employee !== undefined &&
            j.employee?.employeeChecks.officeOwner
        ) === undefined
      ) {
        notification.destroy();
        notification.open(owner);
      } else if (
        props.selectedEmployees.find(
          (j) =>
            j !== undefined &&
            j !== false &&
            j.employee !== undefined &&
            j.employee.employeeChecks.manager
        ) === undefined
      ) {
        notification.destroy();
        notification.open(manager);
      } else if (
        props.selectedEmployees.find(
          (j) => j !== false && j !== undefined && j.employee === undefined
        ) !== undefined
      ) {
        notification.destroy();
        notification.open(args);
      } else if (
        props.selectedEmployees.find(
          (j) =>
            j !== false &&
            j !== undefined &&
            j.employee !== undefined &&
            j.employee.employeeChecks.officeOwner &&
            j.employee.selectEmployeeValues.nationalityObject?.id === 190
        ) === undefined
      ) {
        notification.destroy();
        notification.open(ownerNationality);
      } else if (!Object.values(uniqueValues).includes(false)) {
        props.nextStep();
      }
    }
  };
  const [liceNumUnique, setliceNumUnique] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        props.formValues.liceNum !== "" &&
        CheckUniqueLic(props.formValues.liceNum, setLoader, 2)
          .then((res) => {
            console.log(res);
            setLoader(false);
            if (res.status == 200) {
              setliceNumUnique(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setliceNumUnique(false);
            }
          }),

      1000
    );
    return () => clearTimeout(timeoutId);
  }, [props.formValues.liceNum]);
  return (
    <Form
      ref={props.Step2FormRef}
      onFinish={nextStepFun}
      initialValues={{
        category:
          props.selectValues.category !== null &&
          props.selectValues.category.name,
        specialty:
          props.selectValues.specialty !== null &&
          props.selectValues.specialty.name,
      }}
      layout="vertical">
      {loading ? <Loader /> : null}
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        <Panel header={"بيانات ترخيص الهيئة السعودية"} key={1}>
          <Container>
            <Form.Item
              name="liceNum"
              label="رقم الترخيص"
              hasFeedback
              initialValue={props.formValues.liceNum}
              rules={[
                {
                  message: "من فضلك ادخل رقم الترخيص",
                  required: true,
                },
              ]}>
              <Input
                name="liceNum"
                onChange={props.handleUserInput}
                value={props.formValues.liceNum}
                placeholder="من فضلك ادخل رقم الترخيص"
              />
            </Form.Item>
            {!liceNumUnique ? (
              <p className="errMsg">رقم الرخصة مسجل من قبل</p>
            ) : null}
            <div className="calendatFormInput">
              <span>
                <FontAwesomeIcon
                  className="calendarFormIcon"
                  icon={faCalendar}
                />
              </span>
              <Form.Item
                name="Step2licereleaseDate"
                hasFeedback
                label="تاريخ الإصدار"
                initialValue={props.dates.Step2licereleaseDate}
                rules={[
                  {
                    message: "من فضلك ادخل تاريخ الاصدار ",
                    required: true,
                  },
                ]}>
                <DatePicker
                  editable={false}
                  maxDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  // required
                  placeholder="من فضلك اختر تاريخ الإصدار"
                  value={props.dates.Step2licereleaseDate}
                  onChange={props.onSelectDate("Step2licereleaseDate")}
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
                name="Step2licefinishDate"
                hasFeedback
                label="تاريخ انتهاء الرخصة"
                initialValue={props.dates.Step2licefinishDate}
                rules={[
                  {
                    message: "من فضلك ادخل تاريخ انتهاء الرخصة ",
                    required: true,
                  },
                ]}>
                <DatePicker
                  editable={false}
                  minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  // required
                  placeholder="من فضلك اختر تاريخ انتهاء الرخصة"
                  value={props.dates.Step2licefinishDate}
                  onChange={props.onSelectDate("Step2licefinishDate")}
                  locale="ar"
                  calendar="arabic"
                />
              </Form.Item>
            </div>

            <UploadFile
              label="صورة ترخيص الهيئة السعودية"
              titleValue="SaudiAuthLicenseImgStep2"
              uploadedImagesSingle={props.uploadedImagesSingle}
              SetSingleFileUpload={props.SetSingleFileUpload}
              DeleteSingleImage={props.DeleteSingleImage}
            />
          </Container>
        </Panel>
        <Panel header={"بيانات تخصص المكتب"} key={2}>
          <Form.Item
            name="category"
            label="الفئة"
            initialValue={
              props.selectValues.category !== null &&
              props.selectValues.category.name
            }
            hasFeedback
            rules={[
              {
                message: "من فضلك اختر الفئة",
                required: props.selectedStaffData.length > 0 ? false : true,
              },
            ]}>
            <Select
              suffixIcon={<DownCircleFilled />}
              className="dont-show"
              onChange={props.handleSelect("category")}
              value={
                props.selectValues.category !== null &&
                props.selectValues.category.id
              }
              placeholder="من فضلك اختر الفئة "
              getPopupContainer={(trigger) => trigger.parentNode}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option.value.indexOf(input) >= 0
              }>
              {categories &&
                categories.length > 0 &&
                categories.map((c) => (
                  <Select.Option key={c.id} value={c.name} id={c.id} obj={c}>
                    {c.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="specialty"
            label="التخصص"
            hasFeedback
            initialValue={
              props.selectValues.specialty !== null &&
              props.selectValues.specialty.name
            }>
            <Select
              suffixIcon={<DownCircleFilled />}
              className="dont-show"
              value={
                props.selectValues.specialty !== null &&
                props.selectValues.specialty.id
              }
              disabled={
                props.selectValues.category !== null &&
                props.selectValues.category.id === 5
                  ? true
                  : false
              }
              onChange={props.handleSelect("specialty")}
              placeholder="من فضلك اختر التخصص "
              getPopupContainer={(trigger) => trigger.parentNode}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option.value.indexOf(input) >= 0
              }>
              {props.selectValues.category &&
                props.selectValues.category.engineering_categories !==
                  undefined &&
                props.selectValues.category.engineering_categories.map((c) => (
                  <Select.Option key={c.id} value={c.name} id={c.id} obj={c}>
                    {c.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={
              props.selectValues.department !== null &&
              props.selectValues.department.name
            }
            name="department"
            label="الإدارة المقدم اليها طلب الاعتماد"
            hasFeedback
            rules={[
              {
                message: "من فضلك اختر الإدارة المقدم اليها طلب الاعتماد",
                required: props.selectedStaffData.length > 0 ? false : true,
              },
            ]}>
            <Select
              suffixIcon={<DownCircleFilled />}
              className="dont-show"
              onChange={props.handleSelect("department")}
              value={
                props.selectValues.department !== null &&
                props.selectValues.department.id
              }
              placeholder="من فضلك اختر الإدارة المقدم اليها طلب الاعتماد "
              getPopupContainer={(trigger) => trigger.parentNode}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option.value.indexOf(input) >= 0
              }>
              {departments &&
                departments.length > 0 &&
                departments.map((c) => (
                  <Select.Option key={c.id} value={c.name} id={c.id} obj={c}>
                    {c.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button onClick={props.addStaff} className="addJobPlusIcon">
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              اضافة كادر
            </Button>
          </div>
          {props.selectedStaffData.length > 0 && (
            <>
              <h2 className="tableHeadTitle">الإعتمادات</h2>
              <Table className="mt-2 inquiryTable">
                <thead>
                  <tr>
                    <th>الفئة</th> <th>التخصص</th>
                    <th>الإدارة المقدم إليها طلب الاعتماد</th>
                    {props.requestType == "edit" && <th>ارسال للإعتماد</th>}
                    <th>الإجراءات </th>
                  </tr>
                </thead>
                <tbody>
                  {props.selectedStaffData.length > 0 &&
                    props.selectedStaffData &&
                    props.selectedStaffData.map(
                      (staff, index) =>
                        ((staff.approve !== undefined &&
                          staff.category !== undefined) ||
                          staff.id !== null) && (
                          <tr
                            key={index}
                            style={{
                              borderBottom: "1px solid #d4d6de",
                            }}>
                            <td>
                              {staff.class !== undefined
                                ? staff.class?.name
                                : "مكتب هندسى استشارى جميع التخصصات فئة (أ)"}
                            </td>
                            <td>
                              {staff.category !== undefined &&
                              staff.category !== null
                                ? staff.category.name
                                : "بدون"}
                            </td>
                            <td>
                              {staff.approve !== undefined
                                ? staff.approve?.name
                                : staff.name}
                            </td>
                            {props.requestType == "edit" && (
                              <td>
                                <Checkbox
                                  defaultChecked={JSON.parse(
                                    localStorage.getItem("user")
                                  )?.engineering_companies?.department_eng_comp.find(
                                    (d) =>
                                      d.department_id == staff.approve?.id &&
                                      d.is_approved == 2
                                  )}
                                  staff={staff}
                                  onChange={props.onCheckStaff}
                                  id={staff.approve?.id}></Checkbox>
                              </td>
                            )}
                            <td>
                              <Button
                                className="deleteBtn"
                                onClick={props.deleteSelectedStaffFromTable(
                                  staff
                                )}>
                                حذف
                              </Button>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </Table>
            </>
          )}
          {props.selectedStaffData !== undefined &&
          props.selectedStaffData.find((x) =>
            x.approve !== undefined ? x.approve.id == 228 : x.id == 228
          ) !== undefined ? (
            <>
              <Form.Item
                name="gpsDevices"
                label=" عدد أجهزة GPS"
                rules={[
                  {
                    message: "من فضلك ادخل عدد اجهزة gps",
                    required: true,
                  },
                ]}
                initialValue={props.formValues.gpsDevices}>
                <Input
                  type="number"
                  name="gpsDevices"
                  onChange={props.handleUserInput}
                  value={props.formValues.gpsDevices}
                  // max={moment().iYear()}
                  placeholder="من فضلك ادخل عدد اجهزة gps"
                />
              </Form.Item>

              <Form.Item
                name="totalStationDevices"
                rules={[
                  {
                    message: "من فضلك ادخل عدد اجهزة total station",
                    required: true,
                  },
                ]}
                label=" عدد أجهزة total station"
                initialValue={props.formValues.totalStationDevices}>
                <Input
                  type="number"
                  name="totalStationDevices"
                  onChange={props.handleUserInput}
                  value={props.formValues.totalStationDevices}
                  // max={moment().iYear()}
                  placeholder="من فضلك ادخل عدد اجهزة total station"
                />
              </Form.Item>

              {imagesMul.map((mulimg, index) => (
                <UploadMultipleFiles
                  mandatory={true}
                  id={index}
                  label={mulimg.label}
                  titleValue={mulimg.name}
                  uploadedImagesMultiple={props.uploadedImagesMultiple}
                  SetMultipleFilesUpload={props.SetMultipleFilesUpload}
                  DeleteMultipleImages={props.DeleteMultipleImages}
                />
              ))}
            </>
          ) : null}
        </Panel>
        {props.selectedStaffData.length > 0 && (
          <Panel header={"بيانات الكادر"} key={3}>
            <div style={{ textAlign: "right" }}>
              <Button
                className="addEmpBtn mb-3"
                onClick={props.openAddEmployeeModal}>
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                إضافة موظف
              </Button>
            </div>

            {props.selectedEmployees.length > 0 && (
              <>
                <h2 className="tableHeadTitle">الموظفين</h2>
                <Table className="mt-2 inquiryTable">
                  <thead>
                    <tr>
                      <th>الاسم </th>
                      <th>رقم الهوية</th>
                      <th>التخصص </th> <th>ملاحظات </th>
                      <th>الإجراءات </th>
                    </tr>
                  </thead>

                  <tbody>
                    {props.selectedEmployees.length > 0 &&
                      props.selectedEmployees.map(
                        (x) =>
                          x !== false &&
                          x !== undefined && (
                            <tr
                              key={x.UniqueId !== undefined ? x.UniqueId : x.id}
                              style={{
                                borderBottom: "1px solid #d4d6de",
                              }}>
                              <td>
                                {x.employee === undefined
                                  ? toArabic(x.name)
                                  : toArabic(x.employee.employeesValues.name)}
                              </td>
                              <td>
                                {x.employee !== undefined
                                  ? x.employee.employeesValues.IdNumber !==
                                    undefined
                                    ? toArabic(
                                        x.employee.employeesValues.IdNumber
                                      )
                                    : ""
                                  : ""}
                              </td>
                              <td>
                                {x.mandatory == 1
                                  ? x.category?.name
                                  : x.employee?.selectEmployeeValues
                                      ?.employeeSpecialtyObject?.name}
                              </td>
                              <td>
                                {x.employee !== undefined &&
                                  (x.employee.employeeChecks.officeOwner
                                    ? "صاحب المكتب - "
                                    : "")}
                                {x.employee !== undefined &&
                                  (x.employee.employeeChecks.manager
                                    ? "المدير المسؤل - "
                                    : "")}
                                {x.employee !== undefined &&
                                  (x.employee.selectEmployeeValues
                                    .empProfLevel !== undefined
                                    ? x.employee.selectEmployeeValues
                                        .empProfLevel
                                    : "")}
                              </td>
                              <td>
                                <Button onClick={props.openEditModal(x)}>
                                  تعديل
                                </Button>
                                {x.mandatory == 0 ? (
                                  <Button
                                    className="deleteBtn mx-2"
                                    onClick={props.deleteEmployee(x)}>
                                    حذف
                                  </Button>
                                ) : null}
                              </td>
                              <Modal
                                keyboard={false}
                                className="AddOwnerModal"
                                style={{ textAlign: "right" }}
                                show={props.showEditModal == x.UniqueId}
                                onHide={props.closeEditModal}
                                backdrop="static"
                                {...props}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                <EditEmployeeModal
                                  selectedEmployees={props.selectedEmployees}
                                  jobs={props.jobs}
                                  employeeSpecialities={
                                    props.employeeSpecialities
                                  }
                                  professionaLevels={props.professionaLevels}
                                  IDTypes={props.IDTypes}
                                  empModalFiles={props.empModalFiles}
                                  nationalities={props.nationalities}
                                  setEmployeeSpecialityByDefault={
                                    props.setEmployeeSpecialityByDefault
                                  }
                                  uniqueValues={uniqueValues}
                                  Step2EditFormRef={props.Step2EditFormRef}
                                  jobDetails={x}
                                  closeEditModal={props.closeEditModal}
                                  handleEmployeesInput={
                                    props.handleEmployeesInput
                                  }
                                  employeesValues={props.employeesValues}
                                  saveEmployeeData={props.saveEmployeeData}
                                  selectEmployeeValues={
                                    props.selectEmployeeValues
                                  }
                                  handleEmployeeSelect={
                                    props.handleEmployeeSelect
                                  }
                                  selectedStaffData={props.selectedStaffData}
                                  onSelectEmployeeDate={
                                    props.onSelectEmployeeDate
                                  }
                                  employeeDates={props.employeeDates}
                                  employeeChecks={props.employeeChecks}
                                  employeeCheckOk={props.employeeCheckOk}
                                  SetSingleFileUpload={
                                    props.SetSingleFileUpload
                                  }
                                  uploadedImagesSingle={
                                    props.uploadedImagesSingle
                                  }
                                  DeleteSingleImage={props.DeleteSingleImage}
                                  showEditModal={props.showEditModal}
                                />
                              </Modal>
                            </tr>
                          )
                      )}
                  </tbody>
                </Table>
              </>
            )}
          </Panel>
        )}
      </Collapse>
      <Modal
        keyboard={false}
        className="AddOwnerModal"
        style={{ textAlign: "right" }}
        show={props.showAddModal}
        onHide={props.closeAddEmployeeModal}
        backdrop="static"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <AddEmployeeModal
          selectedEmployees={props.selectedEmployees}
          empModalFiles={props.empModalFiles}
          jobs={props.jobs}
          employeeSpecialities={props.employeeSpecialities}
          professionaLevels={props.professionaLevels}
          IDTypes={props.IDTypes}
          Step2AddFormRef={props.Step2AddFormRef}
          nationalities={props.nationalities}
          uniqueValues={uniqueValues}
          saveAddNewEmployee={props.saveAddNewEmployee}
          closeAddEmployeeModal={props.closeAddEmployeeModal}
          handleEmployeesInput={props.handleEmployeesInput}
          employeesValues={props.employeesValues}
          selectEmployeeValues={props.selectEmployeeValues}
          handleEmployeeSelect={props.handleEmployeeSelect}
          selectedStaffData={props.selectedStaffData}
          onSelectEmployeeDate={props.onSelectEmployeeDate}
          employeeDates={props.employeeDates}
          employeeChecks={props.employeeChecks}
          employeeCheckOk={props.employeeCheckOk}
          SetSingleFileUpload={props.SetSingleFileUpload}
          uploadedImagesSingle={props.uploadedImagesSingle}
          DeleteSingleImage={props.DeleteSingleImage}
        />
      </Modal>
      <div className="steps-action my-3">
      <Button
          className="saveEditsBtn mx-2"
          onClick={props.saveEditsToLocalStorage}>
          حفظ التعديلات
        </Button>  <Button type="primary" htmlType="submit" className="showBtn ml-3">
          التالي
          <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
        </Button>{" "}
       
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => props.prevStep()}
          className="showBtn prevBtn ml-3">
          <FontAwesomeIcon className=" ml-2 " icon={faArrowRight} />
          السابق
        </Button>
      </div>
    </Form>
  );
}
