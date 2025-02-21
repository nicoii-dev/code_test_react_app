import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getLaunches } from "../redux/slice/spaceXSlice";
import LoaderComponent from "../components/loader";
import { EmptyData } from "../components/empty";
import SpaceItem, { SpaceInterface } from "../components/spaceItem";
import SearchComponent from "../components/search";

function SpaceXPage() {
  const dispatch = useAppDispatch();

  const {
    launches,
    loading,
  } = useAppSelector((state: any) => state.spaceXLaunches);
  const [per_page, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const getLaunchesHandler = useCallback(() => {
    dispatch(getLaunches({ per_page, search }));
  }, [dispatch, per_page, search]);

  useEffect(() => {
    getLaunchesHandler();
  }, [getLaunchesHandler]);


  // Detect when user is near the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        if (!loading) {
          setPerPage((prev) => prev + 10);
          getLaunchesHandler();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <SearchComponent setSearch={setSearch} />
      <div className="flex justify-center min-h-screen ">
        {launches?.length > 0 ? (
          <div>
            <div className="flex flex-wrap p-10 justify-center">
              {launches?.map((data: SpaceInterface, index: number) => {
                return (
                  <div key={index} className="m-5 w-full">
                    <SpaceItem data={data} />
                  </div>
                );
              })}
              {loading ? <LoaderComponent /> : null}
            </div>
          </div>
        ) : (
          <EmptyData />
        )}
      </div>
    </div>
  );
}

export default SpaceXPage;
