import React, { useState } from "react";

const Step1 = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contactNo: "",
    selectedImages: [],
  });
  const [formState, setFormState] = useState("form1");
  const [errorState, setErrorState] = useState({});
  const [imageError, setImageError] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setErrorState({ ...errorState, [name]: "" });
    setInputData({ ...inputData, [name]: value });
  };
  const validFun = (key, value) => {
    switch (key) {
      case "firstName":
        if (!value) {
          return `Enter first name`;
        }
        break;
      case "lastName":
        if (!value) {
          return `Enter last name`;
        }
        break;

      case "email":
        if (!value) {
          return `Enter email address`;
        }
        const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        if (!regex.test(value)) {
          return `Invalid email format`;
        }
        break;

      case "dob":
        if (!value) {
          return `Select date of birth`;
        }
        function isValidFutureDate(value) {
          const inputDate = new Date(value);
          const currentDate = new Date();
          const futureDate = new Date(
            currentDate.getFullYear() + 18,
            currentDate.getMonth(),
            currentDate.getDate()
          );

          return inputDate >= futureDate;
        }
        if (!isValidFutureDate(value)) {
          return "Please enter a valid future date that is at least 18 years from now.";
        }
        break;

      case "contactNo":
        if (!value) {
          return `Enter contact number`;
        }
        break;

      default:
        return null;
    }
  };

  const fistFormSubmitHandler = () => {
    const errorObj = {};
    Object.keys(inputData).forEach((key) => {
      const err = validFun(key, inputData[key]);
      if (err) {
        errorObj[key] = err;
      }
    });
    if (Object.keys(errorObj).length) {
      setErrorState(errorObj);
    } else {
      setFormState("form2");
    }
  };
  const secondFormSubmitHandler = () => {
    if (!inputData?.selectedImages.length) {
      setImageError("please select images");
    } else {
      console.log(inputData);
      window.alert("user created");
    }
  };

  const handleFileChange = (event) => {
    const files = event?.target?.files;
    if (!files.length) {
      return setImageError("Please select images.");
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];

    const selectedImagesArray = Array.from(files).filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });

    if (selectedImagesArray.length !== files.length) {
      setImageError("Please select only PNG or JPG images.");
    } else {
      setInputData({ ...inputData, selectedImages: selectedImagesArray });
      setImageError("");
    }
  };

  const imageHandler = (id) =>
    setInputData({
      ...inputData,
      selectedImages: inputData?.selectedImages?.filter((_, ind) => id !== ind),
    });

  return (
    <div className="bg-slate-50 h-screen">
      {/* FORM - 1 */}
      {formState === "form1" && (
        <>
          <div className="pt-5">
            <div className="text-3xl font-bold">Step - 1</div>
            <div className="m-4 container">
              {/* FIRST NAME INPUTFIELD */}
              <div>
                <label htmlFor="first_name">First Name: </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="enter first name"
                  value={inputData?.firstName}
                  onChange={changeHandler}
                  name="firstName"
                  className="border rounded-md p-2 m-2"
                />
                <span>
                  {" "}
                  {errorState.firstName && (
                    <span>
                      <p className="text-red-400">{errorState.firstName}</p>
                    </span>
                  )}
                </span>
              </div>

              {/* LAST NAME INPUTFIELD */}
              <div>
                <label htmlFor="last_name">Last Name: </label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="enter last name"
                  value={inputData?.lastName}
                  name="lastName"
                  onChange={changeHandler}
                  className="border rounded-md p-2 m-2"
                />
                <span>
                  {" "}
                  {errorState.lastName && (
                    <span>
                      <p className="text-red-400">{errorState.lastName}</p>
                    </span>
                  )}
                </span>
              </div>

              {/* EMAIL INPUT FIELD */}
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  id="email"
                  placeholder="enter email"
                  value={inputData?.email}
                  name="email"
                  onChange={changeHandler}
                  className="border rounded-md p-2 m-2"
                />
                <span>
                  {" "}
                  {errorState.email && (
                    <span>
                      <p className="text-red-400">{errorState.email}</p>
                    </span>
                  )}
                </span>
              </div>

              {/* DOB INPUT FIELD */}
              <div>
                <label htmlFor="dob">Date of birth: </label>
                <input
                  type="date"
                  id="dob"
                  placeholder="DD/MM/YYYY"
                  value={inputData?.dob}
                  name="dob"
                  onChange={changeHandler}
                  className="border rounded-md p-2 m-2"
                />
                <span>
                  {" "}
                  {errorState.dob && (
                    <span>
                      <p className="text-red-400">{errorState.dob}</p>
                    </span>
                  )}
                </span>
              </div>

              {/* CONTACT INPUT FIELD */}
              <div>
                <label htmlFor="contact_number">Contact No: </label>
                <input
                  type="text"
                  maxlength="10" // it will take 10 digit
                  id="contact_number"
                  placeholder="enter contact number"
                  value={inputData?.contactNo}
                  name="contactNo"
                  onKeyDown={(e) => {
                    var code = e.keyCode;
                    if (code > 31 && (code < 48 || code > 57)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={changeHandler}
                  className="border rounded-md p-2 m-2"
                />
                <span>
                  {errorState.contactNo && (
                    <span>
                      <p className="text-red-400">{errorState.contactNo}</p>
                    </span>
                  )}
                </span>
              </div>
              <div>
                <button
                  className="m-5 p-2 border rounded-md bg-slate-200"
                  onClick={fistFormSubmitHandler}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* FORM - 2 */}
      {formState === "form2" && (
        <>
          <div className="text-3xl font-bold">Step - 2</div>
          <div className="m-4">
            <div className="container">
              <label htmlFor="images">Upload Images: </label>
              <input
                type="file"
                // accept=".jpg, .jpeg, .png"  // this will show only files which have these extensions 
                multiple
                onChange={handleFileChange}
                id="images"
                placeholder="select images"
                name="firstName"
                className="border rounded-md p-2 m-2"
              />
              <span>
                {!inputData.selectedImages?.length && (
                  <span>
                    <p className="text-red-400">{imageError}</p>
                  </span>
                )}
              </span>
              <div className="row">
                {inputData?.selectedImages.map((image, index) => {
                  return (
                    <div className="w-4/12 m-2 p-2 border-r-4" key={index}>
                      
                      <div>
                      <svg
                        onClick={() => imageHandler(index)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                        <img
                          className="w-24 h-24 m-3 border rounded-lg"
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <button
                className="m-5 p-2 border rounded-md bg-slate-200"
                onClick={secondFormSubmitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Step1;
