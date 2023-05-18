import React, { useCallback, useEffect, useRef } from "react";
import { Dropdown, Button, PageHeader, Table } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import constants from "@/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";

import uniqueId from "@/utils/uinqueId";
import { useState } from "react";
import SearchItem from "../SearchItem";

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {



  let { entity, dataTableColumns, dataTableTitle, searchString = "" } = config;
  let stringRef = useRef(true);
  const [page, setPage] = useState(1);
  const [sort, setSorting] = useState(null);
  const [filterString, setFilters] = useState(constants.filterConstants[`${entity}`])
  const dispatch = useDispatch();

  searchString = searchString || ""
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: "Actions",
      render: (row) => (
        <Dropdown overlay={DropDownRowMenu({ row })} trigger={["click"]}>
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(
    selectListItems
  );
  const searchstrings = useSelector(state => state.crud.searchString)
  const { pagination, items } = listResult;

  const handelDataTableLoad = useCallback((pagination, filterValue, sorter, searchString, column) => {
    setPage(pagination.current)
    let sortingOptions = {};
    let filterString = "";

    if (filterValue && filterValue[`${column}`]) {
      filterString = filterValue[`${column}`].toString();
    } else {
      filterString = "";
    }
    if (sorter && sorter.order === "ascend") {
      sortingOptions = { ...sorter, order: "asc" };
    } else if (sorter && sorter.order === "descend") {
      sortingOptions = { ...sorter, order: "desc" };
    }
    if (sortingOptions.order) {
      sortingOptions = { field: sortingOptions.field, order: sortingOptions.order };
    } else {
      sortingOptions = null
    }
    setSorting(sortingOptions)
    setFilters(filterString)
    dispatch(crud.list(entity, pagination.current, filterString, searchString, sortingOptions));
  }, []);

  useEffect(() => {
    if (!stringRef.current) {
      dispatch(crud.list(entity, page, filterString, searchstrings, sort));
    }
    return () => { stringRef.current = false; }
  }, [searchstrings])

  useEffect(() => {

    if (entity !== "posts") {
      dispatch(crud.list(entity, page, filterString, searchstrings, sort));

    }
  }, []);

  // const setCreateModalOpen = () => {

  // }



  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={dataTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`}>
            Refresh
          </Button>,
          <AddNewItem key={`${uniqueId()}`} config={config}  />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      ></PageHeader>
       <SearchItem config={config}  />
       <br/> <br/> <br/>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={(pagination, filterValue, sorter) => handelDataTableLoad(pagination, filterValue, sorter, searchstrings, "userStatus")}
      />
    </>
  );
}
