import React, { useState, useEffect } from 'react';
import TopicList from './TopicList';
import TopicForm from './TopicForm';
import Modal from 'react-modal';
import { getTopics,deleteTopic  } from '../../services/topicService';

Modal.setAppElement('#root');

const TopicFeature = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
  
    const openModal = (topic = null) => {
      setSelectedTopic(topic);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedTopic(null);
      setIsModalOpen(false);
    };
  
    const handleSave = (savedTopic) => {
        if (selectedTopic) {
          // Cập nhật topic trong danh sách
          setTopics((prevTopics) =>
            prevTopics.map((topic) =>
              topic.topicId === savedTopic.topicId ? savedTopic : topic
            )
          );
        } else {
          // Thêm topic mới
          setTopics((prevTopics) => [...prevTopics, savedTopic]);
        }
        closeModal(); // Đóng modal sau khi lưu
      };
      
      
  
      const handleDelete = async (topicId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa topic này không?')) {
          try {
            const response = await deleteTopic(topicId); // Gọi API xóa
            console.log('Phản hồi từ API:', response);
      
            // Cập nhật danh sách topic sau khi xóa
            setTopics((prevTopics) =>
              prevTopics.filter((topic) => topic.topicId !== topicId)
            );
      
            alert(response.message || 'Xóa thành công!');
          } catch (error) {
            console.error('Error deleting topic:', error);
            alert('Xóa thất bại! Hãy thử lại.');
          }
        }
      };
      
  
    useEffect(() => {
      fetchTopics();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Quản lý Topic</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Thêm Topic
        </button>
        <TopicList topics={topics} onEdit={openModal} onDelete={handleDelete} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            {selectedTopic ? 'Sửa Topic' : 'Thêm Topic'}
          </h2>
          <TopicForm selectedTopic={selectedTopic} onSave={handleSave} onCancel={closeModal} />
        </Modal>
      </div>
    );
  };
  

export default TopicFeature;
