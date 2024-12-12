import React from 'react';

const SubjectList = ({ subjects, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tên Subject</th>
            <th className="border border-gray-300 px-4 py-2">Tên Topic</th>
            <th className="border border-gray-300 px-4 py-2">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectId} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{subject.subjectId}</td>
              <td className="border border-gray-300 px-4 py-2">{subject.subjectName}</td>
              <td className="border border-gray-300 px-4 py-2">{subject.topicName}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(subject)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(subject.subjectId)}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;
