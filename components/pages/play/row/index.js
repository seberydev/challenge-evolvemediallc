const Row = ({ customStyles, children }) => {
  return <div className={`row h-100 m-0 ${customStyles}`}>{children}</div>;
};

export default Row;
