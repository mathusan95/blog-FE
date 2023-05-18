import React from "react";

import CrudModule from "@/modules/CrudModule";
import PostForm from "@/forms/PostForm";
import { useEffect } from "react";
import { crud } from "@/redux/crud/actions";
import { useDispatch } from "react-redux";

function Lead() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(crud.getTags("tags"))
  },[])
  const entity = "posts";
  const searchConfig = {
    displayLabels: ["client"],
    searchFields: "client,email,phone",
    outputValue: "_id",
  };

  const panelTitle = "Post Panel";
  const dataTableTitle = "Posts List";
  const entityDisplayLabels = ["Post"];

  const readColumns = [
    {
      title: "MainHeading",
      dataIndex: "date",
    },
    {
      title: "Tags",
      dataIndex: "client",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },

    {
      title: "Budget",
      dataIndex: "budget",
    },
  ];
  const dataTableColumns = [
    {
      title: "MainHeading",
      dataIndex: "date",
    },
    {
      title: "Tags",
      dataIndex: "client",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
  ];

  const ADD_NEW_ENTITY = "Add new Post";
  const DATATABLE_TITLE = "Posts List";
  const ENTITY_NAME = "lead";
  const CREATE_ENTITY = "Create Post";
  const UPDATE_ENTITY = "Update Post";
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
  };
  return (
    <CrudModule
      createForm={<PostForm />}
      updateForm={<PostForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Lead;
