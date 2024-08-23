import { useState } from "react";
import AddJobModal from "./AddJobModal";
import { Methods, useFetch } from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const fetchData = useFetch();
  const queryClient = useQueryClient();

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

  const { mutate: addList } = useMutation({
    mutationFn: () =>
      fetchData(
        "/list/create",
        Methods.PUT,
        { title: "Edit Title" },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const { mutate: delList } = useMutation({
    mutationFn: (listId: number) =>
      fetchData(
        "/list/delete",
        Methods.DELETE,
        { id: listId },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const { mutate: updateList } = useMutation({
    mutationFn: (listId: number) =>
      fetchData(
        "/list/update",
        Methods.PATCH,
        { id: listId },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const handleCreateJob = () => {
    setJobModal(!jobModal);
  };

  return (
    <div className="flex bg-black h-screen overflow-x-auto overflow-y-hidden items-center">
      <div className="grid grid-flow-col text-center h-5/6 gap-4 mx-4">
        {listSuccess &&
          jobSuccess &&
          listData.map((list) => (
            <div key={list.id} className="w-72 bg-zinc-900 rounded-md relative">
              <button
                className="text-white mx-4 block"
                onClick={() => delList(list.id)}
              >
                x
              </button>
              <div
                className="py-2 text-white overflow-y-auto"
                // onChange={(e) => setTitle(e.target.value)}
              >
                {list.title}
              </div>
              {jobData.map(
                (job) =>
                  job.list.id === list.id && (
                    <div className="m-2 p-4 bg-black rounded-md">
                      <div className="text-white text-sm" key={job.id}>
                        <div>{job.title}</div>
                        <div className="font-thin text-sm">{job.company}</div>
                      </div>
                    </div>
                  )
              )}
              <button
                className="absolute bottom-0 left-0  border-t-2 text-white w-full p-4"
                onClick={handleCreateJob}
              >
                + Add a job
              </button>
            </div>
          ))}
        <div>
          <button
            className="bg-zinc-900 text-white rounded-md p-6 w-72"
            onClick={() => addList()}
          >
            + Add another list
          </button>
          {jobModal && <AddJobModal handleCreateJob={handleCreateJob} />}
        </div>
      </div>
    </div>
  );
};

export default Board;
