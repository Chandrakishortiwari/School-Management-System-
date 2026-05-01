import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddNewTeacherModal from "../components/Modal/AddNewTeacherModal";

const Teachers = () => {
  const [search, setSearch] = useState("");
  const [TeacherData, setTeacherData] = useState([])
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [AddTechermodal, setAddTechermodal] = useState(false)
   const getapi = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/teacher/getallteacher"
        );
        const data = await response.json();
        console.log(data);
        
        setTeacherData(data.data || []);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
  
    useEffect(() => {
      getapi();
    }, []);
    console.log(TeacherData);
    

  const formattedRows = TeacherData.map((t, index) => ({
    id: index + 1,
    name: t.user?.name,
    gender: t.teacher?.gender,
    mobile: t.user?.mobile,
    subject: t.teacher?.subject,
    qualification: t.teacher?.qualification,
    status: t.user?.isActive ? "Active" : "Inactive",
    original: t, // full data for actions
  }));

  const columns = [
    { field: "name", headerName: "Teacher Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "mobile", headerName: "Contact No", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  //  Filter
  const filteredRows = formattedRows.filter((row) => {
    return (
      row.name.toLowerCase().includes(search.toLowerCase()) &&
      (classFilter ? row.class === classFilter : true) &&
      (statusFilter ? row.status === statusFilter : true)
    );
  });

  //  Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  //  PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map((col) => col.headerName);
    const tableRows = filteredRows.map((row) =>
      columns.map((col) => row[col.field])
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
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
    <h1 className="text-2xl sm:text-3xl font-bold">Teachers</h1>
    <button onClick={()=>setAddTechermodal(true)} className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
      Add Teacher
    </button>
  </div>

  {/* Export Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
    <button
      onClick={exportExcel}
      className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      Export Excel
    </button>

    <button
      onClick={exportPDF}
      className="bg-purple-500 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      Export PDF
    </button>
  </div>

  {/* Search + Filters */}
  <div className="flex flex-col md:flex-row gap-4 w-full md:items-center v">

    {/* Search */}
    <input
      placeholder="Search..."
      className="border p-2 w-full md:w-1/3 rounded"
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Filters */}
    <div className="flex md:justify-end w-full md:w-auto">

      <select
        className="border p-2 w-full sm:w-40 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Status</option>
        <option value="active">Active</option>
      </select>
    </div>
  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto">
    <div style={{ minWidth: "600px", height: 400 }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableColumnMenu
        pageSizeOptions={[10, 20, 40]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </div>
  </div>
 {AddTechermodal && <AddNewTeacherModal onClose={()=>setAddTechermodal(false)} />}

</div>
  );
};

export default Teachers;