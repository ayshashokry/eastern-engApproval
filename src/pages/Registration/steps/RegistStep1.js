import React, { useState, useEffect, useRef, memo } from "react";
import { Collapse, Button, Form, Input, Select, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { DownCircleFilled } from "@ant-design/icons";
import Loader from "../../../containers/Loader";
import DatePicker from "react-multi-date-picker";
import moment from "moment-hijri";
import UploadFile from "../../../containers/inputs/UploadFile";
import UploadMultipleFiles from "../../../containers/inputs/UploadMultipleFiles";
import FormValueInput from "../../../containers/inputs/FormValueInput";
import SaveEditsButton from "../../../containers/inputs/SaveEditsButton";
import { CheckUnique } from "../../../apis/FetchApi";
function RegistStep1(props) {
  const { Panel } = Collapse;

  //loader
  const [loading, setLoader] = useState(false);

  //Check unique values

  const [officeNameUnique, setofficeNameUnique] = useState(true);
  const [engOfficeNameUnique, setengOfficeNameUnique] = useState(true);
  const [commercial_registration_noUique, setcommercial_registration_noUique] =
    useState(true);

  useEffect(() => {
    if (
      (props.requestType !== undefined && props.requestType == "create") ||
      (props.requestType == "edit" &&
        props.editedCompanyData?.office_data?.eng_company_data?.name !==
          undefined &&
        props.formValues.officeName !==
          props.editedCompanyData?.office_data?.eng_company_data?.name)
    ) {
      const timeoutId = setTimeout(
        () =>
          props.formValues.officeName !== "" &&
          CheckUnique("name", props.formValues.officeName, setLoader)
            .then((res) => {
              console.log(res)
              setLoader(false);
              if (res.status == 200) {
                setofficeNameUnique(true);
              }
            })
            .catch((error) => {
              setLoader(false);
              if (error?.response?.status == 302) {
                setLoader(false);
                setofficeNameUnique(false);
              }
            }),

        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [props.formValues.officeName]);
  useEffect(() => {
    if (
      (props.requestType !== undefined && props.requestType == "create") ||
      (props.requestType == "edit" &&
        props.editedCompanyData?.office_data?.eng_company_data?.ename !==
          undefined &&
        props.formValues.engofficeName !==
          props.editedCompanyData?.office_data?.eng_company_data?.ename)
    ) {
      const timeoutId = setTimeout(
        () =>
          props.formValues.engofficeName !== "" &&
          CheckUnique("ename", props.formValues.engofficeName, setLoader)
            .then((res) => {
              setLoader(false);
              if (res.status == 200) {
                setengOfficeNameUnique(true);
              }
            })
            .catch((error) => {
              setLoader(false);
              if (error?.response?.status == 302) {
                setLoader(false);
                setengOfficeNameUnique(false);
              }
            }),
        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [props.formValues.engofficeName]);

  useEffect(() => {
    if (
      (props.requestType !== undefined && props.requestType == "create") ||
      (props.requestType == "edit" &&
        props.editedCompanyData?.office_data?.eng_company_data
          ?.commercial_registration_no !== undefined &&
        props.formValues.commercial_registration_no !==
          props.editedCompanyData?.office_data?.eng_company_data
            ?.commercial_registration_no)
    ) {
      const timeoutId = setTimeout(
        () =>
          props.formValues.commercial_registration_no !== "" &&
          CheckUnique(
            "commercial_registration_no",
            props.formValues.commercial_registration_no,
            setLoader
          )
            .then((res) => {
              setLoader(false);
              if (res.status == 200) {
                setcommercial_registration_noUique(true);
              }
            })
            .catch((error) => {
              setLoader(false);
              if (error?.response?.status == 302) {
                setLoader(false);
                setcommercial_registration_noUique(false);
              }
            }),

        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [props.formValues.commercial_registration_no]);
  useEffect(() => {
    if (props.requestType == "create" && props.requestType !== undefined) {
      props.formValues.commercial_registration_no !== "" &&
        CheckUnique(
          "commercial_registration_no",
          props.formValues.commercial_registration_no,
          setLoader
        )
          .then((res) => {
            setLoader(false);
            if (res.status == 200) {
              setcommercial_registration_noUique(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setcommercial_registration_noUique(false);
            }
          });

      props.formValues.officeName !== "" &&
        CheckUnique("name", props.formValues.officeName, setLoader)
          .then((res) => {
            console.log(res);
            setLoader(false);
            if (res.status == 200) {
              setofficeNameUnique(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setofficeNameUnique(false);
            }
          });

      props.formValues.engofficeName !== "" &&
        CheckUnique("ename", props.formValues.engofficeName, setLoader)
          .then((res) => {
            setLoader(false);
            if (res.status == 200) {
              setengOfficeNameUnique(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setengOfficeNameUnique(false);
            }
          });
    }
  }, []);
  const onFinishStep = () => {
    if (
      commercial_registration_noUique &&
      engOfficeNameUnique &&
      officeNameUnique
    ) {
      props.nextStep();
    }
  };

  return (
    <Form
      ref={props.Step1FormRef}
      onFinish={onFinishStep}
      className=""
      layout="vertical">
      {loading ? <Loader /> : null}
      <Collapse defaultActiveKey={["1", "2"]}>
        <Panel header={"???????????????? ???????????????? ????????????"} key={1}>
          <Container>
            <Form.Item
              name="pledge"
              className="checkDiv"
              label="????????"
              initialValue={props.pledge}
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("???? ???????? ???????? ?????? ????????????")),
                },
              ]}>
              <Checkbox
                checked={props.pledge}
                className="ml-3"
                onChange={props.checkOKGeneralChecks}>
                ?????????? ?????? ???????? ???????????????? ?????????????? ?????????? ?? ???????????? ???? ?????????? ?? ????????????
                ?????????????? ?? ???? ?????? ?????? ?????? ???????????????? ?????? ?????? ???????? ???????????? ????????????????
                ???????????????? ?? ???????? ?????????? ???????????? ???? ???????????????? ???????? ?????????? ???? ???????? ???? ??
                ????????
              </Checkbox>
            </Form.Item>
            {/* </div> */}
            <Form.Item
              name="officeType"
              label="?????? ????????????"
              rules={[
                {
                  message: "???? ???????? ???????? ?????? ????????????",
                  required: true,
                },
              ]}
              initialValue={props.selectValues.officeType?.name}>
              <Select
                suffixIcon={<DownCircleFilled />}
                className="dont-show"
                onChange={props.handleSelect("officeType")}
                value={props.selectValues.officeType?.id}
                placeholder="???? ???????? ???????? ?????? ???????????? "
                getPopupContainer={(trigger) => trigger.parentNode}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option.value.indexOf(input) >= 0
                }>
                {props.officeTypes?.length > 0 &&
                  props.officeTypes?.map((i) => (
                    <Select.Option value={i.name} id={i.id} key={i.id} obj={i}>
                      {i.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              initialValue={props.formValues.officeName}
              name="officeName"
              label=" ?????? ????????????   "
              rules={[
                {
                  message: " ???? ???????? ???????? ?????? ????????????  ",
                  required: true,
                },
              ]}>
              <Input
                name="officeName"
                onChange={props.handleUserInput}
                value={props.formValues.officeName}
                placeholder=" ???? ???????? ???????? ?????? ????????????  "
              />
            </Form.Item>
            {!officeNameUnique ? (
              <p className="errMsg">?????? ???????????? ???????????? ???? ??????</p>
            ) : null}

            <Form.Item
              initialValue={props.formValues.engofficeName}
              name="engofficeName"
              label=" ?????? ???????????? ???????????? ???????????????????? "
              rules={[
                {
                  message: " ???? ???????? ???????? ?????? ???????????? ???????????? ???????????????????? ",
                  required: true,
                },
              ]}>
              <Input
                name="engofficeName"
                onChange={props.handleUserInput}
                value={props.formValues.engofficeName}
                placeholder=" ???? ???????? ???????? ?????? ???????????? ???????????? ???????????????????? "
              />
            </Form.Item>

            {!engOfficeNameUnique ? (
              <p className="errMsg">?????? ???????????? ?????????????????????? ???????????? ???? ??????</p>
            ) : null}
            <Form.Item
              name="mobile"
              initialValue={props.formValues.mobile}
              className="mobileNumFormItem"
              label="?????? ????????????"
              rules={[
                {
                  message: "???? ???????? ???????? ?????? ????????????",
                  required: true,
                  max: "9999",
                },
                {
                  max: 9,
                  message: "?????? ???????????? ???? ???????? ???? 9 ??????????",
                },
                {
                  min: 9,
                  message: "?????? ???????????? ???? ?????? ???? 9 ??????????",
                },
                {
                  pattern: new RegExp(/^5/),
                  message: "?????? ???? ???????? ?????? ???????????? ???????????? 5",
                },
              ]}>
              <Input
                addonAfter="966"
                type="number"
                min={0}
                onChange={props.handleUserInput}
                name="mobile"
                value={props.formValues.mobile}
                placeholder="???? ???????? ???????? ?????? ???????????? ???????? : (5xxxxxxxx)"
              />
            </Form.Item>
            <Form.Item
              initialValue={props.formValues.email}
              name="email"
              label="???????????? ????????????????????"
              rules={[
                {
                  type: "email",
                  message: "???????????? ???????????????????? ?????? ????????",
                },
                {
                  message: "???? ???????? ???????? ???????????? ????????????????????",
                  required: true,
                },
              ]}>
              <Input
                type="email"
                name="email"
                onChange={props.handleUserInput}
                value={props.formValues.email}
                placeholder=" ???? ???????? ???????? ???????????? ????????????????????"
              />
            </Form.Item>
            <Form.Item
              name="amanaOfficeRegNum"
              label="?????? ?????????? ???????????? ????????????????"
              initialValue={props.formValues.amanaOfficeRegNum}>
              <Input
                disabled={props.requestType == "edit" ? true : false}
                type="number"
                name="amanaOfficeRegNum"
                onChange={props.handleUserInput}
                value={props.formValues.amanaOfficeRegNum}
                placeholder="???? ???????? ???????? ?????? ?????????? ???????????? ????????????????"
              />
            </Form.Item>
            <Form.Item
              name="foundation_year"
              label=" ?????? ?????????? ???????????? "
              initialValue={props.formValues.foundation_year}
              rules={[
                {
                  message: "???? ???????? ???????? ?????? ?????????? ????????????",
                  required: true,
                },
                () => ({
                  validator(_, value) {
                    if (Number(value) > Number(moment().iYear())) {
                      return Promise.reject(
                        "?????? ???? ???? ?????????? ?????? ?????????????? ?????????? ?????????????? "
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}>
              <Input
                type="number"
                min={0}
                name="foundation_year"
                onChange={props.handleUserInput}
                value={props.formValues.foundation_year}
                placeholder="???? ???????? ???????? ?????? ?????????? ???????????? ???????? : ( 1420 )"
              />
            </Form.Item>
            <Form.Item
              name="commercial_registration_no"
              hasFeedback
              label="?????? ?????????? ??????????????"
              initialValue={props.formValues.commercial_registration_no}
              rules={[
                {
                  message: "???? ???????? ???????? ?????? ?????????? ??????????????",
                  required: true,
                },
              ]}>
              <Input
                type="number"
                min={0}
                name="commercial_registration_no"
                onChange={props.handleUserInput}
                value={props.formValues.commercial_registration_no}
                placeholder="???? ???????? ???????? ?????? ?????????? ??????????????"
              />
            </Form.Item>
            {!commercial_registration_noUique ? (
              <p className="errMsg">?????? ?????????? ?????????????? ???????????? ???? ??????</p>
            ) : null}
            <div className="calendatFormInput">
              <span>
                <FontAwesomeIcon
                  className="calendarFormIcon"
                  icon={faCalendar}
                />
              </span>
              <Form.Item
                name="commercial_reg_end_date"
                label="?????????? ???????????? ?????????? ??????????????"
                rules={[
                  {
                    message: "???? ???????? ???????? ?????????? ???????????? ?????????? ?????????????? ",
                    required: true,
                  },
                ]}
                initialValue={props.dates.commercial_reg_end_date}>
                <DatePicker
                  editable={false}
                  minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  placeholder="???? ???????? ???????? ?????????? ????????????????"
                  value={props.dates.commercial_reg_end_date}
                  onChange={props.onSelectDate("commercial_reg_end_date")}
                  locale="ar"
                  calendar="arabic"
                />
              </Form.Item>
            </div>
            <UploadFile
              label1=" ???????? ?????? ??????????????"
              label={
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${window.hostURL}${window.baseURI}/templates/regTemplate.jpg`}
                  download>
                  ???????? ?????? ??????????????
                  <FontAwesomeIcon
                    className="mx-3"
                    style={{ fontSize: "20px" }}
                    icon={faDownload}
                  />
                </a>
              }
              titleValue="RegistRequestImgStep1"
              uploadedImagesSingle={props.uploadedImagesSingle}
              SetSingleFileUpload={props.SetSingleFileUpload}
              DeleteSingleImage={props.DeleteSingleImage}
            />
            {/* upload multiple Files */}
            <UploadMultipleFiles
              mandatory={false}
              label=" ?????????? ???????????? ???? ?????????? ??????????????"
              titleValue="additionalFilesStep1"
              uploadedImagesMultiple={props.uploadedImagesMultiple}
              SetMultipleFilesUpload={props.SetMultipleFilesUpload}
              DeleteMultipleImages={props.DeleteMultipleImages}
            />
          </Container>
        </Panel>
        <Panel header={"?????????????? ????????????"} key={2}>
          <Form.Item
            rules={[
              {
                message: "???? ???????? ???????? ??????????????",
                required: true,
              },
            ]}
            name="address"
            label="??????????????"
            initialValue={props.formValues.address}>
            <Input
              name="address"
              onChange={props.handleUserInput}
              value={props.formValues.address}
              placeholder="???? ???????? ???????? ??????????????"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            initialValue={props.formValues.phone}
            label="?????? ????????????"
            rules={[
              {
                message: "???? ???????? ???????? ?????? ????????????",
                required: true,
              },
              {
                max: 9,
                message: "?????? ???????????? ???? ???????? ???? 9 ??????????",
              },
              {
                min: 9,
                message: "?????? ???????????? ???? ?????? ???? 9 ??????????",
              },
            ]}>
            <Input
              min={0}
              addonAfter="966"
              type="number"
              onChange={props.handleUserInput}
              name="phone"
              value={props.formValues.phone}
              placeholder="???? ???????? ???????? ?????? ???????????? ???????? : (5xxxxxxxx)"
            />
          </Form.Item>

          <Form.Item
            name="fax"
            label="????????????"
            initialValue={props.formValues.fax}>
            <Input
              type="number"
              name="fax"
              onChange={props.handleUserInput}
              value={props.formValues.fax}
              placeholder="???? ???????? ???????? ?????? ????????????"
            />
          </Form.Item>

          <Form.Item
            name="mail_box"
            label="?????????? ????????"
            initialValue={props.formValues.mail_box}>
            <Input
              name="mail_box"
              onChange={props.handleUserInput}
              value={props.formValues.mail_box}
              placeholder="???? ???????? ???????? ?????? ?????????? ???????????? ???????? : (2870)"
            />
          </Form.Item>

          <Form.Item
            name="postal_code"
            label="?????????? ??????????????"
            initialValue={props.formValues.postal_code}>
            <Input
              name="postal_code"
              onChange={props.handleUserInput}
              value={props.formValues.postal_code}
              placeholder="???? ???????? ???????? ?????? ?????????? ?????????????? ???????? : (31146)"
            />
          </Form.Item>

          <Form.Item
            name="city"
            initialValue={props.formValues.city}
            label="?????? ??????????????"
            rules={[
              {
                message: "???? ???????? ???????? ?????? ??????????????",
                required: true,
              },
            ]}>
            <Input
              name="city"
              onChange={props.handleUserInput}
              value={props.formValues.city}
              placeholder="???? ???????? ???????? ?????? ??????????????"
            />
          </Form.Item>
          <Form.Item
            initialValue={props.formValues.street}
            name="street"
            label="?????? ????????????"
            rules={[
              {
                message: "???? ???????? ???????? ?????? ????????????",
                required: true,
              },
            ]}>
            <Input
              name="street"
              onChange={props.handleUserInput}
              value={props.formValues.street}
              placeholder="???? ???????? ???????? ?????? ????????????"
            />
          </Form.Item>

          <Form.Item
            name="building"
            initialValue={props.formValues.building}
            label="?????? ????????????"
            rules={[
              {
                message: "???? ???????? ???????? ?????? ????????????",
                required: true,
              },
            ]}>
            <Input
              name="building"
              onChange={props.handleUserInput}
              value={props.formValues.building}
              placeholder="???? ???????? ???????? ?????? ????????????"
            />
          </Form.Item>

          <Form.Item
            name="floor"
            initialValue={props.formValues.floor}
            label=" ??????????"
            rules={[
              {
                message: "???? ???????? ???????? ??????????",
                required: true,
              },
            ]}>
            <Input
              name="floor"
              onChange={props.handleUserInput}
              value={props.formValues.floor}
              placeholder="???? ???????? ???????? ??????????"
            />
          </Form.Item>
          <Form.Item
            initialValue={props.formValues.appart}
            name="appart"
            label=" ????????????"
            rules={[
              {
                message: "???? ???????? ???????? ????????????",
                required: true,
              },
            ]}>
            <Input
              name="appart"
              onChange={props.handleUserInput}
              value={props.formValues.appart}
              placeholder="???? ???????? ???????? ????????????"
            />
          </Form.Item>

          <UploadFile
            label="???????? ???????????? ???????????? ??????????????"
            titleValue="SaudiPostSubscImgStep1"
            uploadedImagesSingle={props.uploadedImagesSingle}
            SetSingleFileUpload={props.SetSingleFileUpload}
            DeleteSingleImage={props.DeleteSingleImage}
          />

          <Form.Item label="???????? ?????????? ????????????">
            <Input disabled={true} value={"????????????"} />
          </Form.Item>
        </Panel>
      </Collapse>
      <div className="steps-action my-3">
       
        <Button type="primary" htmlType="submit" className="showBtn ml-3">
          ????????????
          <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
        </Button> <SaveEditsButton
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
        />
      </div>
    </Form>
  );
}
export default memo(RegistStep1);
