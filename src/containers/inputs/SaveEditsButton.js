import React from "react";
import { Button } from "antd";

export default function SaveEditsButton(props) {
  return (
    <Button className="saveEditsBtn mx-2" style={{ float: "right" }} onClick={props.saveEditsToLocalStorage}>
      حفظ التعديلات
    </Button>
  );
}
