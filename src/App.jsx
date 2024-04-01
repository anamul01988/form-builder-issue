import { useState } from "react";

import { ReactFormBuilder, ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
function App() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  var items = [
    {
      key: "Header",
      name: "Header Text",
      icon: "fa fa-header",
      static: true,
      content: "Placeholder Text...",
    },
    {
      key: "Paragraph",
      name: "Paragraph",
      static: true,
      icon: "fa fa-paragraph",
      content: "Placeholder Text...",
    },
  ];

  const handleLoad = () => {
    console.log("Form builder loaded.");
    // Perform any actions needed upon loading the form builder
  };

  const onPost = (d) => {
    console.log("Form data posted:", d, d.task_data, typeof d.task_data);
    // setData(d.task_data);
    let storedData = JSON.parse(localStorage.getItem("formData"));
    // let storedData = [];
    if (storedData) {
      const data = JSON.parse(localStorage.getItem("formData")) || []; // Parse existing data or initialize as empty array if null
      const newData = d.task_data.filter((item) => item !== null); // Filter out null values from d.task_data
      const updatedData = [...data, ...newData]; // Concatenate existing data with newData
      localStorage.setItem("formData", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("formData", JSON.stringify(d.task_data));
    }
  };

  const openModal = () => {
    document.getElementById("my_modal_1");
    setIsOpen(true);
    const data = JSON.parse(localStorage.getItem("formData"));
    console.log("data final result", data);
    setData(data);
  };
  const closeModal = () => setIsOpen(false);

  console.log("data 123", data, isOpen);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello worlddd!</h1>
      <button className="btn" onClick={openModal}>
        Preview
      </button>

      {/* {!isOpen && (
        <ReactFormBuilder
          toolbarItems={items}
          locale="en"
          saveAlways={false}
          editMode={false}
          onPost={onPost}
          // onLoad={data?.length > 0 ? data : []}
        />
      )} */}
      {/* {!isOpen && ( */}
      <ReactFormBuilder
        toolbarItems={items}
        locale="en"
        saveAlways={false}
        editMode={false}
        onPost={onPost}
        // onLoad={data?.length > 0 ? data : []}
      />
      {/* )} */}

      {isOpen && (
        <Modal open={isOpen} onClose={closeModal}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactFormGenerator
              download_path=""
              back_action="/"
              back_name="Back"
              answer_data={{}}
              action_name="Save"
              form_action="/"
              form_method="POST"
              read_only={true}
              variables={[]}
              hide_actions={true}
              data={JSON.parse(localStorage.getItem("formData"))}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal} appearance="primary">
              Ok
            </Button>
            <Button onClick={closeModal} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default App;
