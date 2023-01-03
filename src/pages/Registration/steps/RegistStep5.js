import React, { useState, useEffect } from "react";
import { Collapse, Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import axios from "axios";
import Reaptcha from "reaptcha";

import Loader from "../../../containers/Loader";
import ConfirmRegistModal from "../modals/ConfirmRegistModal";
export default function RegistStep5(props) {
  const { Panel } = Collapse;
  const [loading, setLoader] = useState(false);
  const [uniqueValues, setUniqueValues] = useState({
    usernameUnique: true,
  });
  const CheckUniqueValue = (key, value, title) => {
    setLoader(true);
    axios
      .get(`${window.ApiUrl}/api/user/CheckUnique/?key=${key}&q=${value}`)
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
        props.formValues.username !== "" &&
        CheckUniqueValue(
          "username",
          props.formValues.username,
          "usernameUnique"
        ),

      1000
    );
    return () => clearTimeout(timeoutId);
  }, [props.formValues.username]);
  useEffect(() => {
    props.setCaptchaToken(null);
  }, []);

  return (
    <Form ref={props.Step4FormRef}  layout="vertical">
      {loading ? <Loader /> : null}
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={"بيانات الحساب"} key={1}>
          <Container>
            <Form.Item
              initialValue={props.formValues.username}
              rules={[
                {
                  message: "من فضلك ادخل اسم المستخدم",
                  required: true,
                },
              ]}
              name="username"
              hasFeedback
              label="اسم المستخدم">
              <Input
                name="username"
                onChange={props.handleUserInput}
                value={props.formValues.username}
                placeholder="من فضلك ادخل اسم المستخدم"
              />
            </Form.Item>
            {!uniqueValues.usernameUnique ? (
              <p className="errMsg"> اسم المستخدم مسجل من قبل</p>
            ) : null}
            <Form.Item
              initialValue={props.formValues.password}
              className="passwordInputt"
              rules={[
                {
                  pattern: new RegExp(
                    /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
                  ),
                  message:
                    "  الرجاءإدخال كلمة مرور معقدة لا يقل طولها عن 8 رموز تحتوي علي حرف كبير و حرف صغير و أرقام وعلامات خاصة ",
                },
                {
                  required: true,
                  message: "من فضلك أدخل كلمة المرور",
                },
              ]}
              name="password"
              hasFeedback
              label="كلمة المرور ">
              <Input.Password
                size="large"
                name="password"
                onChange={props.handleUserInput}
                value={props.formValues.password}
                placeholder="من فضلك ادخل كلمة المرور"
              />
            </Form.Item>
            <Form.Item
              initialValue={props.formValues.confirmNewPassword}
              className="passwordInputt"
              rules={[
                {
                  message: "من فضلك ادخل تأكيد كلمة المرور",
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("كلمة المرور غير متطابقة ")
                    );
                  },
                }),
              ]}
              dependencies={["password"]}
              name="confirmNewPassword"
              hasFeedback
              label="تأكيد كلمة المرور ">
              <Input.Password
                size="large"
                name="confirmNewPassword"
                onChange={props.handleUserInput}
                value={props.formValues.confirmNewPassword}
                placeholder="من فضلك ادخل تأكيد كلمة المرور"
              />
            </Form.Item>
            {/* <ReCAPTCHA
              className="gCapatcha"
              ref={props.captchaRef}
              onExpired={() =>
                props.setCapatchValues({
                  capatcha: false,
                  valueCap: "",
                  capatchError: "capatchError",
                })
              }
              onChange={props.onRecapchaChange}
              sitekey="6LdL_JIbAAAAANEnukVEATtXKQ_InEvsT5NWJdsQ"
            /> */}

            <Reaptcha
              sitekey="6LdL_JIbAAAAANEnukVEATtXKQ_InEvsT5NWJdsQ"
              ref={props.captchaRef}
              onVerify={props.verifyCapatcha}
            />
            {props.captchaToken === null ? (
              <p className="errMsg pt-2">هذا الحقل مطلوب</p>
            ) : (
              ""
            )}
          </Container>
        </Panel>
      </Collapse>
      <ConfirmRegistModal
        onRegist={props.onRegist}
        openConfirmModal={props.openConfirmModal}
        showConfirmModal={props.showConfirmModal}
      />
      <div className="steps-action my-3">
        <Button
          className="saveEditsBtn mx-2"
          onClick={props.saveEditsToLocalStorage}>
          حفظ التعديلات
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="showBtn ml-3"
          onClick={props.openConfirmModal}>
          إرسال
          <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => props.prevStep()}
          className="showBtn  prevBtn ml-3">
          <FontAwesomeIcon className=" ml-2 " icon={faArrowRight} />
          السابق
        </Button>
      </div>
    </Form>
  );
}
