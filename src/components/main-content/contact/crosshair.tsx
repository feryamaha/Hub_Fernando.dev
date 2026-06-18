"use client";

import { gsap } from "gsap";
import { type RefObject, useEffect, useRef } from "react";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

interface MousePos {
  x: number;
  y: number;
}

const getMousePos = (e: MouseEvent, container: HTMLElement | null): MousePos => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }
  return { x: e.clientX, y: e.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null> | null;
}

const Crosshair = ({ color = "white", containerRef = null }: CrosshairProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let mouse: MousePos = { x: 0, y: 0 };

    const handleMouseMove = (ev: MouseEvent) => {
      mouse = getMousePos(ev, containerRef?.current ?? null);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 1 });
        }
      }

      const elements = document.elementsFromPoint(ev.clientX, ev.clientY);
      const interactiveElements = elements.filter(
        (el) =>
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.classList.contains("icon") ||
          el.classList.contains("text"),
      );

      if (interactiveElements.length > 0) {
        gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
          scale: 1.1,
          duration: 0.2,
          ease: "elastic.out(1, 0.3)",
          x: "random(-5, 5)",
          y: "random(-5, 5)",
          repeat: 1,
          yoyo: true,
        });

        for (const element of interactiveElements) {
          gsap.to(element, {
            scale: 1.1,
            duration: 0.2,
            ease: "elastic.out(1, 0.3)",
            x: "random(-5, 5)",
            y: "random(-5, 5)",
            repeat: 1,
            yoyo: true,
          });
        }
      } else {
        gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.2,
        });

        const allInteractiveElements = document.querySelectorAll("a, button, .icon, .text");
        for (const element of allInteractiveElements) {
          gsap.to(element, { scale: 1, x: 0, y: 0, duration: 0.2 });
        }
      }
    };

    const target: HTMLElement | Window = containerRef?.current ?? window;
    target.addEventListener("mousemove", handleMouseMove as EventListener);

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });

    const onMouseMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1,
      });

      requestAnimationFrame(render);
      target.removeEventListener("mousemove", onMouseMove);
    };

    target.addEventListener("mousemove", onMouseMove);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) {
            lineHorizontalRef.current.style.filter = "url(#filter-noise-x)";
          }
          if (lineVerticalRef.current) {
            lineVerticalRef.current.style.filter = "url(#filter-noise-y)";
          }
        },
        onUpdate: () => {
          filterXRef.current?.setAttribute("baseFrequency", String(primitiveValues.turbulence));
          filterYRef.current?.setAttribute("baseFrequency", String(primitiveValues.turbulence));
        },
        onComplete: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = "none";
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = "none";
        },
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: "power1",
        startAt: { turbulence: 1 },
        turbulence: 0,
      });

    const enter = () => tl.restart();
    const leave = () => tl.progress(1).kill();

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key of Object.keys(renderedStyles) as ("tx" | "ty")[]) {
        renderedStyles[key].previous = lerp(
          renderedStyles[key].previous,
          renderedStyles[key].current,
          renderedStyles[key].amt,
        );
      }

      gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
      gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });

      requestAnimationFrame(render);
    };

    const links = containerRef?.current
      ? containerRef.current.querySelectorAll("a")
      : document.querySelectorAll("a");

    for (const link of links) {
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
    }

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
      target.removeEventListener("mousemove", onMouseMove);
      for (const link of links) {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      }
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className={`${
        containerRef ? "absolute" : "fixed"
      } top-0 left-0 w-full h-full pointer-events-none z-[10000]`}
    >
      <svg className="absolute top-0 left-0 w-full h-full" aria-hidden="true">
        <title>Crosshair</title>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        className="absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2"
        style={{ background: color }}
      />
      <div
        ref={lineVerticalRef}
        className="absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2"
        style={{ background: color }}
      />
    </div>
  );
};

export default Crosshair;
