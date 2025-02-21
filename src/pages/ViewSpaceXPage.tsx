import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { viewLaunch } from "../redux/slice/spaceXSlice";
import LoaderComponent from "../components/loader";
import moment from "moment";

function ViewSpaceXPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { launch, loading } = useAppSelector(
    (state: any) => state.spaceXLaunches
  );

  const getProductsHandler = useCallback(() => {
    return dispatch(viewLaunch(id || ""));
  }, [dispatch, id]);

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);

  if (loading) {
    return <LoaderComponent />;
  }
  console.log(launch?.links);
  return (
    <div>
      <div className="min-w-fit p-10 m-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img src={`${launch?.links?.mission_patch}`} alt={launch?.mission_name} />
        <div
          className={clsx(
            "capitalize border p-2 w-fit rounded-md text-white ",
            true ? "bg-green-700" : "bg-red-600"
          )}
        >{`Launch Status: ${launch?.launch_success}`}</div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {launch?.mission_name}
        </h5>
        <div className="flex gap-2">
          <div>{moment(launch?.launch_date_utc, "YYYYMMDD").fromNow()}</div>|
          <a
            href={launch?.links?.article_link}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            Article
          </a>
          |
          <a
            href={launch?.links?.video_link}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            Video
          </a>
        </div>
        <div>{`Flight #: ${launch?.flight_number}`}</div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {launch?.details}
        </p>

        <h5 className="mt-5 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Rocket
        </h5>
        <div>{`Name: ${launch?.rocket?.rocket_name}`}</div>
        <div>{`Type: ${launch?.rocket?.rocket_type}`}</div>

        <h5 className="mt-5 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lauch Site
        </h5>
        <div>{`Name: ${launch?.launch_site?.site_name_long}`}</div>
        <button
          onClick={() => navigate("/")}
          type="button"
          className="text-white mt-10 end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewSpaceXPage;
