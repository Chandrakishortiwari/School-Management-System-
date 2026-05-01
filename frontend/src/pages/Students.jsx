import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import StudentDeatilsview from "../components/Modal/StudentDeatilsview";

const Students = () => {
  const [StudentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 🔥 Fetch API
  const getapi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/student/getstudent"
      );
      const data = await response.json();
      setStudentData(data.data || []);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getapi();
  }, []);

  // 🔥 Format Data for DataGrid
  const formattedRows = StudentData.map((s, index) => ({
    id: index + 1,
    name: s.user?.name,
    fatherName: s.student?.fatherName,
    rollno: s.rollno,
    Classs: s.Classs,
    gender: s.student?.gender,
    mobile: s.user?.mobile,
    status: s.user?.isActive ? "Active" : "Inactive",
    original: s, // full data for actions
  }));

  // 🔥 Columns
  const columns = [
    { field: "name", headerName: "Student", flex: 1 },
    { field: "fatherName", headerName: "Father Name", flex: 1 },
    { field: "rollno", headerName: "Roll No", flex: 1 },
    { field: "Classs", headerName: "Class", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "mobile", headerName: "Contact", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStudent(params.row.original)}
            className="text-blue-600 text-xs"
          >
            View
          </button>

          <button
            onClick={() =>
              alert("Update Student: " + params.row.name)
            }
            className="text-green-600 text-xs"
          >
            Update
          </button>
        </div>
      ),
    },
  ];

  // Excel Export
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formattedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  //  PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns
      .filter((col) => col.field !== "actions")
      .map((col) => col.headerName);

    const tableRows = formattedRows.map((row) =>
      columns
        .filter((col) => col.field !== "actions")
        .map((col) => row[col.field])
    );

    doc.text("Students List", 14, 10);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("students.pdf");
  };

  return (
    <div className="space-y-5 p-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-xl font-bold">Students</h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={exportExcel}
            className="bg-blue-500 text-white px-3 py-2 rounded w-full sm:w-auto"
          >
            Export Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-purple-500 text-white px-3 py-2 rounded w-full sm:w-auto"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* DataGrid */}
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "700px", height: 450 }}>
          <DataGrid
            rows={formattedRows}
            columns={columns}
            disableColumnMenu
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <StudentDeatilsview
          data={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default Students;