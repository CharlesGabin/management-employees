import { useFormik } from "formik";
import { Button } from "./ui/button";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { COUNTRIES_URL, Employee } from "../lib/utils";

const AddEmployee = () => {
  const navigate = useNavigate();

  let employee: Employee[] = [];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      avatar: "",
      mobile: "",
      country: "",
      state: "",
      district: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      avatar: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      mobile: Yup.number().required("Required"),
      country: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      employee = { emailId: values.email, ...values };
      console.log(employee);

      await axios
        .post(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
          employee
        )
        .then((response) => {
          console.log(response.data);
          alert("Employee added successfully");
          navigate("/");
          // setEmployees((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    },
  });
  return (
    <main className="flex flex-col items-center w-full gap-5 m-auto shadow">
      <h1 className="text-3xl font-bold">Add Employee</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 py-8">
        <DivInputForm
          labelName="Name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <DivInputForm
          labelName="Email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <DivInputForm
          labelName="Avatar"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.avatar}
        />
        {formik.touched.avatar && formik.errors.avatar ? (
          <div>{formik.errors.avatar}</div>
        ) : null}
        <DivInputForm
          labelName="Mobile"
          type="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobile}
        />
        {formik.touched.mobile && formik.errors.mobile ? (
          <div>{formik.errors.mobile}</div>
        ) : null}
        <DivInputForm
          labelName="Country"
          type="option"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country ? (
          <div>{formik.errors.country}</div>
        ) : null}
        <DivInputForm
          labelName="State"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
        />
        {formik.touched.state && formik.errors.state ? (
          <div>{formik.errors.state}</div>
        ) : null}
        <DivInputForm
          labelName="District"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.district}
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
    </main>
  );
};

export default AddEmployee;

export const DivInputForm = ({
  labelName,
  type,
  onChange,
  value,
}: {
  labelName: string;
  type: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  value: string;
}) => {
  const [countries, setCountries] = useState([]);

  const getCountriesName = () => {
    axios
      .get(COUNTRIES_URL)
      .then((response) => {
        console.log(response.data);
        const sortedData = response.data.sort(
          (a: { name: { common: string } }, b: { name: { common: string } }) =>
            a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (type === "option") {
      getCountriesName();
    }
  }, []);

  return (
    <div className="inline-flex items-center gap-2 ">
      <label
        htmlFor={labelName.toLowerCase()}
        className="w-[100px] items-start inline-flex"
      >
        {labelName}
      </label>
      {type === "option" ? (
        <select
          name={labelName.toLowerCase()}
          id={labelName.toLowerCase()}
          className="w-full p-2 border-2 border-black rounded-md"
          // placeholder={`Enter ${labelName.toLowerCase()}`}
          required
          onChange={onChange}
          value={value}
        >
          {countries
            ? countries.map((country: { name: { common: string } }) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))
            : null}
        </select>
      ) : (
        <input
          type={type}
          name={labelName.toLowerCase()}
          id={labelName.toLowerCase()}
          className="w-full p-2 border-2 border-black rounded-md"
          placeholder={`Enter ${labelName.toLowerCase()}`}
          required
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};
