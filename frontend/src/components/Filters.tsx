import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Row } from './CloudList';

export type FilterType = {
  displayName: string;
  values: string[];
};

export type FiltersPropsType = {
  filterRanges?: FilterType[];
  data?: Row[];
  children?: React.ReactElement;
};

export const Filters = (props: FiltersPropsType) => {
  const { filterRanges, data, children } = props;
  const [filteredData, setFilteredData] = useState<Row[] | undefined>(data);

  return (
    <>
      <div>
        <h2>Filters</h2>
        {filterRanges &&
          filterRanges.map((filter, index) => (
            <div key={index}>
              <h3>{filter.displayName}</h3>
              {filter.values.map((value, index) => (
                <Checkbox
                  key={index}
                  inputProps={{
                    'aria-label': value,
                  }}
                />
              ))}
            </div>
          ))}
      </div>
      {children && React.cloneElement(children, { data: filteredData })}
    </>
  );
};
