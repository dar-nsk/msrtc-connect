import { motion } from "framer-motion";
import bus from "../assets/bus.png";

function BusAnimation() {
  return (
    <motion.img
      src={bus}
      alt="bus"
      className="absolute bottom-10 w-[400px]"
      initial={{ x: -500 }}
      animate={{ x: 1200 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

export default BusAnimation;