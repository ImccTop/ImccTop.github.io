"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import icon from "../public/icon1024.png";
import beian from "../public/beian.png";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import Threads from "@/components/Threads";
import GradualBlur from "@/components/GradualBlur";
import ShinyText from "@/components/ShinyText";

export default function Home() {
  const slogan = ["Innovative", "Minds", "Craft", "Connections"];
  const topGlowRef = useRef<HTMLDivElement | null>(null);
  const bottomGlowRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 检测设备类型
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // 使用 rAF 批量更新 DOM transform，避免频繁 setState 导致重渲染
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          const x = mouseRef.current.x * 50;
          const y = mouseRef.current.y * 50;
          if (topGlowRef.current)
            topGlowRef.current.style.transform = isMobile
              ? "translate(0, 0)"
              : `translate3d(${x}px, ${y}px, 0)`;
          if (bottomGlowRef.current)
            bottomGlowRef.current.style.transform = isMobile
              ? "translate(0, 0)"
              : `translate3d(${-x}px, ${-y}px, 0)`;
          rafRef.current = null;
        });
      }
    }
    window.addEventListener("mousemove", handleMouseMove);

    // 设置加载完成状态
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkDevice);
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ width: "100%", height: "100%" }}
      >
        <Threads
          amplitude={isMobile ? 1.0 : 1.5}
          distance={isMobile ? 0.2 : 0.3}
          enableMouseInteraction={false}
          enabled={!isMobile}
        />

        {/* 渐变光晕（使用 refs + rAF 更新 transform） */}
        <div
          ref={topGlowRef}
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{ transform: isMobile ? "translate(0, 0)" : "translate3d(0,0,0)", willChange: 'transform' }}
        />
        <div
          ref={bottomGlowRef}
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{ transform: isMobile ? "translate(0, 0)" : "translate3d(0,0,0)", willChange: 'transform' }}
        />
      </div>
      <section className="fixed z-40 overflow-hidden">
        <GradualBlur
          target="page"
          position="top"
          height={isMobile ? "6rem" : "8rem"}
          strength={isMobile ? 1 : 2}
          divCount={isMobile ? 2 : 5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </section>

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col flex-grow pt-12 md:pt-14 lg:pt-16">
        <div className="flex-grow flex flex-col lg:flex-row justify-between items-center px-4 py-8 sm:p-8 md:p-16 lg:p-20">
          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity={true}
            scale={1.2}
            threshold={0}
            delay={0.8}
          >
            <div className="flex flex-col gap-1 font-mono mb-8 lg:mb-0 text-center lg:text-left">
              {slogan.map((word, index) => (
                <div
                  key={index}
                  className="flex flex-row items-baseline group justify-center lg:justify-start mb-2 last:mb-0"
                >
                  <GradientText
                    className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl cursor-pointer transition-transform duration-300 hover:scale-105"
                    colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={5}
                    showBorder={false}
                  >
                    {word[0]}
                  </GradientText>
                  <BlurText
                    className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl cursor-pointer"
                    text={word.substring(1)}
                    delay={60}
                    threshold={1}
                    animateBy="letters"
                    direction="bottom"
                  />
                  <div className="ml-2 lg:ml-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                  </div>
                </div>
              ))}

              {/* 描述文本 */}
              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0}
                delay={1.0}
              >
                <p className="text-white/70 text-base sm:text-lg md:text-xl mt-6 md:mt-8 max-w-md mx-auto lg:mx-0 font-light leading-relaxed bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  重要的不仅是我们创造了什么，更在于我们为何以及如何去建立联结。
                </p>
              </AnimatedContent>

              <AnimatedContent
                distance={50}
                direction="vertical"
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                threshold={0}
                delay={1.2}
              >
                {/* CTA 按钮组 */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8">
                  <button
                    className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 rounded-full hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 hover:scale-105 group"
                    onClick={() =>
                      window.open("https://github.com/ImccTop", "_blank")
                    }
                  >
                    <ShinyText text="了解更多" disabled={false} speed={3} />
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>

                  <button className="px-6 py-3 sm:px-8 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full hover:bg-white/10 transition-all duration-300 min-h-[44px] flex items-center justify-center hover:scale-105">
                    <span className="text-white/70">探索</span>
                  </button>
                </div>
              </AnimatedContent>
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity={true}
            scale={1.2}
            threshold={0}
            delay={0.8}
          >
            {/* 主图标 */}
            <div className="relative group w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 mt-8 lg:mt-0 transform transition-all duration-500 hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src={icon}
                alt="icon"
                width={512}
                height={512}
                className="rounded-2xl transform transition-all duration-500 group-hover:rotate-3 relative z-10 shadow-2xl"
                priority
              />
              {/* 悬浮效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="w-full mt-16 md:mt-20">
        <div className="bg-gradient-to-t from-black/60 to-transparent backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-4">
              {/* 左侧：Icon和技术栈 */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white/90 font-bold text-sm">
                      织芯
                    </span>
                  </div>
                  <span className="text-white/90 font-medium text-lg">
                    Imcc
                  </span>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2 transition-colors hover:text-blue-400 cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <a
                      href="https://github.com/ImccTop/ImccTop.github.io/actions"
                      target="_blank"
                    >
                      由 GitHub 构建
                    </a>
                  </div>

                  <div className="flex items-center gap-2 transition-colors hover:text-blue-400 cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3L4 21h16z" />
                    </svg>
                    <a href="https://nextjs.org/" target="_blank">
                      由 Next.js 驱动
                    </a>
                  </div>
                </div>
              </div>

              {/* 右侧：演示标签和社交链接 */}
              <div className="flex flex-col items-center lg:items-end gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                  <span className="text-white/90 text-sm font-medium">
                    前端演示
                  </span>
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-white/60 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-white/60 hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/ImccTop/ImccTop.github.io"
                    target="_blank"
                    className="text-white/60 hover:text-purple-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* 底部：备案信息 */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-white/60">
                <div className="flex flex-row gap-1 items-center">
                  <Image src={beian} alt="beian" width={14} />
                  <a
                    href="https://beian.mps.gov.cn/#/query/webSearch?code=33018502002519"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-white transition-colors hover:underline"
                  >
                    浙公网安备33018502002519号
                  </a>
                </div>
                <a
                  href="https://beian.miit.gov.cn/"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:text-white transition-colors hover:underline"
                >
                  浙ICP备2025202408号-1
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
