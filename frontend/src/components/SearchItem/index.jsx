import React, { useEffect, useState, useRef } from "react";

import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { request } from "@/request";
import { useCrudContext } from "@/context/crud";
import { selectSearchedItems } from "@/redux/crud/selectors";
import useDebounce from "@/hooks/useDebounce.js"

import { Empty } from "antd";

export default function SearchItem({ config, handleSearch }) {
  let { searchConfig } = config;

  const dispatch = useDispatch();

  const { displayLabels, outputValue = "_id" } = searchConfig;


  const [searchTerm, setSearchTerm] = useState("");

  const { result, isLoading, isSuccess } = useSelector(selectSearchedItems);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  console.log(debouncedSearchTerm, "debouncedSearchTerm>>>>")

  // const isTyping = useRef(false);

  // useEffect(() => {
  //   isLoading && setOptions([{ label: "... Searching" }]);
  // }, [isLoading]);


  useEffect(

    () => {

      dispatch(crud.setSearch(debouncedSearchTerm))

    },
    [debouncedSearchTerm]
  );

  const onChange = (data) => {
    setSearchTerm(data);
  };


  return (
    <AutoComplete
      // value={value}
      // options={options}
      style={{
        width: "100%",
      }}
      // onSelect={onSelect}
      // onSearch={onSearch}
      onChange={onChange}
      // notFoundContent={!isSuccess ? <Empty /> : ""}
      allowClear={true}
      placeholder="Your Search here"
    >
      <Input suffix={<SearchOutlined />} />
    </AutoComplete>
  );
}
