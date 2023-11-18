const Tags = ({selectedTags, setSelectedTags}) => {
  return (
    <>
      <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 mt-2">
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" />
          <span>Breakfast</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" />
          <span>Fast-food</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" name="dates" />
          <span>Dates</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" name="five-star" />
          <span>Five-star</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" name="dinner" />
          <span>Dinner</span>
        </label>
        <label className=" border p-4 flex items-center justify-center gap-x-2 rounded-md cursor-pointer">
          <input type="checkbox" name="family" />
          <span>Family</span>
        </label>
      </div>
    </>
  );
};

export default Tags;
