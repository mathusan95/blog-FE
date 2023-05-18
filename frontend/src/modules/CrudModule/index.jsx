import React, { useLayoutEffect } from "react";
import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CreateForm from "@/components/CreateForm";
import UpdateForm from "@/components/UpdateForm";
import DeleteModal from "@/components/DeleteModal";
import ReadItem from "@/components/ReadItem";
import SearchItem from "@/components/SearchItem";

import { useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";

import { CrudLayout } from "@/layout";

import CrudDataTable from "./CrudDataTable";
import { useState } from "react";
import { useEffect } from "react";

function SidePanelTopContent({ config, formElements }) {
  return (
    <>
      <ReadItem config={config} />
      <UpdateForm config={config} formElements={formElements} />
    </>
  );
}

function FixHeaderPanel({ config, handleSearchName }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox } = crudContextAction;


  //  useEffect(()=>{
  // console.log(config,"cofigigiggigi>>>>")
  //  },[config])

  const addNewItem = () => {
    collapsedBox.close();
  };

  const handleSearch = (val) => {
    handleSearchName(val)
  }
  return (
    <div className="box">
      <Row gutter={12}>
        <Col className="gutter-row" span={21}>
          <h1 style={{ fontSize: 20, marginBottom: 20 }}>
            {config.panelTitle}
          </h1>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col className="gutter-row" span={21}>
          <SearchItem config={config} handleSearch={handleSearch} />
        </Col>
        <Col className="gutter-row" span={3}>
          <Button
            onClick={addNewItem}
            block={true}
            icon={<PlusOutlined />}
          ></Button>
        </Col>
      </Row>
    </div>
  );
}

export default function CrudModule({ config, createForm, updateForm }) {
  const dispatch = useDispatch();
  const [intialConfig, setconfigs] = useState(config);
  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  const handleSearch = (val) => {
    let configObj = intialConfig;
    configObj = { ...config, searchString: val }
    setconfigs(configObj)

  }

  return (
    <CrudLayout
      config={config}
      // fixHeaderPanel={<FixHeaderPanel config={config} handleSearchName={handleSearch} />}
      // sidePanelBottomContent={
      //   <CreateForm config={config} formElements={createForm} />
      // }
      // sidePanelTopContent={
      //   <SidePanelTopContent config={config} formElements={updateForm} />
      // }
    >
      <CrudDataTable config={intialConfig} />
      <DeleteModal config={config} />
    </CrudLayout>
  );
}
