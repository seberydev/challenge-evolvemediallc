import { motion } from "framer-motion";
import { useRouter } from "next/router";

const bounceAnim = {
  whileHover: {
    y: 4,
    transition: { duration: 0.13, type: "spring", stiffness: 400, damping: 6 },
  },
};

const Finished = () => {
  const {
    query: { message },
    replace,
  } = useRouter();

  const playAgainHandler = () => {
    replace("/play");
  };

  return (
    <main className="bg-light min-vh-100 d-flex justify-content-center align-items-center flex-column gap-4 overflow-hidden">
      <h1 className="text-center">{message}</h1>
      <motion.button
        type="button"
        className="btn btn-dark"
        onClick={playAgainHandler}
        {...bounceAnim}
      >
        Play Again
      </motion.button>
    </main>
  );
};

export default Finished;
