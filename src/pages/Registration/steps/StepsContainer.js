import React from "react";
import { Container } from "react-bootstrap";
import Media from "react-media";
import { Steps } from "antd";
import RegistStep1 from "./RegistStep1";
import RegistStep2 from "./RegistStep2";
import RegistStep3 from "./RegistStep3";
import RegistStep4 from "./RegistStep4";
import RegistStep5 from "./RegistStep5";

import Logo from "../../../assets/images/amanaLogo.png";

const { Step } = Steps;

export default function StepsContainer(props) {
  let contents = [
    {
      id: 0,
      content: (
        <RegistStep1
          showConfirmModal={props.showConfirmModal}
          openConfirmModal={props.openConfirmModal}
          editedCompanyData={props.editedCompanyData}
          officeTypes={props.officeTypes}
          handleUserInput={props.handleUserInput}
          Step1FormRef={props.Step1FormRef}
          formValues={props.formValues}
          dates={props.dates}
          onSelectDate={props.onSelectDate}
          nextStep={props.nextStep}
          pledge={props.pledge}
          checkOKGeneralChecks={props.checkOKGeneralChecks}
          selectValues={props.selectValues}
          handleSelect={props.handleSelect}
          //Single files
          SetSingleFileUpload={props.SetSingleFileUpload}
          uploadedImagesSingle={props.uploadedImagesSingle}
          DeleteSingleImage={props.DeleteSingleImage}
          //Multiple files
          SetMultipleFilesUpload={props.SetMultipleFilesUpload}
          uploadedImagesMultiple={props.uploadedImagesMultiple}
          DeleteMultipleImages={props.DeleteMultipleImages}
          //Save Edits to localStorage
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
          requestType={props.requestType}
        />
      ),
    },
    {
      id: 1,
      content: (
        <RegistStep2
          showConfirmModal={props.showConfirmModal}
          openConfirmModal={props.openConfirmModal}
          jobs={props.jobs}
          employeeSpecialities={props.employeeSpecialities}
          professionaLevels={props.professionaLevels}
          nationalities={props.nationalities}
          IDTypes={props.IDTypes}
          Step2FormRef={props.Step2FormRef}
          empModalFiles={props.empModalFiles}
          Step2EditFormRef={props.Step2EditFormRef}
          Step2AddFormRef={props.Step2AddFormRef}
          selectValues={props.selectValues}
          handleSelect={props.handleSelect}
          formValues={props.formValues}
          onSelectDate={props.onSelectDate}
          handleUserInput={props.handleUserInput}
          dates={props.dates}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
          addStaff={props.addStaff}
          deleteSelectedStaffFromTable={props.deleteSelectedStaffFromTable}
          selectedStaffData={props.selectedStaffData}
          selectedEmployees={props.selectedEmployees}
          //employees data
          deleteEmployee={props.deleteEmployee}
          handleEmployeesInput={props.handleEmployeesInput}
          employeesValues={props.employeesValues}
          saveEmployeeData={props.saveEmployeeData}
          saveAddNewEmployee={props.saveAddNewEmployee}
          showEditModal={props.showEditModal}
          openEditModal={props.openEditModal}
          showAddModal={props.showAddModal}
          closeEditModal={props.closeEditModal}
          closeAddEmployeeModal={props.closeAddEmployeeModal}
          openAddEmployeeModal={props.openAddEmployeeModal}
          handleEmployeeSelect={props.handleEmployeeSelect}
          selectEmployeeValues={props.selectEmployeeValues}
          onSelectEmployeeDate={props.onSelectEmployeeDate}
          employeeDates={props.employeeDates}
          employeeChecks={props.employeeChecks}
          employeeCheckOk={props.employeeCheckOk}
          SetSingleFileUpload={props.SetSingleFileUpload}
          uploadedImagesSingle={props.uploadedImagesSingle}
          DeleteSingleImage={props.DeleteSingleImage}
          setEmployeeSpecialityByDefault={props.setEmployeeSpecialityByDefault}
          //Multiple files
          SetMultipleFilesUpload={props.SetMultipleFilesUpload}
          uploadedImagesMultiple={props.uploadedImagesMultiple}
          DeleteMultipleImages={props.DeleteMultipleImages}
          //Save Edits to localStorage
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
          requestType={props.requestType}
          onCheckStaff={props.onCheckStaff}
          checkedStaff={props.checkedStaff}
        />
      ),
    },
    {
      id: 2,
      content: (
        <RegistStep3
          showConfirmModal={props.showConfirmModal}
          openConfirmModal={props.openConfirmModal}
          Step3FormRef={props.Step3FormRef}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
          formValues={props.formValues}
          handleUserInput={props.handleUserInput}
          selectValues={props.selectValues}
          handleSelect={props.handleSelect}
          onSelectDate={props.onSelectDate}
          dates={props.dates}
          SetSingleFileUpload={props.SetSingleFileUpload}
          uploadedImagesSingle={props.uploadedImagesSingle}
          DeleteSingleImage={props.DeleteSingleImage}
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
          requestType={props.requestType}
        />
      ),
    },

    {
      id: 3,
      content: (
        <RegistStep4
          officeRejections={props.officeRejections}
          pledge={props.pledge}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          formValues={props.formValues}
          selectValues={props.selectValues}
          dates={props.dates}
          selectedCategories={props.selectedCategories}
          uploadedImagesSingle={props.uploadedImagesSingle}
          uploadedImagesMultiple={props.uploadedImagesMultiple}
          selectedStaffData={props.selectedStaffData}
          selectedEmployees={props.selectedEmployees}
          onRegist={props.onRegist}
          requestType={props.requestType}
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
          showConfirmModal={props.showConfirmModal}
          openConfirmModal={props.openConfirmModal}
        />
      ),
    },
    {
      id: 4,
      content: (
        <RegistStep5
          verifyCapatcha={props.verifyCapatcha}
          showConfirmModal={props.showConfirmModal}
          openConfirmModal={props.openConfirmModal}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
          formValues={props.formValues}
          handleUserInput={props.handleUserInput}
          capatchValues={props.capatchValues}
          captchaToken={props.captchaToken}
          setCaptchaToken={props.setCaptchaToken}
          // resetCapatcha={props.resetCapatcha}
          // onRecapchaChange={props.onRecapchaChange}
          captchaRef={props.captchaRef}
          saveEditsToLocalStorage={props.saveEditsToLocalStorage}
          Step4FormRef={props.Step4FormRef}
          setCapatchValues={props.setCapatchValues}
          requestType={props.requestType}
          onRegist={props.onRegist}
        />
      ),
    },
  ];
  let stepsToMap =
    props.requestType === "create" ? props.steps : props.steps.slice(0, 4);
  let contentsToMap =
    props.requestType === "create" ? contents : contents.slice(0, 4);
  return (
    <>
      <div className="steps">
        <Container className="stepsContainer">
          <Media query="(max-width: 768px)">
            {(matches) =>
              matches ? (
                <Steps
                  current={props.currentStep}
                  className="ant-steps-vertical mt-4">
                  {stepsToMap.map((item) => (
                    <Step key={item.id} title={item.title} />
                  ))}
                </Steps>
              ) : (
                <Steps current={props.currentStep} className="m-auto">
                  {stepsToMap.map((item) => (
                    <Step
                      status={item.finish}
                      key={item.id}
                      title={
                        item.finish === "finish" ? (
                          <span
                            className="stespanTitleP"
                            onClick={() => props.gotoStepWithTitle(item.id)}>
                            {item.title}
                          </span>
                        ) : (
                          item.title
                        )
                      }
                    />
                  ))}
                </Steps>
              )
            }
          </Media>
          <img alt="logo" src={Logo} style={{ width: "80px" }} />
        </Container>
      </div>

      <div className="stepsScroll">
        <Container
          style={{
            paddingTop: "0",
            paddingBottom: "15px",
            borderRadius: "20px",
          }}>
          <div className="steps-content">
            {contentsToMap[props.currentStep]?.content}
          </div>
        </Container>
      </div>
    </>
  );
}
