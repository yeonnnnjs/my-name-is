"use client";

import { useState } from "react";
import EmailVerificationModal from "@/app/components/list/EmailVerificationModal";
import Button from "@/app/components/Button";

const NameInput = () => {
  const [inputName, setInputName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNames = async (email: string) => {
    await fetch("/api/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputName, email }),
    });
    setInputName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  return (
    <>
      <div className="mb-6 flex">
        <input
          type="text"
          value={inputName}
          onChange={handleChange}
          placeholder={"이름을 입력해 추가"}
          className="w-full rounded-l-md border px-4 py-2"
        />
        <Button
          onClick={handleOpenModal}
          disableCondition={inputName.length === 0}
          mode={"input"}
        >
          추가
        </Button>
      </div>
      <EmailVerificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddItem={handleAddNames}
      />
    </>
  );
};

export default NameInput;
