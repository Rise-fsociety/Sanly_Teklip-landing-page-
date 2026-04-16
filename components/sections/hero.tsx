import { motion } from "framer-motion";
import Antigravity from "../Antigravity";

export function Hero() {
  const titleText = "Sanly Teklip";
  const titleDelay = 1.0; 

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] bg-white flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: titleDelay, duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <Antigravity
          count={700}
          magnetRadius={15}
          ringRadius={15}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.2}
          lerpSpeed={0.05}
          color={["#3AB4FF", "#0157A4"]}
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        /> 
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: titleDelay, duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-[#0157A4] text-xs font-bold tracking-[0.2em] uppercase shadow-sm"
        >
          Sanly we Ygtybarly
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-tight drop-shadow-sm bg-gradient-to-r from-[#3AB4FF] to-[#0157A4] bg-clip-text text-transparent">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.05,
                ease: "linear"
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: titleDelay, duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-4xl text-slate-600 font-medium mb-12 tracking-wide uppercase"
        >
          gelejegiň ýoly
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
