"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const grad1 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["0%", "0%", "200%"],
    x2: ["0%", "0%", "180%"],
    y1: ["80%", "0%", "0%"],
    y2: ["100%", "20%", "20%"],
  },
};

const grad2 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};

export const PulseBeams = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <SVGs />
        </div>
    );
};

export const SVGs = () => {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 858 434"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex flex-shrink-0"
      >
        <path
          d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
          stroke="url(#grad1)"
        />
        <path
          d="M568 200H841C846.523 200 851 195.523 851 190V40"
          stroke="url(#grad2)"
        />
        <path
          d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
          stroke="url(#grad3)"
        />
        <path
          d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
          stroke="url(#grad4)"
        />
        <path
          d="M380 168V17C380 11.4772 384.477 7 390 7H414"
          stroke="url(#grad5)"
        />
  
        <defs>
          <motion.linearGradient
            variants={grad1}
            animate="animate"
            initial="initial"
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 2,
              delay: Math.random() * 2,
            }}
            id="grad1"
          >
            <GradientColors />
          </motion.linearGradient>
          <motion.linearGradient
            variants={grad2}
            animate="animate"
            initial="initial"
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 2,
              delay: Math.random() * 2,
            }}
            id="grad2"
          >
            <GradientColors />
          </motion.linearGradient>
        </defs>
      </svg>
    );
  };
  const GradientColors = () => {
    return (
      <>
        <stop stopColor="#18CCFC" stopOpacity="0"></stop>
        <stop stopColor="#18CCFC"></stop>
        <stop offset="0.325" stopColor="#6344F5"></stop>
        <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
      </>
    );
  };