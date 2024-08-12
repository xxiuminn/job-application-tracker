import { useState } from "react";
import AddJobModal from "./AddJobModal";

const Board = () => {
  // const [list, setList] = useState<string[]>([]);
  const [jobModal, setJobModal] = useState(false);

  const handleCreateList = () => {
    setJobModal(!jobModal);
  };

  return (
    <div>
      <button
        className="bg-black px-2 rounded-md text-white align-middle text-center"
        onClick={handleCreateList}
      >
        + Create
      </button>
      {jobModal && <AddJobModal handleCreateList={handleCreateList} />}
    </div>
  );
};

export default Board;
