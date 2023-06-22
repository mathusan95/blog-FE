import React, { useCallback, useState } from "react";
import { Form, Input } from "antd";
import { useEffect } from "react";



export default function CreateForm({ isUpdateForm = false, rules, handleChangeForm, formData, isStart }) {

  return (
    <>

      <table>
        <tbody>


          {rules.map(({ label, required }, dataIndex) => {
            return (
              <tr key={dataIndex}>
                <td>{label}</td>
                <td><Input key={dataIndex} onChange={(e) => handleChangeForm(e, label)} value={formData[label]} /></td>
              </tr>
            )

          })}
        </tbody>
      </table>
    </>
  )

}








