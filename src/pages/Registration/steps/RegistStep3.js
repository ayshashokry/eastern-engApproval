import React, { useState, useEffect } from "react";
import { Collapse, Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import moment from "moment-hijri";
import UploadFile from "../../../containers/inputs/UploadFile";
import { CheckUniqueLic } from "../../../apis/FetchApi";
import Loader from "../../../containers/Loader";
export default function RegistStep3(props) {
  const { Panel } = Collapse;
  const [loading, setLoader] = useState(false);

  const [liceNumUnique1, setliceNumUnique1] = useState(true);
  const [liceNumUnique2, setliceNumUnique2] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        props.formValues.liceNum1 !== "" &&
        CheckUniqueLic(props.formValues.liceNum1, setLoader, 1)
          .then((res) => {
            console.log(res);
            setLoader(false);
            if (res.status == 200) {
              setliceNumUnique1(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setliceNumUnique1(false);
            }
          }),

      1000
    );
    return () => clearTimeout(timeoutId);
  }, [props.formValues.liceNum1]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        props.formValues.liceNum2 !== "" &&
        CheckUniqueLic(props.formValues.liceNum2, setLoader, 3)
          .then((res) => {
            console.log(res);
            setLoader(false);
            if (res.status == 200) {
              setliceNumUnique2(true);
            }
          })
          .catch((error) => {
            setLoader(false);
            if (error?.response?.status == 302) {
              setLoader(false);
              setliceNumUnique2(false);
            }
          }),

      1000
    );
    return () => clearTimeout(timeoutId);
  }, [props.formValues.liceNum2]);
  return (
    <Form
      ref={props.Step3FormRef}
      onFinish={() => props.nextStep()}
      layout="vertical">
      {" "}
      {loading ? <Loader /> : null}
      <Collapse defaultActiveKey={["1", "2"]}>
        <Panel header={"رخصة المكتب من البلدية"} key={1}>
          <Container>
            <Form.Item
              name="liceNum1"
              label="رقم الترخيص"
              hasFeedback
              initialValue={props.formValues.liceNum1}
              rules={[
                {
                  message: "من فضلك ادخل رقم الترخيص",
                  required: true,
                },
              ]}>
              <Input
                name="liceNum1"
                onChange={props.handleUserInput}
                value={props.formValues.liceNum1}
                placeholder="من فضلك ادخل رقم الترخيص"
              />
            </Form.Item>
            {!liceNumUnique1 ? (
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
                name="Step3releaseDate"
                hasFeedback
                label="تاريخ الإصدار"
                initialValue={props.dates.Step3releaseDate}
                rules={[
                  {
                    message: "من فضلك ادخل تاريح الاصدار ",
                    required: true,
                  },
                ]}>
                <DatePicker
                  editable={false}
                  maxDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  // required
                  placeholder="من فضلك اختر تاريخ الإصدار"
                  value={props.dates.Step3releaseDate}
                  onChange={props.onSelectDate("Step3releaseDate")}
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
                initialValue={props.dates.Step3licFinishDate}
                rules={[
                  {
                    message: "من فضلك ادخل تاريخ انتهاء الرخصة ",
                    required: true,
                  },
                ]}
                name="Step3licFinishDate"
                hasFeedback
                label="تاريخ انتهاء الرخصة">
                <DatePicker
                  editable={false}
                  minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                  // required
                  placeholder="من فضلك اختر تاريخ انتهاء الرخصة"
                  value={props.dates.Step3licFinishDate}
                  onChange={props.onSelectDate("Step3licFinishDate")}
                  locale="ar"
                  calendar="arabic"
                />
              </Form.Item>
            </div>
            <UploadFile
              label=" صورة الرخصة الصادرة من البلدية"
              titleValue="MunLicenseImgStep3"
              uploadedImagesSingle={props.uploadedImagesSingle}
              SetSingleFileUpload={props.SetSingleFileUpload}
              DeleteSingleImage={props.DeleteSingleImage}
            />
          </Container>
        </Panel>
        <Panel header={"بيانات التأمينات الاجتماعية"} key={2}>
          <Form.Item
            name="liceNum2"
            label="رقم الترخيص"
            initialValue={props.formValues.liceNum2}
            hasFeedback
            rules={[
              {
                message: "من فضلك ادخل رقم الترخيص",
                required: true,
              },
            ]}>
            <Input
              name="liceNum2"
              onChange={props.handleUserInput}
              value={props.formValues.liceNum2}
              placeholder="من فضلك ادخل رقم الترخيص"
            />
          </Form.Item>{" "}
          {!liceNumUnique2 ? (
            <p className="errMsg">رقم الرخصة مسجل من قبل</p>
          ) : null}
          <Form.Item
            name="subscripNum"
            initialValue={props.formValues.subscripNum}
            label="رقم الاشتراك"
            hasFeedback
            rules={[
              {
                message: "من فضلك ادخل رقم الاشتراك",
                required: true,
              },
            ]}>
            <Input
              name="subscripNum"
              onChange={props.handleUserInput}
              value={props.formValues.subscripNum}
              placeholder="من فضلك ادخل رقم الاشتراك"
            />
          </Form.Item>
          <div className="calendatFormInput">
            <span>
              <FontAwesomeIcon className="calendarFormIcon" icon={faCalendar} />
            </span>
            <Form.Item
              name="certifFinishDate"
              rules={[
                {
                  message: "من فضلك ادخل تاريخ انتهاء الشهادة ",
                  required: true,
                },
              ]}
              hasFeedback
              initialValue={props.dates.certifFinishDate}
              label="تاريخ انتهاء الشهادة">
              <DatePicker
                editable={false}
                minDate={moment(new Date()).format("iYYYY/iMM/iDD")}
                // required
                placeholder="من فضلك اختر تاريخ انتهاء الشهادة"
                value={props.dates.certifFinishDate}
                onChange={props.onSelectDate("certifFinishDate")}
                locale="ar"
                calendar="arabic"
              />
            </Form.Item>
          </div>
          <UploadFile
            label="شهادة التأمينات الاجتماعية"
            titleValue="SocialInsurCertifStep3"
            uploadedImagesSingle={props.uploadedImagesSingle}
            SetSingleFileUpload={props.SetSingleFileUpload}
            DeleteSingleImage={props.DeleteSingleImage}
          />
          <UploadFile
            label="برنت التأمينات الاجتماعية"
            titleValue="SocialInsurPrintStep3"
            uploadedImagesSingle={props.uploadedImagesSingle}
            SetSingleFileUpload={props.SetSingleFileUpload}
            DeleteSingleImage={props.DeleteSingleImage}
          />
        </Panel>
      </Collapse>
      <div className="steps-action my-3">
        <Button
          onClick={props.saveEditsToLocalStorage}
          className="saveEditsBtn mx-2">
          حفظ التعديلات
        </Button>
        <Button type="primary" htmlType="submit" className="showBtn ml-3">
          التالي
          <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
        </Button>
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
