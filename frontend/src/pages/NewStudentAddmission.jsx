import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewStudentAddmission = () => {
  const formik = useFormik({
    initialValues: {
      userId: "",
      classId: "",
      dob: "",
      gender: "male",
      fatherName: "",
      motherName: "",
      address: "",
      district: "",
      pin: "",
      aadhar: "",
    },

    validationSchema: Yup.object({
      userId: Yup.string().required("Required"),
      classId: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      fatherName: Yup.string().required("Required"),
      motherName: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      pin: Yup.string().required("Required"),
      aadhar: Yup.string().length(12, "Must be 12 digits"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const input =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition";

  const label = "text-xs font-semibold text-slate-500 mb-1 block";

  const error = "text-xs text-red-500 mt-1";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            New Student Admission
          </h2>
          <p className="text-sm text-slate-500">
            Fill student details to create profile
          </p>
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-5 border-b text-sm font-semibold text-slate-700">
            Personal Information
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* CLASS */}
            <div>
              <label className={label}>Class *</label>
              <input
                name="classId"
                onChange={formik.handleChange}
                value={formik.values.classId}
                className={input}
              />
              {formik.errors.classId && (
                <p className={error}>{formik.errors.classId}</p>
              )}
            </div>

            {/* USER ID */}
            <div>
              <label className={label}>User ID *</label>
              <input
                name="userId"
                onChange={formik.handleChange}
                value={formik.values.userId}
                className={input}
              />
              {formik.errors.userId && (
                <p className={error}>{formik.errors.userId}</p>
              )}
            </div>

            {/* GENDER */}
            <div>
              <label className={label}>Gender *</label>
              <select
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                className={input}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className={label}>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                onChange={formik.handleChange}
                value={formik.values.dob}
                className={input}
              />
            </div>

            {/* AADHAR */}
            <div>
              <label className={label}>Aadhar</label>
              <input
                name="aadhar"
                onChange={formik.handleChange}
                value={formik.values.aadhar}
                className={input}
              />
            </div>

            {/* DISTRICT */}
            <div>
              <label className={label}>District *</label>
              <input
                name="district"
                onChange={formik.handleChange}
                value={formik.values.district}
                className={input}
              />
            </div>

            {/* PIN */}
            <div>
              <label className={label}>PIN Code *</label>
              <input
                name="pin"
                onChange={formik.handleChange}
                value={formik.values.pin}
                className={input}
              />
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2 lg:col-span-4">
              <label className={label}>Address</label>
              <textarea
                rows={2}
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                className={input}
              />
            </div>
          </div>
        </div>

        {/* PARENT INFO */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-5 border-b text-sm font-semibold text-slate-700">
            Parent & Guardian Information
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={label}>Father Name *</label>
              <input
                name="fatherName"
                onChange={formik.handleChange}
                value={formik.values.fatherName}
                className={input}
              />
              {formik.errors.fatherName && (
                <p className={error}>{formik.errors.fatherName}</p>
              )}
            </div>

            <div>
              <label className={label}>Mother Name *</label>
              <input
                name="motherName"
                onChange={formik.handleChange}
                value={formik.values.motherName}
                className={input}
              />
              {formik.errors.motherName && (
                <p className={error}>{formik.errors.motherName}</p>
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-100 transition">
            Cancel
          </button>

          <button
            onClick={formik.handleSubmit}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition"
          >
            Create Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewStudentAddmission;