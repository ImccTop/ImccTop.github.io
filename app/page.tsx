"use client";

import React from "react";
import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import Threads from "@/components/Threads";

export default function Home() {
  const slogan = ["Innovative", "Minds", "Craft", "Connections"];

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Threads amplitude={1} distance={0} enableMouseInteraction={false} />
      </div>
      <div className="absolute inset-0 z-10 flex flex-row justify-between items-center p-14 md:p-20 lg:p-32">
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.2}
          threshold={0.2}
          delay={0}
        >
          <div className="flex flex-col gap-1 font-mono">
            {slogan.map((word, index) => (
              <div key={index} className="flex flex-row items-baseline">
                <GradientText
                  className="text-4xl font-bold md:text-6xl "
                  colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={5}
                  showBorder={false}
                >
                  {word[0]}
                </GradientText>
                <BlurText
                  className="text-3xl font-bold md:text-5xl"
                  text={word.substring(1)}
                  delay={100}
                  animateBy="letters"
                  direction="bottom"
                />
              </div>
            ))}
          </div>
        </AnimatedContent>
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.2}
          threshold={0.2}
          delay={0}
        >
          <div className="w-32 h-32 md:w-64 md:h-64 min-w-32 min-h-32">
            <Image src="icon512.png" alt="icon" width={512} height={512} />
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
