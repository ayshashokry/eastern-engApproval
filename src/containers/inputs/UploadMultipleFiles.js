import React from "react";
import { Button, Form, Upload, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CloudUploadOutlined } from "@material-ui/icons";
import pdfImage from "../../assets/images/pdfImage.png";
export default function UploadMultipleFiles(props) {
  return (
    <div key={props.id}>
      <div className="multipleThumParent">
        {props.uploadedImagesMultiple[props.titleValue].map((f, index) => (
          <div className="multipleThumDiv" key={index}>
            <img
              alt="img"
              src={
                f.thumbUrl !== undefined &&
                (["PDF", "pdf"].includes(f.thumbUrl.split(".").pop())
                  ? pdfImage
                  : f.thumbUrl)
              }
            />

            <div className="multipleThumbIcons">
              <Tooltip placement="topLeft" title="مشاهدة المرفق">
                <a
                  rel="noreferrer"
                  target="_blank"
                  download={false}
                  href={f.thumbUrl}>
                  <FontAwesomeIcon icon={faEye} className=" mx-1" />
                </a>
              </Tooltip>
              <Tooltip placement="topRight" title="مسح المرفق">
                <FontAwesomeIcon
                  icon={faTrash}
                  className=" ml-2 "
                  style={{ cursor: "pointer" }}
                  onClick={props.DeleteMultipleImages(
                    props.titleValue,

                    f
                  )}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <Form.Item
        name={props.titleValue}
        label={props.label}
        rules={[
          {
            message: `من فضلك قم بإرفاق ${props.label}`,
            required:
              props.uploadedImagesMultiple[props.titleValue].length === 0 &&
              props.mandatory,
          },
        ]}>
        <Upload
          name={props.titleValue}
          accept=".pdf,.png,.jpeg,.jpg,.PDF,.PNG,.JPEG,.JPG"
          fileList={props.uploadedImagesMultiple[props.titleValue]}
          beforeUpload={() => false}
          multiple={true}
          onChange={props.SetMultipleFilesUpload(props.titleValue)}>
          <Button block className="ant-uploaded">
            تحميل <CloudUploadOutlined />
          </Button>
        </Upload>
      </Form.Item>
      {/* {props.mandatory==true&&props.uploadedImagesMultiple[props.titleValue].length === 0 ? (
        <p className="errMsg">من فضلك قم بإرفاق {props.label}</p>
      ) : null} */}
    </div>
  );
}
