/* eslint-disable react/prop-types */
const TagsOption = ({ handleTags, selectedTags, title, Icon }) => {
  return (
    <>
      <div
        onClick={() => handleTags(title)}
        className={`flex flex-col py-3 px-4 border-[1.5px] rounded-md hover:cursor-pointer ${
          selectedTags.includes(title) ? " border-black" : ""
        }`}
      >
        <div>{Icon}</div>
        <p>{title}</p>
      </div>
    </>
  );
};

export default TagsOption;
