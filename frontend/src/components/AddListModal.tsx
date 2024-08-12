type createListProps = {
  handleCreateList: () => void;
};

const AddListModal = ({ handleCreateList }: createListProps) => {
  return (
    <>
      <div className="bg-slate-400">hi</div>
      <button onClick={handleCreateList}></button>
    </>
  );
};

export default AddListModal;
