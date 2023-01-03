import React from 'react'
import { Form,Input } from 'antd'
export default function FormValueInput(props) {
  return (
    <Form.Item
    name={props.name}
    label={props.label}
    hasFeedback={props.hasFeedback}
    initialValue={props.formValues.officeName}
    rules={[
      {
        message:  `من فضلك ادخل ${props.label}`,
        required: true,
      },
      // {
      //   validator: (_, value) =>
      //     uniqueValues.officeNameUnique
      //       ? Promise.resolve()
      //       : Promise.reject(new Error("عذرا، اسم المكتب مستخدم من قبل")),
      // },
    ]}>
    <Input
      name={props.name}
      onChange={props.handleUserInput}
      value={props.formValues.officeName}
      placeholder={`من فضلك ادخل ${props.label}`}
    />
  </Form.Item>  )
}
