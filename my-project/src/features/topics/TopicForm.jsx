import React, { useState, useEffect } from 'react';
import { createTopic, updateTopic } from '../../services/topicService';

const TopicForm = ({ selectedTopic, onSave, onCancel }) => {
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    if (selectedTopic) {
      setTopicName(selectedTopic.topicName);
    } else {
      setTopicName('');
    }
  }, [selectedTopic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedTopic;
      if (selectedTopic) {
        savedTopic = await updateTopic(selectedTopic.topicId, { topicName });
      } else {
        savedTopic = await createTopic({ topicName });
      }
      onSave(savedTopic); // Trả topic mới/sửa về `TopicFeature`
    } catch (error) {
      console.error('Error saving topic:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Tên Topic:</label>
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
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

export default TopicForm;
