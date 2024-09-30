"use client"

import { useState } from 'react';
import EmailVerificationModal from "@/app/components/list/EmailVerificationModal";

const NameInput = () => {
  const [inputName, setInputName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNames = async (email: string) => {
    await fetch('/api/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: inputName, email })
    })
    setInputName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  }

    return (
      <>
        <div className="flex mb-6">
            <input
                type="text"
                value={inputName}
                onChange={handleChange}
                className="flex-grow px-4 py-2 border rounded-l-md"
            />
            <button
                onClick={handleOpenModal}
                disabled={inputName.length === 0}
                className="bg-gray-700 text-white px-6 py-2 rounded-r-md hover:bg-gray-500 disabled:opacity-30"
            >
                추가
            </button>
        </div>
        <EmailVerificationModal isOpen={isModalOpen} onClose={handleCloseModal} onAddItem={handleAddNames} />
      </>
    );
};

export default NameInput;
