import React from 'react'
import { X } from "lucide-react";

function StudentDeatilsview({data, onClose}) {
    const { student, user, Classs, rollno } = data;
  return (
    <>
   <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            Student Full Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Top Profile */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-800">
                {user?.name}
              </h4>
              <p className="text-sm text-slate-500">
                Roll No: {rollno} · Class: {Classs}
              </p>
            </div>

            <span
              className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                user?.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Gender", student?.gender],
              ["DOB", new Date(student?.dob).toLocaleDateString()],
              ["Aadhar", student?.aadhar],
              ["Mobile", user?.mobile],
              ["Father Name", student?.fatherName],
              ["Mother Name", student?.motherName],
              ["District", student?.district],
              ["PIN Code", student?.pin],
            ].map(([label, val]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-slate-700 font-medium">
                  {val || "-"}
                </p>
              </div>
            ))}
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["User ID", user?.user_id],
              ["Role", user?.role],
              ["Created At", new Date(student?.createdAt).toLocaleString()],
              ["Updated At", new Date(student?.updatedAt).toLocaleString()],
            ].map(([label, val]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-slate-700 font-medium">
                  {val || "-"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StudentDeatilsview