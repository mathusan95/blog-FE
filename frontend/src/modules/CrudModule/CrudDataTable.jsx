import React, { useEffect, useState } from "react";

import { Button, Menu, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectItemById } from "@/redux/crud/selectors";
import { useCrudContext } from "@/context/crud";
import uniqueId from "@/utils/uinqueId";
import DataTable from "@/components/DataTable";
import { useHistory } from "react-router-dom";
import CreateForm from "@/forms/createForm";

const rulesTags = [{
  label: "tagName",
  required: true
}]


function AddNewItem({ config }) {
  const dispatch = useDispatch();

  const { crudContextAction } = useCrudContext();
  const history = useHistory();
  const [isModalStatus, setModalStatus] = useState(false)
  const { ADD_NEW_ENTITY } = config;
  const [rulesData, setRules] = useState([]);
  const [formData, setFormData] = useState({});
  const [isStart, setStart] = useState(true);


  useEffect(() => {
    if (config.entity === "tags") {
      setFormData({ tagName: "" });
    }

  }, [])
  const handelClick = () => {
    setStart(true);
    if (config.entity === "posts") {
      history.push("/posts/create")
    } else {
      const rules = config?.entity === "tags" ? rulesTags : [];
      setModalStatus(true);
      setRules(rules);
      setFormData(config.entity === "tags" ? { tagName: "" } : {})
    }
  };

  const handleChangeForm = (e, label) => {
    if (config.entity === "tags") {
      setFormData({ tagName: e.target.value })
    }
  }
  const handleSubmit = () => {

    console.log("dlllffl")
    if (config.entity === "tags") {
      dispatch(crud.createTags("tags", formData))
    }
  }

  return (
    <>
      <Button onClick={handelClick} type="primary">
        {ADD_NEW_ENTITY}
      </Button>

      <Modal visible={isModalStatus} onOk={() => handleSubmit()} onCancel={() => setModalStatus(false)}>
        <div style={{ marginTop: "20px" }}>
          <CreateForm rules={rulesData} handleChangeForm={handleChangeForm} formData={formData} />
        </div>
      </Modal>
    </>
  );
}
function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox } = crudContextAction;
  const item = useSelector(selectItemById(row._id));
  const Show = () => {
    dispatch(crud.currentItem(item));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };
  function Edit() {
    dispatch(crud.currentAction("update", item));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }
  function Delete() {
    dispatch(crud.currentAction("delete", item));
    modal.open();
  }
  return (
    <Menu style={{ width: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EyeOutlined />} onClick={Show}>
        Show
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Edit}>
        Edit
      </Menu.Item>
      <Menu.Item
        key={`${uniqueId()}`}
        icon={<DeleteOutlined />}
        onClick={Delete}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
}

export default function CrudDataTable({ config }) {
  return (
    <DataTable
      config={config}
      DropDownRowMenu={DropDownRowMenu}
      AddNewItem={AddNewItem}
    />

  );
}
