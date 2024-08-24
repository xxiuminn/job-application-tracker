import { useState } from "react";
import { Methods, useFetch } from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type createJobProps = {
  handleCreateJob: () => void;
  listId: number;
};

const AddJobModal = ({ handleCreateJob, listId }: createJobProps) => {
  const [company, setCompany] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [attachment, setAttachment] = useState<string[]>([]);
  const fetchData = useFetch();
  const queryClient = useQueryClient();

  const { mutate: createJob } = useMutation({
    mutationFn: async () =>
      await fetchData(
        "/job/create",
        Methods.PUT,
        {
          company,
          title,
          description,
          url,
          salary,
          location,
          list_id: listId,
          attachment,
        },
        localStorage.getItem("token") ?? undefined
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job"] });
      handleCreateJob();
    },
  });

  const cancelAddJob = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleCreateJob();
  };

  const handleSubmitJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createJob();
  };

  const handleInputChange = (item: string, value: string) => {
    switch (item) {
      case "Company":
        setCompany(value);
        break;
      case "Title":
        setTitle(value);
        break;
      case "Description":
        setDescription(value);
        break;
      case "URL":
        setUrl(value);
        break;
      case "Salary":
        setSalary(value);
        break;
      case "Location":
        setLocation(value);
        break;
      case "Attachment":
        setAttachment([value]);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0 z-30">
          <form
            className="bg-zinc-900 rounded-md p-10 text-white w-1/4 z-50"
            onSubmit={handleSubmitJob}
          >
            {[
              "Company",
              "Title",
              "Description",
              "Url",
              "Salary",
              "Location",
              "Attachment",
            ].map((item) => {
              return (
                <>
                  <div className="flex flex-col">
                    <label key={`${item}-label`} htmlFor={item} className="">
                      {item}
                    </label>
                    <input
                      id={item}
                      required={item === ("Company" || "Title") ? true : false}
                      key={`${item}-input`}
                      className="p-1 text-black rounded-md"
                      onChange={(e) => handleInputChange(item, e.target.value)}
                      value={
                        item === "Company"
                          ? company
                          : item === "Title"
                          ? title
                          : item === "Description"
                          ? description
                          : item === "URL"
                          ? url
                          : item === "Salary"
                          ? salary
                          : item === "location"
                          ? location
                          : attachment
                      }
                    ></input>
                  </div>
                </>
              );
            })}
            <button
              className="bg-black px-2 rounded-md text-white align-middle text-center"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-black px-2 rounded-md text-white align-middle text-center"
              onClick={cancelAddJob}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJobModal;
