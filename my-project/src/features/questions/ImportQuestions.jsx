import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import * as XLSX from "xlsx";
import { importQuestions } from "../../services/questionsService";
import { getSubjects } from "../../services/subjectService";

const ImportQuestions = () => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setError("Unable to load subjects. Please try again later.");
      }
    };
    fetchSubjects();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      readExcel(file);
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      const normalizedData = normalizeExcelData(jsonData);
      setExcelData(normalizedData);
    };

    reader.onerror = (err) => {
      console.error("Error reading Excel file:", err);
      setError("Failed to read Excel file. Please try again.");
    };

    reader.readAsBinaryString(file);
  };

  const normalizeExcelData = (data) => {
    return data.map((row) => {
      const normalizedRow = { ...row };
      Object.keys(row).forEach((key) => {
        if (key.startsWith("IsCorrect") && row[key] === "") {
          normalizedRow[key] = false; // Mặc định là false nếu giá trị rỗng
        }
        if (key.startsWith("Answer") && row[key] === "") {
          normalizedRow[key] = ""; // Mặc định là chuỗi rỗng
        }
      });
      return normalizedRow;
    });
  };

  const prepareDataForBackend = (excelData, subjectId) => {
    return excelData.map((row) => {
      const answers = [];
      Object.keys(row).forEach((key) => {
        if (key.startsWith("Answer")) {
          const index = key.replace("Answer", "");
          const isCorrectKey = `IsCorrect${index}`;
          const answerText = row[key];

          if (answerText) {
            answers.push({
              AnswerText: answerText.trim(),
              IsCorrect: row[isCorrectKey]?.toString().toLowerCase() === "true",
            });
          }
        }
      });

      return {
        QuestionText: row.QuestionText?.trim(),
        Explanation: row.Explanation?.trim(),
        Difficulty: parseInt(row.Difficulty, 10) || 0,
        SubjectId: subjectId,
        Answers: answers,
      };
    });
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !excelData.length) {
      setError("Please select a subject and upload a valid file.");
      return;
    }

    const preparedData = prepareDataForBackend(excelData, selectedSubject);

    try {
      console.log("Prepared Data:", preparedData); // Log dữ liệu gửi đi
      setIsLoading(true); // Bắt đầu loading

      await importQuestions(preparedData); // Gửi dữ liệu đến API
      alert("Import successful!");
      setIsLoading(false);

      navigate("/questions"); // Chuyển hướng về trang Questions
    } catch (err) {
      console.error("Import failed:", err.response || err.message);
      if (err.response?.data) {
        console.error("Error details from backend:", err.response.data);
      }
      setError("Import failed. Check console for details.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Import Questions</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700">Select Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => {
            const value = e.target.value;
            console.log("Selected SubjectId:", value); // Log giá trị subjectId
            setSelectedSubject(value);
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">-- Select a Subject --</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Upload Excel File</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {excelData.length > 0 && (
        <div className="mb-4 overflow-auto">
          <h2 className="text-lg font-bold mb-2">Preview Data</h2>
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key, index) => (
                  <th
                    key={index}
                    className="border border-gray-400 px-2 py-1 bg-gray-200"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((key, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-400 px-2 py-1"
                    >
                      {key.includes("IsCorrect") ? (
                        // Hiển thị True/False dưới dạng text
                        row[key] ? "True" : "False"
                      ) : (
                        // Hiển thị các giá trị khác dưới dạng text
                        row[key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-400" : "bg-green-500"
          } text-white px-4 py-2 rounded-lg`}
        >
          {isLoading ? "Importing..." : "Import Questions"}
        </button>
      </div>
    </div>
  );
};

export default ImportQuestions;
