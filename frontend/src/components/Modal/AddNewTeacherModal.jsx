import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddNewTeacherModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      userId: "",
      dob: "",
      gender: "male",
      emali: "",
      aadhar: "",
      address: "",
      alternate_num: "",
      subject: "",
      qualification: "",
      joiningDate: "",
    },

    validationSchema: Yup.object({
      userId: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      gender: Yup.string().required("Required"),
      emali: Yup.string().email("Invalid email").required("Required"),
      aadhar: Yup.string()
        .length(12, "Must be 12 digits")
        .required("Required"),
      address: Yup.string().required("Required"),
      alternate_num: Yup.string().required("Required"),
      subject: Yup.string().required("Required"),
      qualification: Yup.string().required("Required"),
      joiningDate: Yup.date().required("Required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      // API CALL HERE
      // axios.post("/teacher/create", values)
    },
  });

  const input =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition";

  const label = "text-xs font-semibold text-slate-500 mb-1 block";
  const error = "text-xs text-red-500 mt-1";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Add New Teacher
            </h2>
            <p className="text-sm text-slate-500">
              Fill teacher details to create profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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
              {formik.errors.dob && (
                <p className={error}>{formik.errors.dob}</p>
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

            {/* EMAIL */}
            <div>
              <label className={label}>Email *</label>
              <input
                name="emali"
                onChange={formik.handleChange}
                value={formik.values.emali}
                className={input}
              />
              {formik.errors.emali && (
                <p className={error}>{formik.errors.emali}</p>
              )}
            </div>

            {/* AADHAR */}
            <div>
              <label className={label}>Aadhar *</label>
              <input
                name="aadhar"
                onChange={formik.handleChange}
                value={formik.values.aadhar}
                className={input}
              />
              {formik.errors.aadhar && (
                <p className={error}>{formik.errors.aadhar}</p>
              )}
            </div>

            {/* ALTERNATE NUMBER */}
            <div>
              <label className={label}>Alternate Number *</label>
              <input
                name="alternate_num"
                onChange={formik.handleChange}
                value={formik.values.alternate_num}
                className={input}
              />
              {formik.errors.alternate_num && (
                <p className={error}>{formik.errors.alternate_num}</p>
              )}
            </div>

            {/* SUBJECT */}
            <div>
              <label className={label}>Subject *</label>
              <input
                name="subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
                className={input}
              />
              {formik.errors.subject && (
                <p className={error}>{formik.errors.subject}</p>
              )}
            </div>

            {/* QUALIFICATION */}
            <div>
              <label className={label}>Qualification *</label>
              <input
                name="qualification"
                onChange={formik.handleChange}
                value={formik.values.qualification}
                className={input}
              />
              {formik.errors.qualification && (
                <p className={error}>{formik.errors.qualification}</p>
              )}
            </div>

            {/* JOINING DATE */}
            <div>
              <label className={label}>Joining Date *</label>
              <input
                type="date"
                name="joiningDate"
                onChange={formik.handleChange}
                value={formik.values.joiningDate}
                className={input}
              />
              {formik.errors.joiningDate && (
                <p className={error}>{formik.errors.joiningDate}</p>
              )}
            </div>

          </div>

          {/* ADDRESS */}
          <div>
            <label className={label}>Address *</label>
            <textarea
              rows={3}
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              className={input}
            />
            {formik.errors.address && (
              <p className={error}>{formik.errors.address}</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg text-sm hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTeacherModal;