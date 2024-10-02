"use client"

import { Names } from "@/types/names";

interface Props {
    items: Names[];
}

const NameList = ({ items } : Props) => {
    return (
      items.length > 0 &&
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
              item.name &&
              <div key={index} className="p-4 bg-gray-100 rounded shadow text-center aspect-square flex flex-col justify-around items-center overflow-hidden">
                  <p></p>
                  <p className={"text-black break-all"}>{item.name}</p>
                  <p className={"text-gray-600 text-sm break-all"}>{item.email.split("@")[0]}</p>
              </div>
            ))}
        </div>
    );
};

export default NameList;
