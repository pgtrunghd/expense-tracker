import React, { useState } from "react";

export const useFilter = <T>(params?: T) => {
  const [filter, setFilter] = useState({
    page: 1,
    take: 10,
    ...params,
  });

  const setPage = (page: number) => {
    setFilter((prev) => ({
      ...prev,
      page,
    }));
  };

  return { filter, setFilter, setPage };
};
