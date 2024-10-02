"use client"
import React, { useState } from 'react';
import Button from "@/app/components/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (email: string) => void;
}

const Modal = ({ isOpen, onClose, onAddItem }: Props) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const handleSendCode = async () => {
    await fetch(`/api/verify/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })
    setIsSend(true);
    setVerificationCode('');
  };

  const handleVerifyCode = async () => {
    const res = await fetch(`/api/verify/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code: verificationCode })
    })
    setIsVerify(await res.json());
  };

  const handleAddItem = () => {
    onAddItem(email);
    setEmail('');
    setVerificationCode('');
    onClose();
  }

  const handleClose = () => {
    setEmail('');
    setVerificationCode('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <div className={"flex justify-between"}>
          <h2 className="text-xl font-semibold mb-4">이메일 인증</h2>
          <p className={"cursor-pointer"} onClick={handleClose}>X</p>
        </div>
        <div className="flex mb-6">
          <input
            type="email"
            placeholder={"이메일 주소를 입력"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-md"
          />
          <Button onClick={handleSendCode} mode={"input"}>전송</Button>
        </div>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder={"인증 코드를 입력"}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-md"
          />
          <Button onClick={handleSendCode} mode={"input"} disableCondition={!isSend}>인증</Button>
        </div>
        <Button onClick={handleAddItem} mode={"normal"} disableCondition={!isVerify}>
          추가
        </Button>
      </div>
    </div>
  );
};

export default Modal;
