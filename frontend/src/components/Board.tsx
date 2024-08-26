import { useEffect, useState } from "react";
import AddJobModal from "./AddJobModal";
import { Methods, useFetch } from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Job from "./Job";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [currentListId, setCurrentListId] = useState<number | null>();

  type jobData = {
    id: number;
    title: string;
    company: string;
    list: { id: number };
  };

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
    data: jobData[];
    isSuccess: boolean;
  };

  const [jobArr, setJobArr] = useState<jobData[]>([]);

  useEffect(() => {
    if (jobData) {
      setJobArr(jobData);
    }
  }, [jobData]);

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

  const handleCreateJob = (listId: number) => {
    setCurrentListId(listId);
    setJobModal(true);
  };

  const handleUpdateTitle = (title: string, id: number) => {
    updateList({ title, id });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      console.log(active);
      console.log(over);
      setJobArr((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex bg-black h-screen overflow-x-auto overflow-y-hidden items-center">
      <div className="flex flex-row text-center h-5/6 gap-4 mx-4">
        {/* <DndContext onDragEnd={handleDragEnd}> */}
        {/* <SortableContext items={listData}> */}
        {listSuccess &&
          jobSuccess &&
          listData.map((list) => (
            <DndContext onDragEnd={handleDragEnd}>
              <div className="h-full flex flex-col">
                <div key={list.id} className="w-72 bg-zinc-900 rounded-md">
                  <button
                    className="text-white mx-4 block"
                    onClick={() => delList(list.id)}
                  >
                    x
                  </button>

                  <input
                    className="py-2 text-white bg-zinc-900 text-center"
                    onChange={(e) => handleUpdateTitle(e.target.value, list.id)}
                    value={list.title}
                  ></input>
                </div>
                <div className="bg-zinc-900 overflow-y-auto">
                  <SortableContext items={jobArr}>
                    {jobArr.map(
                      (job) => job.list.id === list.id && <Job job={job} />
                    )}
                  </SortableContext>
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
            </DndContext>
          ))}
        <div>
          <button
            className="bg-zinc-900 text-white rounded-md p-6 w-72"
            onClick={() => addList()}
          >
            + Add another list
          </button>
        </div>
        {/* </SortableContext> */}
        {/* </DndContext> */}
      </div>
    </div>
  );
};

export default Board;
