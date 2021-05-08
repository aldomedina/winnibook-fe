import React from 'react';
import { getDayNumFromTS, getMonthNameFromTS, getYearFromTS } from '../../utils';

const Date = ({ ts }) => (
  <div className="flex flex-row md:flex-col justify-center items-center w-max text-sm opacity-50">
    <span className="capitalize inline mr-2 md:mr-0">{`${getMonthNameFromTS(ts)}, ${getDayNumFromTS(
      ts
    )}`}</span>
    <span className="md:text-xl">{getYearFromTS(ts)}</span>
  </div>
);

export default Date;
