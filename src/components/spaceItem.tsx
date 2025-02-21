/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";

export interface SpaceInterface {
  mission_name: string;
  details: string;
  launch_success: boolean;
  flight_number: string;
}
export interface SpaceDataInterface {
  data: SpaceInterface;
}

export default function SpaceItem({ data }: SpaceDataInterface) {
  return (
    <div className="min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div
        className={clsx(
          "capitalize border p-2 w-fit rounded-md text-white ",
          true ? "bg-green-700" : "bg-red-600"
        )}
      >{`Launch Status: ${data.launch_success}`}</div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.mission_name}
      </h5>
      <a
        href={`launches/${data.flight_number}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
