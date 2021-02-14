import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";

const getPrayerTimings = (values) => {
  let prayerTimings = {};

  axios
    .get(
      `http://api.aladhan.com/v1/timingsByCity?city=${values.city}&country=${values.country}`
    )
    .then((res) => console.log(res.data.data));
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SearchForm = () => {
  return (
    <Formik
      initialValues={{
        date: "",
        city: "",
        country: "",
        calculationMethod: "",
        schoolOfThought: "",
      }}
      validationSchema={Yup.object({
        date: Yup.date().required("Required"),
        city: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        calculationMethod: Yup.string()
          .oneOf(
            ["uisk", "isna", "mwl", "uqum", "egas"],
            "Invalid calculation method"
          )
          .required("Required"),
        schoolOfThought: Yup.string()
          .oneOf(["msh", "h"], "Invalid school of thought")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        getPrayerTimings(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <MyTextInput label="Date" name="date" type="date" />

        <MyTextInput
          label="City"
          name="city"
          type="text"
          placeholder="ex: Dhaka"
        />

        <MyTextInput
          label="Country"
          name="country"
          type="text"
          placeholder="ex: Bangladesh"
        />

        <MySelect label="Calculation Method" name="calculationMethod">
          <option value="">Select a school of thought</option>
          <option value="uisk">University of Islamic Sciences, Karachi</option>
          <option value="isna">Islamic Society of North America (ISNA)</option>
          <option value="mwl">Muslim World League</option>
          <option value="uqum">Umm Al-Qura University, Makkah</option>
          <option value="egas">Egyptian General Authority of Survey</option>
        </MySelect>

        <MySelect label="School of thought" name="schoolOfThought">
          <option value="">Select a calculation method</option>
          <option value="msh">Maliki, Sahfi, Hambali</option>
          <option value="h">Hanafi</option>
        </MySelect>

        <button type="submit">Get Prayer Timings</button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
