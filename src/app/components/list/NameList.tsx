"use client";

import { Names } from "@/types/names";
import { useEffect, useMemo, useState } from "react";
import Select from "@/app/components/Select";
import Button from "@/app/components/Button";
import Lottie from "lottie-react";
import loading from "../../../../public/loading.json";

const NameList = () => {
  const [names, setNames] = useState<Names[]>([]);
  const [searchBy, setSearchBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [renderSearch, setRenderSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useMemo(() => {
    const params: Record<string, string> = {
      sortBy,
      sortOrder,
      page: String(page),
    };

    if (searchValue) {
      params.searchBy = searchBy;
      params.searchValue = searchValue;
    }

    return new URLSearchParams(params).toString();
  }, [page, searchBy, searchValue, sortBy, sortOrder]);

  const fetchNames = async () => {
    setIsLoading(true);
    setPage(1);
    setHasMore(true);
    setNames([]);

    const res = await fetch(`/api/names?${searchParams}`, {
      method: "GET",
    });
    const data = await res.json();
    if (data.length <= 0) {
      setHasMore(false);
    }

    setNames((prev) => [...prev, ...data]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNames();
  }, [searchParams]);

  const handleResetFilter = () => {
    setSearchBy("name");
    setSearchValue("");
    setRenderSearch("");
    setSortBy("name");
    setSortOrder("asc");
  };

  const handleGetMorePage = () => {
    setPage(page + 1);
  };

  const handleChangeSearchBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value);
  };

  const handleClickSearch = () => {
    setSearchValue(renderSearch);
  };

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenderSearch(e.target.value);
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleChangeSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-2 filter:flex-row">
        <div className="flex h-[42px] gap-2">
          <Select
            value={searchBy}
            onChange={handleChangeSearchBy}
            mode={"sortBy"}
          />
          <input
            type="text"
            value={renderSearch}
            onChange={handleChangeSearchValue}
            placeholder="검색어 입력"
            className="w-full rounded border p-2"
          />
          <Button onClick={handleClickSearch} mode={"normalPadding"}>
            검색
          </Button>
        </div>
        <div className={"flex h-[42px] gap-2"}>
          <Select
            value={sortBy}
            onChange={handleChangeSortBy}
            mode={"sortBy"}
          />
          <Button onClick={handleChangeSortOrder} mode={"square"}>
            {sortOrder === "asc" ? <>↑</> : <>↓</>}
          </Button>
        </div>
      </div>
      {names.length > 0 ? (
        <div className={"flex flex-col gap-4"}>
          {names.length > 0 && (
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {names.map(
                (item, index) =>
                  item.name && (
                    <div
                      key={index}
                      className="flex aspect-square flex-col items-center justify-around overflow-hidden rounded bg-gray-100 p-4 text-center shadow"
                    >
                      <p></p>
                      <p className="break-all text-black">{item.name}</p>
                      <p className="break-all text-sm text-gray-600">
                        {item.email.split("@")[0]}
                      </p>
                    </div>
                  ),
              )}
            </div>
          )}
          {hasMore && (
            <Button onClick={handleGetMorePage} mode={"normal"}>
              더보기
            </Button>
          )}
        </div>
      ) : (
        <div className={"flex justify-center"}>
          {isLoading ? (
            <Lottie
              animationData={loading}
              loop={true}
              className="h-auto w-full max-w-[200px]"
            />
          ) : (
            <>
              <div className="flex h-full flex-col text-center">
                <h1 className={"mb-4 text-2xl"}>해당하는 데이터가 없어요!</h1>
                <Button onClick={handleResetFilter} mode={"normal"}>
                  돌아가기
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NameList;
