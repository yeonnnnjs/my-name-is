"use client"

import { useState } from 'react';
import { useRouter, usePathname } from "next/navigation";
import Button from "@/app/components/Button";

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
          <Button onClick={() => handleChangeTab(0)} mode={activeTab === 0 ? "enableTab" : "disableTab"}>
            이름 목록
          </Button>
          <Button onClick={() => handleChangeTab(1)} mode={activeTab === 1 ? "enableTab" : "disableTab"}>
            이름 생성기
          </Button>
        </div>
    );
};

export default Tabs;
