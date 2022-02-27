import React, { useState } from "react";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../utils/FilterData";
const SearchFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(filterData);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };
  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            <option value={filter.placeholder}>{filter.placeholder}</option>
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SearchFilters;
