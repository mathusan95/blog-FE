import React from "react";

import CrudModule from "@/modules/CrudModule";
import ProductForm from "@/forms/createForm";
import moment from "moment";
import { useState } from "react";
import { crud } from "@/redux/crud/actions";
import { useDispatch } from "react-redux";

function Product() {
  const entity = "users";
  const searchConfig = {
    displayLabels: ["productName"],
    searchFields: "productName",
    outputValue: "_id",
  };

  const [filters,setFilters] = useState("ACTIVE,REGISTERED");
  const dispatch = useDispatch();

  const panelTitle = "User Panel";
  const dataTableTitle = "Users List";
  const entityDisplayLabels = ["productName"];

  const readColumns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    }, {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "UserStatus",
      dataIndex: "userStatus",
    }
  ];
  const dataTableColumns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    }, {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data) => {
        return (
          <>{data?moment(data).format("YYYY-MM-DD"):"N/A"}</>
        )
      }
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      sorter: true,
      render: (data) => {
        return (
          <>{data?moment(data).format("YYYY-MM-DD"):"N/A"}</>
        )
      }
    },
    {
      title: "UserStatus",
      dataIndex: "userStatus",
      defaultFilteredValue :['ACTIVE','REGISTERED'],
      filters: [
        {
          text: 'Active',
          value: 'ACTIVE',
        },
        {
          text: 'Registered',
          value: 'REGISTERED',
        },
    
      ],
      width: '40%',
    }
  ];

  const ADD_NEW_ENTITY = "Add new user";
  const DATATABLE_TITLE = "users List";
  const ENTITY_NAME = "users";
  const CREATE_ENTITY = "Create user";
  const UPDATE_ENTITY = "Update user";
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
    entityDisplayLabels,
    filters,
  };
  return (
    <CrudModule
      createForm={<ProductForm />}
      updateForm={<ProductForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Product;
