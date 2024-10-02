"use client"

import { useState } from "react";
import Button from "@/app/components/Button";

const NameGenerator = () => {
  const [name, setName] = useState("카더가든");

  const fetchName = async () => {
    const res = await fetch(`/api/generator`, {
      method: 'GET',
    })
    setName(await res.json());
  };

  return (
    <div className={"flex flex-col gap-8 w-full items-center"}>
      <h1>{`내 이름은 "${name}" 입니다.`}</h1>
      <Button onClick={fetchName} mode={"rainbow"}>이름 바꾸기</Button>
    </div>
  );
}

export default NameGenerator;
