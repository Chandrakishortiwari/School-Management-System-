import { CheckCircle, XCircle, MinusCircle, Save, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

const MarkAttendance = () => {
  const students = [
    { id: 1, name: 'Emma Wilson', roll: 'S001' },
    { id: 2, name: 'Liam Brown', roll: 'S002' },
    { id: 3, name: 'Olivia Davis', roll: 'S003' },
    { id: 4, name: 'Noah Martinez', roll: 'S004' },
  ]

  const [attendance, setAttendance] = useState({})
  const [savedStudents, setSavedStudents] = useState({})
  const [changedStudents, setChangedStudents] = useState({})

  const handleSelect = (id, status) => {
    if (savedStudents[id]) return

    setAttendance(prev => ({ ...prev, [id]: status }))
    setChangedStudents(prev => ({ ...prev, [id]: true }))
  }

  const handleSave = async (id) => {
    try {
      const payload = {
        studentId: id,
        status: attendance[id],
      }

      console.log('API hit for:', payload)

      // 👉 API call here
      // await axios.post('/api/attendance', payload)

      setSavedStudents(prev => ({ ...prev, [id]: true }))
      setChangedStudents(prev => ({ ...prev, [id]: false }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-5">

 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Mark Attendance</h1>
          {/* <p className="text-sm text-slate-500 mt-0.5">{user.classAssigned} — {selectedDate}</p> */}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 flex justify-between">
        <span className="font-medium text-gray-600">
          {students.length} Students
        </span>
      </div>

      {students.map(s => (
        <div
          key={s.id}
          className="flex items-center justify-between px-5 py-3 border-t"
        >
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm font-semibold text-gray-800">{s.name}</p>
            <p className="text-xs text-gray-400">{s.roll}</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* Buttons */}
            <div className="flex gap-2">
              {/* Present */}
              <button
                disabled={savedStudents[s.id]}
                onClick={() => handleSelect(s.id, 'P')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs
                ${
                  attendance[s.id] === 'P'
                    ? 'bg-green-100 text-green-600 border-green-300'
                    : 'bg-white text-gray-400'
                }`}
              >
                <CheckCircle size={14} /> P
              </button>

              {/* Absent */}
              <button
                disabled={savedStudents[s.id]}
                onClick={() => handleSelect(s.id, 'A')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs
                ${
                  attendance[s.id] === 'A'
                    ? 'bg-red-100 text-red-600 border-red-300'
                    : 'bg-white text-gray-400'
                }`}
              >
                <XCircle size={14} /> A
              </button>

              
            </div>

            {/* Save Button */}
            {changedStudents[s.id] && !savedStudents[s.id] && (
              <button
                onClick={() => handleSave(s.id)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs"
              >
                <Save size={14} /> Save
              </button>
            )}

            {/* Saved Label */}
            {savedStudents[s.id] && (
              <span className="text-green-600 text-xs font-medium">
                Saved ✓
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarkAttendance