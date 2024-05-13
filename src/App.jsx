import { useEffect, useState } from "react";

import { ReactFormBuilder, ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { Modal, Button, ButtonToolbar, Placeholder, Loader } from "rsuite";
function App() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allow, setAllow] = useState(false);

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
    setData(data);
  };
  const closeModal = () => {
    setIsOpen(false);
    setAllow(true);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("1 second has passed!");
      setAllow(false);
    }, 1000); // Delay of 1 second

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [allow]);
  const handlePost = async () => {
    console.log("clicked");

    try {
      // const storedData = await _onLoad(); // Wait for data from _onLoad
      // const storedData = [
      //   {
      //     id: "5B72253A-4FFA-42B9-AD17-C21B41631FDC",
      //     element: "Header",
      //     text: "Header Text",
      //     static: true,
      //     required: false,
      //     bold: false,
      //     italic: false,
      //     content: "Placeholder Text...",
      //     canHavePageBreakBefore: true,
      //     canHaveAlternateForm: true,
      //     canHaveDisplayHorizontal: true,
      //     canHaveOptionCorrect: true,
      //     canHaveOptionValue: true,
      //     canPopulateFromApi: true,
      //   },
      //   {
      //     id: "0B59A0B2-1140-4F4C-A5E5-22DA9CA5CF62",
      //     element: "Paragraph",
      //     text: "Paragraph",
      //     static: true,
      //     required: false,
      //     bold: false,
      //     italic: false,
      //     content: "Placeholder Text...",
      //     canHavePageBreakBefore: true,
      //     canHaveAlternateForm: true,
      //     canHaveDisplayHorizontal: true,
      //     canHaveOptionCorrect: true,
      //     canHaveOptionValue: true,
      //     canPopulateFromApi: true,
      //   },
      //   {
      //     id: "5B72253A-4FFA-42B9-AD17-C21B41631FDC",
      //     element: "Header",
      //     text: "Header Text",
      //     static: true,
      //     required: false,
      //     bold: false,
      //     italic: false,
      //     content: "Placeholder Text...",
      //     canHavePageBreakBefore: true,
      //     canHaveAlternateForm: true,
      //     canHaveDisplayHorizontal: true,
      //     canHaveOptionCorrect: true,
      //     canHaveOptionValue: true,
      //     canPopulateFromApi: true,
      //   },
      //   null,
      //   {
      //     id: "0B59A0B2-1140-4F4C-A5E5-22DA9CA5CF62",
      //     element: "Paragraph",
      //     text: "Paragraph",
      //     static: true,
      //     required: false,
      //     bold: false,
      //     italic: false,
      //     content: "Placeholder Text...",
      //     canHavePageBreakBefore: true,
      //     canHaveAlternateForm: true,
      //     canHaveDisplayHorizontal: true,
      //     canHaveOptionCorrect: true,
      //     canHaveOptionValue: true,
      //     canPopulateFromApi: true,
      //   },
      // ];
      const storedData = await JSON.parse(localStorage.getItem("formData"));
      if (storedData) {
        return storedData;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately
    }
    return [];
  };

  return (
    <>
      <h1 className="text-xl font-bold underline">Hello worlddd!</h1>
      <button className="btn" onClick={openModal}>
        Preview
      </button>

      {allow ? (
        <div role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <ReactFormBuilder
          toolbarItems={items}
          locale="en"
          saveAlways={false}
          editMode={false}
          onPost={onPost}
          onLoad={handlePost}
        />
      )}
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
              data={data}
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
