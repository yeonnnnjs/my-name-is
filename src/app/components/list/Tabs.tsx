"use client"

import { useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

const Tabs = () => {
  const router = useRouter();
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname === "/" ? 0 : 1);

    const handleChangeTab = (tab: number) => {
        setActiveTab(tab);
        router.push(tab === 0 ? "/" : "/generator");
    }

    return (
        <div className="flex justify-center space-x-4 mb-6 w-full">
            <button
                className={`w-full px-4 py-2 ${
                    activeTab === 0 ? 'bg-gray-700 text-white' : 'bg-gray-300'
                } rounded`}
                onClick={() => handleChangeTab(0)}
            >
                이름 목록
            </button>
            <button
                className={`w-full px-4 py-2 ${
                    activeTab === 1 ? 'bg-gray-700 text-white' : 'bg-gray-300'
                } rounded`}
                onClick={() => handleChangeTab(1)}
            >
                이름 생성기
            </button>
        </div>
    );
};

export default Tabs;
