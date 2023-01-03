import React from "react";
import { Table } from "react-bootstrap";
import { Pagination, ConfigProvider } from "antd";
import { tableHeader as tableHeaderAccred } from "./AccreditationRequestsTable";
import AccreditationRequestsTable from "./AccreditationRequestsTable";

import { tableHeader as tableHeaderApprove } from "./AllApprovedTable";
import AllApprovedTable from "./AllApprovedTable";

import AllRejectedTable from "./AllRejectedTable";
import { tableHeader as tableHeaderReject } from "./AllRejectedTable";
import ApproveOfficesFilter from "./ApproveOfficesFilter";
import Loader from "../../../containers/Loader";
import ArchivePage from "./ArchivePage";
export default function SubmissionTable(props) {
  return (
    <>
      {props.loading ? (
        <Loader />
      ) : props.t?.id === 4 ? (
        <ArchivePage />
      ) : (
        <>
          <div className=" mt-4 ml-5">
            {/* {props.t?.id === 2 && (
              <ApproveOfficesFilter
                SearchApprovedOfiices={props.SearchApprovedOfiices}
                approvedOfficesFilters={props.approvedOfficesFilters}
                handleSelectFilter={props.handleSelectFilter}
              />
            )} */}
            <Table className="mt-2 ownerTable engTable showTable " responsive>
              <thead>
                {props.t?.id === 1
                  ? tableHeaderAccred
                  : props.t.id === 2
                  ? tableHeaderApprove
                  : tableHeaderReject}
              </thead>
              <tbody>
                {props.t?.id === 1 ? (
                  <AccreditationRequestsTable
                    selectedTab={props.selectedTab}
                    t={props.t}
                    viewOnly={props.viewOnly}
                    changeTablesData={props.changeTablesData}
                  />
                ) : props.t?.id === 2 ? (
                  <AllApprovedTable
                    selectedTab={props.selectedTab}
                    t={props.t}
                    changeTablesData={props.changeTablesData}
                  />
                ) : (
                  <AllRejectedTable
                    t={props.t}
                    selectedTab={props.selectedTab}
                    changeTablesData={props.changeTablesData}
                  />
                )}
              </tbody>
            </Table>
          </div>
          {props.t.RequestsPagination.next === "" &&
          props.t.RequestsPagination.prevURL === "" ? null : (
            <ConfigProvider direction="rtl">
              <Pagination
                className="mt-4"
                current={props.t.currentPage}
                defaultCurrent={props.t.currentPage}
                pageSize={12}
                total={props.t.RequestsPagination.count}
                // onChange={page=>}
                style={{ bottom: "0px" }}
                onChange={(page) =>
                  props.handleChangePagination(page, props.t.id)
                }
              />
            </ConfigProvider>
          )}
        </>
      )}
    </>
  );
}
