import React, { useState, useEffect } from 'react';
import SubjectList from './SubjectList';
import SubjectForm from './SubjectForm';
import Modal from 'react-modal';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../../services/subjectService';

Modal.setAppElement('#root');

const SubjectFeature = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const openModal = (subject = null) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSubject(null);
    setIsModalOpen(false);
  };

  const handleSave = async (savedSubject) => {
    if (selectedSubject) {
      // Cập nhật Subject
      try {
        const updatedSubject = await updateSubject(savedSubject.subjectId, savedSubject);
        setSubjects((prevSubjects) =>
          prevSubjects.map((subject) =>
            subject.subjectId === updatedSubject.subjectId ? updatedSubject : subject
          )
        );
      } catch (error) {
        console.error('Error updating subject:', error);
      }
    } else {
      // Tạo mới Subject
      try {
        const newSubject = await createSubject(savedSubject);
        setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
      } catch (error) {
        console.error('Error creating subject:', error);
      }
    }
    closeModal();
  };

  const handleDelete = async (subjectId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa subject này không?')) {
      try {
        await deleteSubject(subjectId);
        setSubjects((prevSubjects) =>
          prevSubjects.filter((subject) => subject.subjectId !== subjectId)
        );
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Quản lý Subject</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
      >
        Thêm Subject
      </button>
      <SubjectList subjects={subjects} onEdit={openModal} onDelete={handleDelete} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">
          {selectedSubject ? 'Sửa Subject' : 'Thêm Subject'}
        </h2>
        <SubjectForm
          selectedSubject={selectedSubject}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default SubjectFeature;
