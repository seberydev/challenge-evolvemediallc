import logo from "@/public/icons/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const slideFromTopAnim = {
  initial: { opacity: 0, y: -10000 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65 },
};

const slideFromBottomAnim = {
  initial: { opacity: 0, y: 10000 },
  animate: {
    opacity: 1,
    y: 0,
  },
  viewport: { once: true },
  transition: { duration: 0.65, delay: 0.9 },
};

const bounceAnim = {
  whileHover: {
    y: 4,
    transition: { duration: 0.13, type: "spring", stiffness: 400, damping: 6 },
  },
};

const Home = () => {
  const router = useRouter();

  const startHandler = () => {
    router.push("/play");
  };

  return (
    <main className="bg-light min-vh-100 d-flex justify-content-center align-items-center flex-column gap-4 overflow-hidden">
      <motion.div
        {...slideFromTopAnim}
        className="w-100 d-flex justify-content-center"
      >
        <Image className="img-fluid" width={180} src={logo} alt="Logo" />
      </motion.div>
      <motion.div {...slideFromBottomAnim}>
        <motion.button
          type="button"
          className="btn btn-dark"
          onClick={startHandler}
          {...bounceAnim}
        >
          Start
        </motion.button>
      </motion.div>
    </main>
  );
};

export default Home;
