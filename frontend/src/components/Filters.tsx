import React, { ChangeEvent, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Row } from './CloudList';
import { FormControlLabel } from '@material-ui/core';

export type FilterType = {
  fieldName: string;
  displayName: string;
  values: string[];
};

export type FiltersPropsType = {
  filterRanges?: FilterType[];
  data?: Row[];
  children?: React.ReactElement;
};

const dummyFilters: FilterType[] = [
  {
    fieldName: 'provider',
    displayName: 'Provider',
    values: ['Amazon Web Services', 'Google Cloud', 'Azure'],
  },
  {
    fieldName: 'region',
    displayName: 'Region',
    values: ['Africa', 'Europe', 'Southeast Asia'],
  },
];

export const Filters = (props: FiltersPropsType) => {
  const { filterRanges = dummyFilters, data, children } = props;
  const [filteredData, setFilteredData] = useState<Row[] | undefined>(data);
  const [checkboxState, setCheckboxState] = useState<
    { name: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (category: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const checked = event.target.checked;

    setCheckboxState({
      ...checkboxState,
      [name]: checked,
    });

    setFilteredData(
      data?.filter((item) => item[category as keyof object] === name)
    );
  };

  return (
    <>
      <div>
        <h2>Filters</h2>
        {filterRanges &&
          filterRanges.map((category, index) => (
            <div key={index}>
              <h3>{category.displayName}</h3>
              {category.values.map((value: string, index) => (
                <FormControlLabel
                  key={index}
                  label={value}
                  control={
                    <Checkbox
                      key={index}
                      name={value}
                      onChange={handleChange(category.fieldName)}
                    />
                  }
                />
              ))}
            </div>
          ))}
      </div>
      {children && React.cloneElement(children, { data: filteredData })}
    </>
  );
};
