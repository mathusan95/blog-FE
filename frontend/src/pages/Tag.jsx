import React from "react";

import CrudModule from "@/modules/CrudModule";
import CreateForm from "@/forms/createForm";
import moment from "moment";
import { useState } from "react";
import { crud } from "@/redux/crud/actions";
import { useDispatch } from "react-redux";

const rules=[{
  label:"Tagname",
  required:true
}]

function Product() {
  const entity = "tags";
  const searchConfig = {
    displayLabels: ["productName"],
    searchFields: "productName",
    outputValue: "_id",
  };
  const panelTitle = "Tags Panel";
  const dataTableTitle = "Tags List";
  const entityDisplayLabels = ["tagName"];

  const readColumns = [
    {
      title: "Tags",
      dataIndex: "name",
    }
  ];
  const dataTableColumns = [
    {
      title: "Tags",
      dataIndex: "name",
      sorter:true,
    }, {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data) => {
        return (
          <>{data ? moment(data).format("YYYY-MM-DD") : "N/A"}</>
        )
      }
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      render: (data) => {
        return (
          <>{data ? moment(data).format("YYYY-MM-DD") : "N/A"}</>
        )
      }
    },
  ];

  const ADD_NEW_ENTITY = "Add new Tag";
  const DATATABLE_TITLE = "Tags List";
  const ENTITY_NAME = "Tags";
  const CREATE_ENTITY = "Create Tag";
  const UPDATE_ENTITY = "Update Tag";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,  };
  return (
    <CrudModule
     
      config={config}
    />
  );
}

export default Product;
