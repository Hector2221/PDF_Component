import "./PDFControl.css";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";

export const PDFControl = () => {
  const navigate = useNavigate();

  const clickExit = () => {
    navigate("/");
  };

  const clickUpload = () => {
    console.log("clickUpload");
  };

  const clickViewPDF = () => {
    console.log("clickViewPDF");
  };

  const clickDeletePDF = () => {
    console.log("clickDeletePDF");
  };

  return (
    <>
      <div className="PDFControl">
        <div className="PDFControl__header">
          <div></div>
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input placeholder="Search" type="search" className="input" />
          </div>
          <div className="PDFControl__principalBTn">
            <button
              className="PDFControl__Upload PDFControl__Btn"
              onClick={clickUpload}
              title="Upload"
            >
              <FaCloudUploadAlt size={23} />
            </button>

            <button
              className="PDFControl__Exit PDFControl__Btn"
              onClick={clickExit}
              title="Exit"
            >
              <GiExitDoor size={23} />
            </button>
          </div>
        </div>

        <div className="PDFControl__card">
          <div className="PDFControl__card__title">
            <FaFilePdf size={20} color="#7b241c" />
            <p>Starling.pdf</p>
          </div>
          <div className="PDFControl__card__buttons">
            <FaRegEye
              size={20}
              color="#1f618d"
              className="PDFControl__Btn"
              onClick={clickViewPDF}
              title="View"
            />
            <LuDelete
              title="Delete"
              size={20}
              color="#c0392b"
              className="PDFControl__Btn"
              onClick={clickDeletePDF}
            />
          </div>
        </div>
      </div>
    </>
  );
};
