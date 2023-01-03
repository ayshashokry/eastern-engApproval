import React from "react";
import { Upload, Form, Button } from "antd";
import { CloudUploadOutlined } from "@material-ui/icons";

export default function UploadFile(props) {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Form.Item
      className={
        props.uploadedImagesSingle[props.titleValue] !== undefined &&
        props.uploadedImagesSingle[props.titleValue].length >= 1 &&
        ( ["PDF", "pdf"].includes(props.uploadedImagesSingle[props.titleValue][0].data
          ?.split(".")
          .pop()) 
          ? "pdfFileee"
          : ["DOCX", "docx","DOC", "doc"].includes( props.uploadedImagesSingle[props.titleValue][0].data
              ?.split(".")
              .pop())
          ? "wordFileee"
          : "")
      }
      name={props.titleValue}
      valuePropName="list"
      getValueFromEvent={normFile}
      rules={[
        {
          message: `من فضلك قم بإرفاق ${
            props.label1 ? props.label1 : props.label
          }`,
          required:
            props.uploadedImagesSingle[props.titleValue] !== undefined &&
            props.uploadedImagesSingle[props.titleValue].length >= 1
              ? false
              : true,
        },
      ]}
      label={props.label}>
      <Upload
        accept=".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG,.docx,.DOCX,DOC,doc"
        fileList={props.uploadedImagesSingle[props.titleValue]}
        onRemove={props.DeleteSingleImage(props.titleValue)}
        beforeUpload={() => false}
        multiple={false}
        listType="picture-card"
        //  onPreview={()=>window.open(`${window.filesURL + "/" + props.RegistRequestImg[0].data}`)}

        onChange={props.SetSingleFileUpload(props.titleValue)}>
        <Button block className="ant-uploaded">
          تحميل <CloudUploadOutlined />
        </Button>
      </Upload>
    </Form.Item>
  );
}
