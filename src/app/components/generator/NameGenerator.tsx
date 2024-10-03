"use client"

import { useState } from "react";
import Button from "@/app/components/Button";
import Lottie from 'lottie-react';
import loading from '../../../../public/loading.json'
import randomSleep from "@/app/lib/randomSleep";

const NameGenerator = () => {
  const [name, setName] = useState("카더가든");
  const [isLoading, setIsLoading] = useState(false);

  const fetchName = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/generator`, {
      method: 'GET',
    })
    await randomSleep(700, 1700);
    setName(await res.json());
    setIsLoading(false);
  };

  return (
    <div className={"flex flex-col gap-8 w-full items-center"}>
      <h1 className={"text-xl"}>{`내 이름은 "${name}" 입니다.`}</h1>
      <Button onClick={fetchName} mode={"rainbow"}>
        {isLoading ?
          <Lottie
            animationData={loading}
            loop={true}
            className="w-full h-auto max-w-[200px]"
          /> :
          <>이름 바꾸기</>
        }
      </Button>
    </div>
  );
}

export default NameGenerator;
