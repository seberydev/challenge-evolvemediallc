const Row = ({ customStyles, children }) => {
  return (
    <div
      className={`row h-100 g-0 justify-content-center
    ${customStyles}`}
    >
      {children}
    </div>
  );
};

export default Row;
