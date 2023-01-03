import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { fetchTablesData } from "../../helpers/SubmissionsFetchData";
import SubmissionTable from "./submissionsSections/SubmissionTable";
import { fetchTablesDataPage } from "../../helpers/submissionsFetchDataPage";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";
import inboxImg from "../../assets/images/inbox.svg";
import rejectedImg from "../../assets/images/rejected.svg";
import archiveImg from "../../assets/images/archive.svg";

import sentImg from "../../assets/images/sent.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getCompanyConts } from "../../apis/FetchApi";
import { toArabic } from "arabic-digits";
function Submissions(props) {
  let userToken = "";
  let userData = {};

  const [approvedOfficesFilters, setApprovedFilters] = useState({
    category: "",
    department: "",
  });
  const handleSelectFilter = (name) => (value, e) => {
    setApprovedFilters({ ...approvedOfficesFilters, [name]: value });
  };
  const [viewOnly, setViewOnly] = useState(false);

  const [loading, setLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const [tabsData, setTabsData] = useState([
    {
      id: 1,
      name: "طلبات الاعتماد",
      RequestsData: [],
      RequestsPagination: [],
      currentPage: 1,
      endPoint: viewOnly ? "GetAllInDepartmentForReview" : "GetAllInDepartment",
      icon: <img className="mx-2" src={inboxImg} alt="sentIcon" />,
    },
    {
      id: 2,
      name: "المكاتب الهندسية المفعلة",
      RequestsData: [],
      RequestsPagination: [],
      currentPage: 1,
      endPoint: "GetAllApproved",
      allDataArray: [],
      icon: <img className="mx-2" src={sentImg} alt="rejectedImg" />,
    },
    {
      id: 3,
      name: "المكاتب الهندسية المعتذر عنها",
      RequestsData: [],
      RequestsPagination: [],
      currentPage: 1,
      endPoint: "GetAllRejected",
      icon: <img className="mx-2" src={rejectedImg} alt="rejectedImg" />,
    },
    {
      id: 4,
      name: "الأرشيف",
      currentPage: 1,
      icon: <img className="mx-2" src={archiveImg} alt="rejectedImg" />,
    },
  ]);
  const [companyCounts, setCompanyCounts] = useState({});
  useEffect(() => {
    //getToken To localSorage
    userToken = localStorage.getItem("token");
    userData = JSON.parse(localStorage.getItem("user"));

    if (
      userToken !== null &&
      userToken !== undefined &&
      userData !== null &&
      userData !== undefined
    ) {
      if (userData.groups !== null) {
        userData.groups.forEach((x) =>
          x.groups_permissions !== null
            ? x.groups_permissions.find((y) => y.apps_modules.id == 31) !==
              undefined
              ? (setViewOnly(false),
                setLoader(true),
                fetchTablesData("GetAllInDepartment", userToken)
                  .then((res) => {
                    setLoader(false);
                    const newdata = tabsData.slice();
                    newdata[0].RequestsData = res.data.results;
                    newdata[0].RequestsPagination = res.data;
                    setTabsData(newdata);
                  })
                  .catch((error) => setLoader(false)))
              : x.groups_permissions.find((y) => y.apps_modules.id == 38) !==
                undefined
              ? (setViewOnly(true),
                setLoader(true),
                fetchTablesData("GetAllInDepartmentForReview", userToken)
                  .then((res) => {
                    setLoader(false);

                    const newdata = tabsData.slice();
                    newdata[0].RequestsData = res.data.results;
                    newdata[0].RequestsPagination = res.data;
                    setTabsData(newdata);
                  })
                  .catch((error) => setLoader(false)))
              : null
            : null
        );
      }
    }
    getCompanyConts().then((res) => setCompanyCounts(res.data));
  }, []);
  const changeTablesData = (id, updateOnly) => {
    userToken = localStorage.getItem("token");
    userData = JSON.parse(localStorage.getItem("user"));
    setSelectedTab(id);
    if (updateOnly == undefined) {
      setLoader(true);
    }
    if (id !== 4) {
      const newdata = tabsData.slice();
      newdata[id - 1].currentPage = 1;
      fetchTablesData(
        id == 1
          ? viewOnly
            ? "GetAllInDepartmentForReview"
            : "GetAllInDepartment"
          : id == 2
          ? "GetAllApproved"
          : "GetAllRejected",
        userToken
      )
        .then((res) => {
          setLoader(false);
          newdata[id - 1].RequestsData = res.data.results;
          newdata[id - 1].RequestsPagination = res.data;
          if (id == 2) {
            newdata[id - 1].allDataArray = res.data.results;
          }
          setTabsData(newdata);
        })
        .catch((error) => setLoader(false));
    }
  };

  const handleChangePagination = (page, tabId) => {
    userToken = localStorage.getItem("token");

    setLoader(true);
    const newdata = tabsData.slice();

    newdata[tabId - 1].currentPage = page;
    if (
      (newdata[tabId - 1].RequestsPagination.next !== "" &&
        newdata[tabId - 1].RequestsPagination.next !== undefined) ||
      (newdata[tabId - 1].RequestsPagination.prevURL !== "" &&
        newdata[tabId - 1].RequestsPagination.prevURL !== undefined)
    ) {
      fetchTablesDataPage(newdata[tabId - 1].endPoint, userToken, page)
        .then((res) => {
          setLoader(false);
          newdata[tabId - 1].RequestsData = res.data.results;
          newdata[tabId - 1].RequestsPagination = res.data;
          if (tabId == 2) {
            newdata[tabId - 1].allDataArray = res.data.results;
          }
          setTabsData(newdata);
        })
        .catch((error) => setLoader(false));
    }
  };

  const filterTasks = (tasks, category, department) => {
    let filteredTasks = tasks;
    if (category)
      filteredTasks = filteredTasks.filter((t) =>
        t.eng_comp_class !== null
          ? String(t.eng_comp_class.name).includes(category)
          : null
      );
    if (department)
      filteredTasks = filteredTasks.filter((t) =>
        t.department_eng_comp.find(
          (x) => console.log(x)
          // x.departments.name.includes(department)
        )
      );
    return filteredTasks;
  };
  const SearchApprovedOfiices = (e) => {
    const filteredTasks = filterTasks(
      tabsData[1].allDataArray,
      approvedOfficesFilters.category,
      approvedOfficesFilters.department
    );

    const newdata = tabsData.slice();
    newdata[1].RequestsData = filteredTasks;
    setTabsData(newdata);
  };
  const [sideMenuIsOpen, setSideMenuOpen] = useState(true);
  const handleSideMenuOpen = () => {
    setSideMenuOpen(!sideMenuIsOpen);
  };
  return (
    <div className="submissionPage1 submissionPage1Div ">
      <SmallNavbar />
      <div className="AppName"> اعتماد المكاتب الهندسية</div>
      <Tabs
        className={sideMenuIsOpen ? "sideMenuOpen" : "sideMenuClose "}
        tabPosition="right"
        defaultActiveKey={selectedTab}
        activeKey={String(selectedTab)}
        onChange={(tab) => changeTablesData(tab)}>
        {sideMenuIsOpen ? (
          <span onClick={handleSideMenuOpen} className="arrowIconOpen">
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                cursor: "pointer",
              }}
            />
          </span>
        ) : (
          <span className="arrowIconOpen" onClick={handleSideMenuOpen}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                cursor: "pointer",
              }}
            />
          </span>
        )}

        {viewOnly
          ? tabsData
              .filter((tab) => tab.id == 1)
              .map((t) => (
                <Tabs.TabPane
                  tab={
                    sideMenuIsOpen ? (
                      <>
                        {t.icon} {t.name}
                        {companyCounts !== null && (
                          <span className="appCount">
                            {t.id == 1 && viewOnly
                              ? toArabic(companyCounts.underReview)
                              : t.id == 1 && !viewOnly
                              ? toArabic(companyCounts.underApprovel)
                              : t.id == 2
                              ? toArabic(companyCounts.approved)
                              : t.id == 3
                              ? toArabic(companyCounts.refused)
                              : null}
                          </span>
                        )}
                      </>
                    ) : (
                      t.icon
                    )
                  }
                  key={t.id}>
                  {console.log(Object.keys(companyCounts).length == 0)}
                  <SubmissionTable
                    viewOnly={viewOnly}
                    selectedTab={selectedTab}
                    loading={loading}
                    handleChangePagination={handleChangePagination}
                    t={tabsData.filter((x) => x.id == selectedTab)[0]}
                    changeTablesData={changeTablesData}
                  />
                </Tabs.TabPane>
              ))
          : tabsData.map((t) => (
              <Tabs.TabPane
                tab={
                  sideMenuIsOpen ? (
                    <>
                      {t.icon}
                      {t.name}
                      <span className="appCount">
                        {t.id == 1 && viewOnly
                          ? toArabic(companyCounts.underReview)
                          : t.id == 1 && !viewOnly
                          ? toArabic(companyCounts.underApprovel)
                          : t.id == 2
                          ? toArabic(companyCounts.approved)
                          : t.id == 3
                          ? toArabic(companyCounts.refused)
                          : null}
                      </span>
                    </>
                  ) : (
                    t.icon
                  )
                }
                key={t.id}>
                <SubmissionTable
                  viewOnly={viewOnly}
                  loading={loading}
                  selectedTab={selectedTab}
                  changeTablesData={changeTablesData}
                  SearchApprovedOfiices={SearchApprovedOfiices}
                  approvedOfficesFilters={approvedOfficesFilters}
                  handleSelectFilter={handleSelectFilter}
                  handleChangePagination={handleChangePagination}
                  t={tabsData.filter((x) => x.id == selectedTab)[0]}
                />
              </Tabs.TabPane>
            ))}
      </Tabs>
      <div className="submissionPage1Footer">
        <SmallFooter />
      </div>
    </div>
  );
}

export default React.memo(Submissions);
