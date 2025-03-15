import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FormAnimationProps {
  isSignUp?: boolean;
}

/**
 * An animated form illustration that uses brand colors
 */
const FormAnimation: React.FC<FormAnimationProps> = ({ isSignUp = false }) => {
  // State to cycle through animation steps
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Returns animation styles based on the current cycle step
  const getItemAnimation = (index: number) => ({
    opacity: animationStep === index ? 1 : 0.4,
    x: animationStep === index ? 0 : -10,
    transition: { duration: 0.3 },
  });

  return (
    <div
      className="form-animation-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <motion.div
        className="form-animation-card"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          width: "280px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form header placeholder */}
        <motion.div
          style={{
            height: "32px",
            width: "60%",
            backgroundColor: "var(--color-300)",
            borderRadius: "4px",
            marginBottom: "12px",
          }}
          animate={getItemAnimation(0)}
        />

        {/* Form field placeholders */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              height: "24px",
              width: `${85 - i * 10}%`,
              backgroundColor: "var(--color-300)",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
            animate={getItemAnimation(i)}
          />
        ))}

        {/* Textarea placeholder */}
        <motion.div
          style={{
            height: "48px",
            width: "100%",
            backgroundColor: "var(--color-300)",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
          animate={getItemAnimation(3)}
        />

        {/* Form button placeholder */}
        <motion.div
          style={{
            height: "36px",
            width: "50%",
            backgroundColor: "var(--color-500)",
            borderRadius: "4px",
            marginTop: "1rem",
          }}
          animate={{
            opacity: animationStep === 3 ? 1 : 0.7,
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>

      {/* Label text below the animation */}
      <div className="text-center mt-3">
        <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
          {isSignUp ? "Create your first form" : "Access your forms"}
        </span>
      </div>
    </div>
  );
};

export default FormAnimation;
