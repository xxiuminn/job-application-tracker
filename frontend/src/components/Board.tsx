import { useState } from "react";
import AddJobModal from "./AddJobModal";
import AddListModal from "./AddListModal";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);
  const [listModal, setListModal] = useState(false);

  const handleCreateJob = () => {
    setJobModal(!jobModal);
  };

  const handleCreateList = () => {
    setListModal(!listModal);
  };

  return (
    <div>
      <button
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
      {listModal && <AddListModal handleCreateList={handleCreateList} />}
    </div>
  );
};

export default Board;
