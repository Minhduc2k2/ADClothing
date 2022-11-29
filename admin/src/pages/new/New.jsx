import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// Register the plugin
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Col, Form, Row } from "react-bootstrap";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageResize
);

const New = ({ title }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    function checkBoxLimit() {
      var checkBoxGroup = document.forms["form_name"]["color"];
      var limit = 3;
      for (var i = 0; i < checkBoxGroup.length; i++) {
        checkBoxGroup[i].onclick = function () {
          var checkedcount = 0;
          for (var i = 0; i < checkBoxGroup.length; i++) {
            checkedcount += checkBoxGroup[i].checked ? 1 : 0;
          }
          if (checkedcount > limit) {
            console.log("You can select maximum of " + limit + " color.");
            alert("You can select maximum of " + limit + " color.");
            this.checked = false;
          }
        };
      }
    }
    checkBoxLimit();
  });
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          <Form
            action="http://localhost:8800/backend/products"
            method="post"
            name="form_name"
            id="form_name"
            style={{ width: "100%" }}
          >
            <Row>
              <Col md={6}>
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  style={{ minWidth: "500px" }}
                />
                <br />
                <label htmlFor="price" id="price">
                  Price
                </label>
                <br />
                <input type="text" name="price" style={{ minWidth: "500px" }} />
                <br />
                <label>Color (Choose base on order of img) </label>
                <br />
                <input type="checkbox" id="red" name="color" value="red" />
                <label htmlFor="red" style={{ color: "red" }}>
                  Red
                </label>
                <br />
                <input type="checkbox" id="blue" name="color" value="blue" />
                <label htmlFor="blue" style={{ color: "blue" }}>
                  Blue
                </label>
                <br />
                <input type="checkbox" id="black" name="color" value="black" />
                <label htmlFor="black" style={{ color: "black" }}>
                  Black
                </label>
                <br />
                <input type="checkbox" id="white" name="color" value="white" />
                <label
                  htmlFor="white"
                  style={{ color: "white", textShadow: "1px 1px #000" }}
                >
                  White
                </label>
                <br />
                <input
                  type="checkbox"
                  id="yellow"
                  name="color"
                  value="yellow"
                />
                <label
                  htmlFor="yellow"
                  style={{ color: "yellow", textShadow: "1px 1px #000" }}
                >
                  Yellow
                </label>
                <br />
                <label>Size</label>
                <br />
                <input type="checkbox" id="S" name="size" value="S" />
                <label htmlFor="S">S</label>
                <br />
                <input type="checkbox" id="M" name="size" value="M" />
                <label htmlFor="M">M</label>
                <br />
                <input type="checkbox" id="L" name="size" value="L" />
                <label htmlFor="L">L</label>
                <br />
                <input type="checkbox" id="XL" name="size" value="XL" />
                <label htmlFor="XL">XL</label>
                <br />
                <input type="checkbox" id="XXL" name="size" value="XXL" />
                <label htmlFor="XXL">XXL</label>
                <br />
                <label htmlFor="description" id="description">
                  Description
                </label>
                <br />
                <textarea
                  type="text"
                  name="description"
                  style={{ height: "100px", minWidth: "500px" }}
                />
              </Col>
              <Col md={6}>
                <FilePond
                  className="NGUYENVANAN"
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  maxFileSize="3MB"
                  //server="/api"
                  name="img"
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <input type="submit" value="Add Product" />
              </Col>
            </Row>
          </Form>
          {/* 
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form> */}
        </div>
      </div>
    </div>
  );
};

export default New;
