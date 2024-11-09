"use client";

import siteConfig from "@/config/site";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const texts = [
  "Shrink URLs",
  "keep history",
  "boost efficiency!",
  //   siteConfig.tagline,
  //   "Login to unlock more features",
  `all crafted by ${siteConfig.author}`,
] as const;

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

export const Typewriter = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    //   Set the interval
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, SWAP_DELAY_IN_MS);

    //   Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <span>
      {texts[textIndex].split("").map((char, index) => {
        return (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${textIndex}-${index}`}
            className="relative select-none"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * LETTER_DELAY, duration: 0 }}
              className="uppercase font-light font-mono"
            >
              {char}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: BOX_FADE_DURATION,
                delay: index * LETTER_DELAY,
                times: [0, 0.1, 1],
                ease: "easeInOut",
              }}
              className="absolute bottom-0.5 left-px right-0 top-0.5 bg-neutral-100"
            />
          </motion.span>
        );
      })}
    </span>
  );
};
