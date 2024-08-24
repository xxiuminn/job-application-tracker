import { useState } from "react";
import AddJobModal from "./AddJobModal";
import { Methods, useFetch } from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [currentListId, setCurrentListId] = useState<number | null>();

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
    mutationFn: async () =>
      await fetchData(
        "/list/create",
        Methods.PUT,
        { title: "Edit Title" },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const { mutate: delList } = useMutation({
    mutationFn: async (listId: number) =>
      await fetchData(
        "/list/delete",
        Methods.DELETE,
        { id: listId },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const { mutate: updateList } = useMutation({
    mutationFn: async (param: { title: string; id: number }) =>
      await fetchData(
        "/list/update",
        Methods.PATCH,
        { id: param.id, title: param.title },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  const { mutate: delJob } = useMutation({
    mutationFn: async (jobId: number) =>
      await fetchData(
        "/job/delete",
        Methods.DELETE,
        { id: jobId },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["job"] }),
  });

  const handleCreateJob = (listId: number) => {
    setCurrentListId(listId);
    setJobModal(true);
  };

  const handleUpdateTitle = (title: string, id: number) => {
    updateList({ title, id });
  };

  return (
    <div className="flex bg-black h-screen overflow-x-auto overflow-y-hidden items-center">
      <div className="grid grid-flow-col text-center h-5/6 gap-4 mx-4">
        {listSuccess &&
          jobSuccess &&
          listData.map((list) => (
            <div>
              <div
                key={list.id}
                className="w-72 bg-zinc-900 rounded-md relative"
              >
                <button
                  className="text-white mx-4 block"
                  onClick={() => delList(list.id)}
                >
                  x
                </button>

                <input
                  className="py-2 text-white overflow-y-auto bg-zinc-900 text-center"
                  onChange={(e) => handleUpdateTitle(e.target.value, list.id)}
                  value={list.title}
                ></input>
              </div>
              <div className="bg-zinc-900 overflow-y-auto h-3/4">
                {jobData.map(
                  (job) =>
                    job.list.id === list.id && (
                      <div className="m-2 p-4 bg-black rounded-md">
                        <button
                          className=" text-white text-sm font-thin"
                          onClick={() => delJob(job.id)}
                        >
                          Delete
                        </button>
                        <div className="text-white text-sm" key={job.id}>
                          <div>{job.title}</div>
                          <div className="font-thin text-sm">{job.company}</div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <button
                className="border-t-2 text-white w-full p-4 bg-zinc-900 rounded-b-md"
                onClick={() => handleCreateJob(list.id)}
              >
                + Add a job
              </button>
              {jobModal && currentListId === list.id && (
                <AddJobModal
                  handleCreateJob={() => setJobModal(false)}
                  listId={currentListId}
                />
              )}
            </div>
          ))}
        <div>
          <button
            className="bg-zinc-900 text-white rounded-md p-6 w-72"
            onClick={() => addList()}
          >
            + Add another list
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
