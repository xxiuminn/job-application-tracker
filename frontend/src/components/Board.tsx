import { useState } from "react";
import AddJobModal from "./AddJobModal";
import AddListModal from "./AddListModal";
import { useFetch } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const fetchData = useFetch();

  const { data: listData, isSuccess: listSuccess } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetchData(
        "/list/all",
        undefined,
        undefined,
        localStorage.getItem("token") ?? undefined
      ),
  }) as { data: { id: number; title: string }[]; isSuccess: boolean };

  const { data: jobData, isSuccess: jobSuccess } = useQuery({
    queryKey: ["job"],
    queryFn: () =>
      fetchData(
        "/job/all",
        undefined,
        undefined,
        localStorage.getItem("token") ?? undefined
      ),
  }) as {
    data: {
      id: number;
      title: string;
      company: string;
      list: { id: number };
    }[];
    isSuccess: boolean;
  };

  const handleCreateJob = () => {
    setJobModal(!jobModal);
  };

  const handleCreateList = () => {
    setListModal(!listModal);
  };

  return (
    <div className="grid grid-flow-col">
      {
        listSuccess &&
          jobSuccess &&
          listData.map((list) => (
            <div className="grid grid-flow-cols-1" key={list.id}>
              <div className="grid grid-rows-1 bg-red-100 text-center">
                {list.title}
              </div>
              {jobData.map((job) =>
                job.list.id === list.id ? (
                  <div className="grid grid-rows-1 text-center" key={job.id}>
                    <div>{job.title}</div>
                    <div>{job.company}</div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          ))

        /* <button
        className="bg-black px-2 rounded-md text-white align-middle text-center"
        onClick={handleCreateJob}
      >
        + Create
      </button>
      <button
        className="bg-black px-2 rounded-md text-white align-middle text-center"
        onClick={handleCreateList}
      >
        + Add
      </button>
      {jobModal && <AddJobModal handleCreateJob={handleCreateJob} />}
      {listModal && <AddListModal handleCreateList={handleCreateList} />} */
      }
    </div>
  );
};

export default Board;
