"use client";

import { Names } from "@/types/names";
import { useEffect, useMemo, useState } from "react";
import Select from "@/app/components/Select";
import Button from "@/app/components/Button";

const NameList = () => {
    const [names, setNames] = useState<Names[]>([]);
    const [searchBy, setSearchBy] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const searchParams = useMemo(() => {
        const params: Record<string, string> = {
            sortBy,
            sortOrder,
        };

        if (searchValue) {
            params.searchBy = searchBy;
            params.searchValue = searchValue;
        }

        return new URLSearchParams(params).toString();
    }, [searchBy, searchValue, sortBy, sortOrder]);

    const fetchNames = async () => {
        const res = await fetch(`/api/names?${searchParams}`, {
            method: 'GET',
        });
        setNames(await res.json());
    };

    useEffect(() => {
        fetchNames();
    }, [searchParams]);

    const handleChangeSearchBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchBy(e.target.value);
    }

    const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    }

    const handleChangeSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
    return (
      <div>
          <div className="flex mb-4 justify-between filter:flex-row flex-col gap-2">
              <div className="flex gap-2 h-[42px]">
                <Select value={searchBy} onChange={handleChangeSearchBy} mode={"sortBy"} />
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    placeholder="검색어 입력"
                    className="p-2 border rounded w-[280px] filter:w-auto"
                />
              </div>
              <div className={"flex gap-2 h-[42px]"}>
                <Select value={sortBy} onChange={handleChangeSortBy} mode={"sortBy"} />
                  <Button onClick={handleChangeSortOrder} mode={"filter"}>
                      {sortOrder === "asc" ? <>↑</> : <>↓</>}
                  </Button>
              </div>
          </div>
          {names.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {names.map((item, index) => (
                  item.name && (
                    <div key={index} className="p-4 bg-gray-100 rounded shadow text-center aspect-square flex flex-col justify-around items-center overflow-hidden">
                        <p className="text-black break-all">{item.name}</p>
                        <p className="text-gray-600 text-sm break-all">{item.email.split("@")[0]}</p>
                    </div>
                  )
                ))}
            </div>
          )}
      </div>
    );
};

export default NameList;
