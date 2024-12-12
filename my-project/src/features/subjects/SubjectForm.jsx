import React, { useState, useEffect } from 'react';
import { getTopics } from '../../services/topicService'; // Import API để lấy danh sách topic

const SubjectForm = ({ selectedSubject, onSave, onCancel }) => {
  const [subjectName, setSubjectName] = useState('');
  const [topicId, setTopicId] = useState('');
  const [topics, setTopics] = useState([]); // Danh sách topic

  useEffect(() => {
    // Lấy danh sách topic từ API
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data); // Cập nhật state topics
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();

    // Nếu đang sửa subject, set giá trị ban đầu
    if (selectedSubject) {
      setSubjectName(selectedSubject.subjectName);
      setTopicId(selectedSubject.topicId.toString());
    } else {
      setSubjectName('');
      setTopicId('');
    }
  }, [selectedSubject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectData = { subjectName, topicId: parseInt(topicId, 10) };
    onSave(selectedSubject ? { ...subjectData, subjectId: selectedSubject.subjectId } : subjectData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Tên Subject:</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Chọn Topic:</label>
        <select
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        >
          <option value="" disabled>
            -- Chọn Topic --
          </option>
          {topics.map((topic) => (
            <option key={topic.topicId} value={topic.topicId}>
              {topic.topicName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
