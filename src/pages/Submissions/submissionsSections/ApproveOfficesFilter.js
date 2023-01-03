import React, { useEffect, useState } from "react";
import { Form, Select, Col, Button, Row } from "antd";
import { FetchFiltersData } from "../../../helpers/FetchFiltersData";
export default function ApproveOfficesFilter(props) {
  const [allCategories, setAllCategories] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    let userToken = localStorage.getItem("token");
    //get categories
    FetchFiltersData("EnginneringCompanyClass", userToken)
      .then((res) => {
        setAllCategories(res.data.results);
      })
      .catch((error) => console.log(error));

    //get department
    FetchFiltersData(
      `Department?q=${1}&filter_key=${"approving_dep"}&operand==`,
      userToken
    )
      .then((res) => {
        setAllDepartments(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Form
      className="my-2 px-5 serviceForm"
      layout="vertical"
      name="validate_other">
      <Row>
        <Col
          md={{ span: 10 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className="px-2">
          <Form.Item label="الفئة" name="category">
            <Select
            //   virtual={false}
              showSearch
              allowClear
              className="dont-show"
              onChange={props.handleSelectFilter("category")}
              value={props.approvedOfficesFilters.category}
              placeholder="اختر فئة"
              getPopupContainer={(trigger) => trigger.parentNode}>
              <Select.Option name="category" id="" v="" value="">
                الكل
              </Select.Option>
              {allCategories && allCategories.length !== 0
                ? allCategories.map((c, index) => (
                    <Select.Option
                      value={c.name}
                      key={c.id}
                      id={c.id}
                      name="category">
                      {c.name}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Col>
        <Col
          md={{ span: 10 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className="px-2">
          <Form.Item
            label="الإدارة المقدم إليها طلب الاعتماد "
            name="department">
            <Select
              virtual={false}
              showSearch
              allowClear
              className="dont-show"
              onChange={props.handleSelectFilter("department")}
              value={props.approvedOfficesFilters.department}
              placeholder="اختر الإدارة"
              getPopupContainer={(trigger) => trigger.parentNode}>
              <Select.Option name="department" id="" v="" value="">
                الكل
              </Select.Option>
              {allDepartments && allDepartments.length !== 0
                ? allDepartments.map((c, index) => (
                    <Select.Option
                      value={c.name}
                      name="department"
                      key={c.id}
                      id={c.id}>
                      {c.name}
                    </Select.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Col>
        <Col md={{ span: 3 }} sm={{ span: 24 }} className="px-2 m-auto">
          <Button onClick={props.SearchApprovedOfiices}>بحث</Button>
        </Col>
      </Row>
    </Form>
  );
}
