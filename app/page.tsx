"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import Threads from "@/components/Threads";
import GradualBlur from "@/components/GradualBlur";
import ShinyText from "@/components/ShinyText";

export default function Home() {
    const slogan = ["Innovative", "Minds", "Craft", "Connections"];
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* 背景 */}
            <div className="absolute inset-0 z-0 overflow-hidden" style={{ width: '100%', height: '600px' }}>
                <Threads amplitude={1.5} distance={0.3} enableMouseInteraction={true} />

                {/* 渐变光晕 */}
                <div
                    className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
                    }}
                />
                <div
                    className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${-mousePosition.x * 50}px, ${-mousePosition.y * 50}px)`
                    }}
                />
            </div>

            {/* 导航栏 */}
            <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <nav className="flex justify-between items-center p-4 md:p-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">织芯</span>
                        </div>
                        <span className="font-semibold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Imcc
                        </span>
                    </div>
                </nav>
            </div>

            {/* 主内容 */}
            <div className="relative z-10 flex flex-col pt-12 md:pt-16">
                <section className="fixed z-40 overflow-hidden">
                    <GradualBlur
                        target="page"
                        position="top"
                        height="8rem"
                        strength={2}
                        divCount={5}
                        curve="bezier"
                        exponential={true}
                        opacity={1}
                    />
                </section>

                <div className="flex-1 flex flex-col lg:flex-row justify-between items-center p-8 md:p-20 lg:p-32">
                    <AnimatedContent
                        distance={150}
                        direction="horizontal"
                        reverse={true}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.2}
                        animateOpacity={true}
                        scale={1.2}
                        threshold={0.2}
                        delay={0.3}
                    >
                        <div className="flex flex-col gap-1 font-mono mb-12 lg:mb-0">
                            {slogan.map((word, index) => (
                                <div key={index} className="flex flex-row items-baseline group">
                                    <GradientText
                                        className="text-4xl font-bold md:text-6xl lg:text-7xl cursor-pointer"
                                        colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                                        animationSpeed={5}
                                        showBorder={false}
                                    >
                                        {word[0]}
                                    </GradientText>
                                    <BlurText
                                        className="text-3xl font-bold md:text-5xl lg:text-6xl cursor-pointer"
                                        text={word.substring(1)}
                                        delay={100}
                                        animateBy="letters"
                                        direction="bottom"
                                    />
                                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
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
                                threshold={0.2}
                                delay={0.5}
                            >
                                <p className="text-white/60 text-lg md:text-xl mt-8 max-w-md font-light leading-relaxed">
                                    重要的不仅是我们创造了什么，更在于我们为何以及如何去建立联结。
                                </p>
                            </AnimatedContent>
                            {/* CTA 按钮 */}
                            <AnimatedContent
                                distance={50}
                                direction="vertical"
                                duration={1}
                                ease="power3.out"
                                initialOpacity={0}
                                animateOpacity={true}
                                threshold={0.2}
                                delay={1.0}
                            >
                                <div className="flex space-x-4 mt-8">
                                    <button className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full hover:bg-white/15 transition-all duration-300"
                                            onClick={() => window.open('https://github.com/ImccTop', '_blank')}
                                    >
                                        <ShinyText
                                            text="了解更多"
                                            disabled={false}
                                            speed={3}
                                        />
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
                        threshold={0.2}
                        delay={0.3}
                    >
                        {/* 主图标 */}
                        <div className="relative group w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 min-w-32 min-h-32 transform group-hover:scale-105 transition-transform duration-500">
                            <Image
                                src="icon512.png"
                                alt="icon"
                                width={512}
                                height={512}
                                className="rounded-2xl transform group-hover:rotate-3 transition-transform duration-500"
                            />
                        </div>
                    </AnimatedContent>
                </div>

                {/* 底部信息 */}
                <div className="bottom-0 left-0 right-0 z-40">
                    <div className="bg-black/30 backdrop-blur-md border-t border-white/10">
                        <div className="flex flex-col justify-center items-center text-white/70 text-sm p-4 md:p-6">
                            {/* 第一行：技术信息和演示标识 */}
                            <div className="flex flex-col md:flex-row justify-between items-center w-full mb-3">
                                <div className="flex justify-center space-x-8 mb-3 md:mb-0">
                                    <div className="flex justify-center space-x-2">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span>由 Github 构建</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                        <span>由 Next.js 驱动</span>
                                    </div>
                                </div>

                                <div className="flex space-x-6">
                                    <span>*前端演示*</span>
                                </div>
                            </div>

                            {/* 第二行：备案号 */}
                            <div className="w-full text-center">
                                <a
                                    href="https://beian.miit.gov.cn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-1xl text-white/70 hover:text-white/90 transition-colors duration-300"
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