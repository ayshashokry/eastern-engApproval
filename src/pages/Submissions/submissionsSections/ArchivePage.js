import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Pagination, ConfigProvider } from "antd";
import axios from "axios";

import Loader from "../../../containers/Loader";
import { Table } from "react-bootstrap";
export default function ArchivePage() {
  //   const [dates, setDates] = useState({
  //     fromDate: null,
  //     toDate: null,
  //   });

  //   const onSelectDate = (name) => (value) => {
  //     setDates({
  //       ...dates,
  //       [name]: moment(new Date(value)).format("iDD/iMM/iYYYY"),
  //     });
  //   };
  const [searchValues, setSearchValues] = useState({
    commerNum: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSearchInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchValues({ ...searchValues, [name]: value });
  };
  const [searchData, setSearchData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const onSearch = () => {
    setLoading(true);
    let userToken = localStorage.getItem("token");
    let paramsData = {};
    // paramsData.count = 12;
    // if (dates.fromDate !== null) paramsData.from_date = dates.fromDate;
    // if (dates.toDate !== null) paramsData.to_date = dates.toDate;
    if (searchValues.commerNum !== "" && searchType == 2)
      paramsData.commercial_registration_no = searchValues.commerNum;
    if (category !== undefined && searchType == 3)
      paramsData.class_id = category;
    if (searchValues.name !== "" && searchType == 1)
      paramsData.name = searchValues.name;
    axios
      .get(
        `${window.ApiUrl}/engineercompany/search/1`,

        {
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${userToken}`,
          },
          params: paramsData,
        }
      )
      .then((res) => {
        setSearchData(res.data);
        if (res.data.results.length == 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const handleChangePage = (page) => {
    let userToken = localStorage.getItem("token");
    let paramsData = {};
    // paramsData.count = 12;
    // if (dates.fromDate !== null) paramsData.from_date = dates.fromDate;
    // if (dates.toDate !== null) paramsData.to_date = dates.toDate;
    if (searchValues.commerNum !== "" && searchType == 2)
      paramsData.commercial_registration_no = searchValues.commerNum;
    if (category !== undefined && searchType == 3)
      paramsData.class_id = category;
    if (searchValues.name !== "" && searchType == 1)
      paramsData.name = searchValues.name;
    setCurrentPage(page);
    if (
      (searchData.next !== "" && searchData.next !== undefined) ||
      (searchData.prevURL !== "" && searchData.prevURL !== undefined)
    ) {
      axios
        .get(`${window.ApiUrl}/engineercompany/search/${page}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${userToken}`,
          },
          params: paramsData,
        })
        .then((res) => {
          if (res.data) {
            setSearchData(res.data);
          }
        });
    }
  };
  const onDeleteSearch = () => {
    setSearchData([]);
  };
  const [searchType, setSearchType] = useState(undefined);
  const changeSearchType = (value) => {
    setSearchType(value);
    setNoResults(false);
    setSearchValues({
      commerNum: "",
      name: "",
    });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    //get Categories
    axios.get(`${window.ApiUrl}/api/EnginneringCompanyClass`).then((res) => {
      setCategories(res.data.results);
    });
  }, []);
  const [category, setCategory] = useState(undefined);
  const changeSelectedCategory = (value) => {
    setCategory(value);
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <Form className="archivePageForm" layout="vertical">
        <Form.Item label="طريقة البحث">
          <Select
            placeholder="اختر طريقة البحث"
            value={searchType}
            onChange={changeSearchType}>
            <Select.Option value="1">اسم المكتب</Select.Option>
            <Select.Option value="2">رقم السجل التجاري</Select.Option>
            <Select.Option value="3">فئة المكتب</Select.Option>
          </Select>
        </Form.Item>
        {searchType == 1 ? (
          <Form.Item label="الاسم" name="name">
            <Input
              name="name"
              onChange={handleSearchInput}
              value={searchValues.name}
              placeholder="الإسم"
            />
          </Form.Item>
        ) : searchType == 2 ? (
          <Form.Item label="رقم السجل التجاري" name="commerNum">
            <Input
              type="number"
              min={0}
              name="commerNum"
              onChange={handleSearchInput}
              value={searchValues.commerNum}
              placeholder="رقم السجل التجاري"
            />
          </Form.Item>
        ) : searchType == 3 ? (
          <Form.Item label="الفئة">
            <Select
              placeholder="اختر الفئة"
              value={category}
              onChange={changeSelectedCategory}>
              {categories.length > 0 &&
                categories.map((c) => (
                  <Select.Option value={c.id}>{c.name}</Select.Option>
                ))}
            </Select>
          </Form.Item>
        ) : null}
      </Form>
      <div style={{ textAlign: "center" }}>
        <Button className="showBtn" onClick={onSearch}>
          بحث
        </Button>
        <Button className="resetBtn mx-2" onClick={onDeleteSearch}>
          مسح
        </Button>
      </div>

      <div className="archiveData">
        {searchData?.results?.length > 0
          ? searchData?.results?.map((arch) => (
              <div className="archiveCard">
                <div className="archiveCardBtns">
                  <Button className="m-2 addEmpBtn">عرض</Button>
                  {/* <Button className='m-2 addEmpBtn'>متابعة</Button> */}
                  {/* <Button className='m-2 addEmpBtn'>طباعة</Button> */}
                </div>
                <Table className="archiveTable">
                  <tr>
                    <th>اسم المكتب</th>
                    <td>{arch.name}</td>
                  </tr>
                  <tr>
                    <th>البريد الالكتروني</th>
                    <td>{arch.email}</td>
                  </tr>
                  <tr>
                    <th>رقم السجل التجاري</th>
                    <td>{arch.commercial_registration_no}</td>
                  </tr>
                  <tr>
                    <th>رقم الجوال</th>
                    <td>{arch.mobile}</td>
                  </tr>
                </Table>
              </div>
            ))
          : null}

          <ConfigProvider direction="rtl">
            <Pagination
              className="mt-4"
              current={currentPage}
              defaultCurrent={currentPage}
              pageSize={12}
              total={searchData.count}
              onChange={handleChangePage}
              style={{ bottom: "0px" }}
            />
          </ConfigProvider>
        
        {noResults ? <p className="noResultsArchive">لا توجد نتائج</p> : null}
      </div>
    </>
  );
}
