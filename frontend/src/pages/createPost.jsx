import React, { useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import constants from "@/utils/constants";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "react-simple-code-editor";
import { useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useDispatch } from "react-redux";
import "../SCSS-Styles/style.css";

export default function LeadForm({ isUpdateForm = false }) {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const createModalStatus = useSelector(
    (state) => state.crud.createModalStatus
  );
  const tagsOptionsStatus = useSelector(
    (state) => state?.crud?.tagsDataStatus || false
  );
  const tagsOptions = useSelector((state) => state?.crud?.tagsData || []);

  const [components, setComponents] = useState([
    {
      selectedValue: "",
      headingComponent: {
        status: false,
        value: {
          ta: null,
          en: null,
        },
      },
      codeSnippetComponent: {
        status: false,
        value: null,
      },
      imageComponent: {
        status: false,
        value: null,
        preview: null,
      },
      contentComponent: {
        status: false,
        value: {
          ta: null,
          en: null,
        },
      },
    },
  ]);

  const handleCancel = () => {
    dispatch(crud.toggleCreateModal(false));
  };

  useEffect(() => {
    const tagsValueoptions = tagsOptions.map((data) => {
      return {
        label: data?.name,
        value: data?._id,
      };
    });
    console.log(tagsOptions, "tagsValueoptions");
    setTags(tagsValueoptions);
  }, [tagsOptionsStatus]);

  useEffect(() => {
    if (createModalStatus) {
      setComponents([
        {
          selectedValue: "",
          headingComponent: {
            status: false,
            value: {
              en: null,
              ta: null,
            },
          },
          codeSnippetComponent: {
            status: false,
            value: null,
          },
          imageComponent: {
            status: false,
            value: null,
            preview: null,
          },
          contentComponent: {
            status: false,
            value: {
              en: null,
              ta: null,
            },
          },
        },
      ]);
      setSelectedTags([]);
    }
  }, [createModalStatus]);

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 800,
    height: 300,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const handleSubmit = () => {
    let payload = {
      tags: selectedTags,
      payload: components,
    };

    dispatch(crud.createPost(payload));
  };

  const handleInput = (e, index) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      let componentsArray = [...components];
      componentsArray[index].imageComponent.value = reader.result;
      componentsArray[index].imageComponent.preview = e.target.files[0];
      setComponents(componentsArray);
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  const thumpImg = (file) => {
    let binaryData = [];
    binaryData.push(file);
    if (file) {
      binaryData.push(file);
      return (
        <div style={thumb}>
          <div style={thumbInner}>
            <img
              src={window.URL.createObjectURL(
                new Blob(binaryData, { type: "image/png" })
              )}
              style={img}
              // Revoke data uri after image is loaded
              // onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
          </div>
        </div>
      );
    }
  };

  const handleChange = (value, index) => {
    if (value === "HEADING") {
      let arrayValues = [...components];
      arrayValues[index].selectedValue = "HEADING";
      arrayValues[index].headingComponent.status = true;
      arrayValues[index].contentComponent.status = false;
      arrayValues[index].imageComponent.status = false;
      arrayValues[index].codeSnippetComponent.status = false;
      setComponents(arrayValues);
    }
    if (value === "CONTENT") {
      let arrayValues = [...components];
      arrayValues[index].selectedValue = "CONTENT";
      arrayValues[index].headingComponent.status = false;
      arrayValues[index].contentComponent.status = true;
      arrayValues[index].imageComponent.status = false;
      arrayValues[index].codeSnippetComponent.status = false;
      setComponents(arrayValues);
    }
    if (value === "IMAGE") {
      let arrayValues = [...components];
      arrayValues[index].selectedValue = "IMAGE";
      arrayValues[index].headingComponent.status = false;
      arrayValues[index].contentComponent.status = false;
      arrayValues[index].imageComponent.status = true;
      arrayValues[index].codeSnippetComponent.status = false;
      setComponents(arrayValues);
    }
    if (value === "CODE") {
      let arrayValues = [...components];
      arrayValues[index].selectedValue = "CODE";
      arrayValues[index].headingComponent.status = false;
      arrayValues[index].contentComponent.status = false;
      arrayValues[index].imageComponent.status = false;
      arrayValues[index].codeSnippetComponent.status = true;
      setComponents(arrayValues);
    }
  };

  const handleChangeTags = (data, selecedObj) => {
    setSelectedTags(selecedObj);
  };

  const addMoreComponent = () => {
    let arrayValues = [...components];
    arrayValues.push({
      selectedValue: "",
      headingComponent: {
        status: false,
        value: {
          en: null,
          tam: null,
        },
      },
      codeSnippetComponent: {
        status: false,
        value: null,
      },
      imageComponent: {
        status: false,
        value: null,
      },
      contentComponent: {
        status: false,
        value: {
          en: null,
          tam: null,
        },
      },
    });
    setComponents(arrayValues);
  };

  const handleChangeCode = (value, index) => {
    let arryValues = [...components];
    arryValues[index].codeSnippetComponent.value = value;
    setComponents(arryValues);
  };

  const handleChangeEditor = (value, language, index) => {
    let arryValues = [...components];
    arryValues[index].contentComponent.value[`${language}`] = value;
    setComponents(arryValues);
  };

  const handleChangeHeading = (e, language, index) => {
    let arryValues = [...components];
    arryValues[index].headingComponent.value[`${language}`] = e.target.value;
    console.log(arryValues, "tetetetettetet");

    setComponents(arryValues);
    // console.log(arryValues, "tetetetettetet22")
    // reference.get
  };

  return (
    <>
      {/* <div id="createPostContainer"> */}

      <Select
        mode="multiple"
        allowClear
        style={{ width: "70%" }}
        placeholder="Please select language tags"
        // defaultValue={['a10', 'c12']}
        value={selectedTags}
        onChange={handleChangeTags}
        options={tags}
      />

      {components.map((Data, index) => {
        return (
          <>
            <br></br>
            <br></br>
            {/* {checkValidation()} */}
            <Select
              value={Data.selectedValue}
              style={{ width: "70%" }}
              // defaultValue={Data.selectedValue}
              options={[
                {
                  value: "HEADING",
                  label: "heading",
                },
                {
                  value: "IMAGE",
                  label: "image",
                },
                {
                  value: "CODE",
                  label: "code",
                },
                {
                  value: "CONTENT",
                  label: "content",
                },
              ]}
              onChange={(value) => handleChange(value, index)}
            />
            <br></br>
            <br></br>
            {Data.imageComponent.status && (
              <>
                {/* <ImageComponent handleChange={(value, lang) => handleChangeImage(value, lang, index)} value={components[index].imageComponent} /> */}
                <div>
                  <input
                    type="file"
                    onChange={(file) => handleInput(file, index)}
                  />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                  {thumpImg(components[index].imageComponent.preview)}

                  {/* {thumbs} */}
                </aside>
              </>
            )}
            {Data.codeSnippetComponent.status && (
              <>
                {/* <CodeBlockComponent handleChange={(value) => handleChangeCode(value, index)} code={components[index].codeSnippetComponent.value} /> */}
                <label style={{ color: "#e803fc", fontSize: "15px" }}>
                  <b>Enter code </b>{" "}
                </label>
                :
                <Editor
                  onValueChange={(value) => handleChangeCode(value, index)}
                  value={components[index].codeSnippetComponent.value || ""}
                  highlight={(codess) =>
                    highlight(
                      components[index].codeSnippetComponent.value || "",
                      languages.js
                    )
                  }
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </>
            )}
            {Data.contentComponent.status && (
              <>
                {/* <EditorComponent handleChange={handleChangeEditor} value={components[index].contentComponent} /> */}
                {constants.language.map((data) => (
                  <>
                    <label style={{ color: "#e803fc", fontSize: "15px" }}>
                      <b>{`Content in ${data.label}`}</b>{" "}
                    </label>
                    :
                    <ReactQuill
                      theme="snow"
                      value={
                        components[index].contentComponent.value[
                          `${data.value}`
                        ]
                      }
                      onChange={(val) =>
                        handleChangeEditor(val, data.value, index)
                      }
                    />
                    <br />
                  </>
                ))}
              </>
            )}
            {Data.headingComponent.status && (
              <>
                {/* <HeadingComponent handleChange={(value, language) => handleChangeHeading(value, language, index)} valueObj={components[index].headingComponent} /> */}
                {constants.language.map((data) => (
                  <>
                    <label style={{ color: "#e803fc", fontSize: "15px" }}>
                      <b>{`Heading in ${data.label}`}</b>{" "}
                    </label>
                    :
                    <Input
                      value={
                        components[index].headingComponent.value[
                          `${data.value}`
                        ]
                      }
                      onChange={(val) =>
                        handleChangeHeading(val, data.value, index)
                      }
                    />
                    <br />
                  </>
                ))}
              </>
            )}
            <br />

            {(components[index].headingComponent.status ||
              components[index].contentComponent.status ||
              components[index].codeSnippetComponent.status ||
              components[index].imageComponent.status) && (
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  float: "left",
                }}
                onClick={(e) => addMoreComponent(e, index)}
              >
                Remove
              </Button>
            )}
            {(components[index].headingComponent.status ||
              components[index].contentComponent.status ||
              components[index].codeSnippetComponent.status ||
              components[index].imageComponent.status) &&
              components.length - 1 == index && (
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    float: "left",
                  }}
                  onClick={(e) => addMoreComponent(e, index)}
                >
                  Add More
                </Button>
              )}
          </>
        );
      })}
      <button onClick={handleSubmit}>Save</button>

      {/* </div> */}
    </>
  );
}
