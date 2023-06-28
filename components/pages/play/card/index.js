import Image from "next/image";

const Card = ({ src, flipHandler, flipped, failed }) => {
  return (
    <div onClick={flipHandler} className="col-sm custom-card-container m-2">
      <div
        className={`bg-primary front ${flipped ? "flip-front" : ""} ${
          failed && !flipped ? "remove-flip-front" : ""
        }`}
      >
        <h1 className="text-warning">?</h1>
      </div>
      <div
        className={`bg-primary back ${flipped ? "flip-back" : ""} ${
          failed && !flipped ? "remove-flip-back" : ""
        }`}
      >
        <Image src={src} alt="Secret" />
      </div>
    </div>
  );
};

export default Card;
