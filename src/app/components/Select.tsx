"use client";

import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  mode: "sortBy" | "sortOrder"
}

const OPTIONS = {
  "sortBy": (
    <>
      <option value="name">이름</option>
      <option value="email">작성자</option>
    </>
  ),
  "sortOrder": (
    <>
      <option value="asc">오름차순</option>
      <option value="desc">내림차순</option>
    </>
  ),
}

const Select = ({value, onChange, mode}: Props) => {
  return (
    <select value={value} onChange={onChange} className="flex-1 filter:w-auto px-2 border rounded">
      {OPTIONS[mode]}
    </select>
  )
}

export default Select;
