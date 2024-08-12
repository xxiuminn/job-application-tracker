import { useState } from "react";

type createListProps = {
  handleCreateList: () => void;
};

const AddJobModal = ({ handleCreateList }: createListProps) => {
  const [company, setCompany] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const cancelAddList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleCreateList();
  };

  const handleSubmitList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreateList();
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
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <form
              className="flex flex-col justify-center items-start"
              onSubmit={handleSubmitList}
            >
              {["Company", "Title", "Description"].map((item) => {
                return (
                  <>
                    <div>
                      <label
                        key={`${item}-label`}
                        htmlFor={item}
                        className="mr-3"
                      >
                        {item}
                      </label>
                      <input
                        id={item}
                        key={`${item}-input`}
                        className="outline outline-1 outline-gray-400 px-2"
                        onChange={(e) =>
                          handleInputChange(item, e.target.value)
                        }
                        value={
                          item === "Company"
                            ? company
                            : item === "Title"
                            ? title
                            : description
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
                onClick={cancelAddList}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddJobModal;
