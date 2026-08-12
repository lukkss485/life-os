'use client'
import { motion } from "framer-motion";

export function BlurReveal({ children, className, ...props }: { children?: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      // O viewport agora não tem mais once: true, 
      // logo a animação inverte ao sair da tela.
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}