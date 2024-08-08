import { Formik } from "formik";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Employee } from "../../lib/utils";
import { ArrowLeft } from "lucide-react";
import DivInputForm from "../reusable/DivInputForm";

const AddEmployee = () => {
  const navigate = useNavigate();

  const location = useLocation();

  let employee: Employee[] = [];

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });

  const validations = Yup.object({
    name: Yup.string().required("Required"),
    avatar: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (location.state) {
      setInitialValues({
        name: location.state.employee.name,
        email: location.state.employee.emailId,
        avatar: location.state.employee.avatar,
        mobile: location.state.employee.mobile,
        country: location.state.employee.country,
        state: location.state.employee.state,
        district: location.state.employee.district,
      });
    }
  }, [location.state]);

  return (
    <div className="flex relative flex-col gap-5 items-center m-auto w-full shadow">
      <Button className="absolute top-2 left-2" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
      </Button>
      <h1 className="text-3xl font-bold">
        {location.state ? "Edit Employee" : "Add Employee"}
      </h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            employee = { emailId: values.email, ...values };
            console.log(employee);

            if (!location.state) {
              await axios
                .post(
                  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
                  employee
                )
                .then((response) => {
                  console.log(response.data);
                  alert("Employee added successfully");
                  navigate("/");
                })
                .catch((error) => {
                  console.log(error);
                  alert(error.message);
                });
            }

            if (location.state) {
              await axios
                .put(
                  `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${location.state.employee.id}`,
                  employee
                )
                .then((response) => {
                  console.log(response.data);
                  alert("Employee updated successfully");
                  navigate(-1);
                })
                .catch((error) => {
                  console.log(error);
                  alert(error.message);
                });
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 py-8"
          >
            <DivInputForm
              labelName="Name"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
            <DivInputForm
              labelName="Email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
            <DivInputForm
              labelName="Avatar"
              type="text"
              {...formik.getFieldProps("avatar")}
            />
            {formik.touched.avatar && formik.errors.avatar ? (
              <div>{formik.errors.avatar}</div>
            ) : null}
            <DivInputForm
              labelName="Mobile"
              type="phone"
              {...formik.getFieldProps("mobile")}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div>{formik.errors.mobile}</div>
            ) : null}
            <DivInputForm
              labelName="Country"
              type="option"
              {...formik.getFieldProps("country")}
            />
            {formik.touched.country && formik.errors.country ? (
              <div>{formik.errors.country}</div>
            ) : null}
            <DivInputForm
              labelName="State"
              type="text"
              {...formik.getFieldProps("state")}
            />
            {formik.touched.state && formik.errors.state ? (
              <div>{formik.errors.state}</div>
            ) : null}
            <DivInputForm
              labelName="District"
              type="text"
              {...formik.getFieldProps("district")}
            />
            {formik.touched.district && formik.errors.district ? (
              <div>{formik.errors.district}</div>
            ) : null}
            <Button
              type="submit"
              className="px-4 py-2 my-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
