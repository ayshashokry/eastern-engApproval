import { notification } from "antd";
import StaffData from "../../../data/EmployeesData.json";

export const AddStaffToTable = ({
  selectValues,
  selectedStaffData,
  setStaffData,
  selectedCategories,
  setselectedOCategories,
}) => {
  let filtiredStaff = StaffData.filter(
    (job) =>
      job?.class.id === selectValues?.category.id &&
      (job?.category.id === selectValues?.specialty.id ||
        job?.category.id === null) &&
      job?.approve.id === selectValues.department.id
  );

  let selectedStaffSwap = [];
  const args = {
    duration: 7,
    placement: "bottomLeft",
    bottom: 5,
    className: "selectSureNotification",
  };
  if (filtiredStaff.length === 0) {
    args.description = "من فضلك تأكد من المدخلات";
    notification.open(args);
  }

  if (
    selectedStaffData.find(function (val) {
      return (
        val.approve !== undefined &&
        val.approve.id === selectValues.department.id &&
        val.class.id === selectValues.category.id
      );
    }) !== undefined
  ) {
    args.description = "من فضلك تأكد من عدم تكرار المدخلات";
    notification.open(args);
  }

  if (
    selectedStaffData.find(function (val) {
      return (
        val.approve !== undefined &&
        val.approve.id === selectValues.department.id
      );
    }) !== undefined
  ) {
    args.description = "من فضلك تأكد من عدم تكرار الادارة";
    notification.open(args);
  }
  //if selected Staff has data
  if (
    selectedStaffData.find(function (val) {
      return (
        (val.approve !== undefined &&
          val.approve.id === selectValues.department.id &&
          (val.category.id === selectValues.specialty.id ||
            val.category.id === null) &&
          val.class.id === selectValues.category.id) ||
        (val.approve !== undefined &&
          val.approve.id === selectValues.department.id)
      );
    }) === undefined
  ) {
    selectedStaffSwap.push(...selectedStaffData, ...filtiredStaff);
    setStaffData(selectedStaffSwap);

    let selectedCategorySwap = {};

    selectedCategorySwap["department_id"] = Object.assign(
      {},
      selectValues.department
    ).id;
    selectedCategorySwap["eng_comp_class_id"] = Object.assign(
      {},
      selectValues.category
    ).id;
    selectedCategorySwap["eng_comp_category_id"] =
      Object.assign({}, selectValues.category).engineering_categories.length > 1
        ? null
        : Object.assign({}, selectValues.category).engineering_categories[0].id;

    let selectedCategoriesSwap = selectedCategories;
    selectedCategoriesSwap.push(selectedCategorySwap);

    selectedCategorySwap = Object.values(selectedCategorySwap).filter(
      (c, index) =>
        index ===
        Object.values(selectedCategorySwap).findIndex(
          (other) =>
            c !== null &&
            other !== null &&
            c.id === other.id &&
            c.approve === other.approve
        )
    );
    setselectedOCategories(selectedCategoriesSwap);
  }
};
