import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Methods, useFetch } from "../hooks/useFetch";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

type jobProps = {
  job: { id: number; title: string; company: string; list: { id: number } };
};
const Job = ({ job }: jobProps) => {
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: job.id });

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="m-2 p-4 bg-black rounded-md"
    >
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
  );
};

export default Job;
