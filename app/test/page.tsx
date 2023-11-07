"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";

//这段代码有很大的bug，不想用react写这个可视化了，太无语了
function randomLetters(): string[] {
  return d3
    .shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort();
}

const D3_Join: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (svgRef.current === null) return;
    const svg = d3.select(svgRef.current);

    const updateLetters = () => {
      const t = d3.transition().duration(750);
      const text = svg
        .selectAll<SVGTextElement, string>("text")
        .data(randomLetters(), (d) => d);

      text
        .enter()
        .append("text")
        .attr("fill", "green")
        .attr("y", 0)
        .style("fill-opacity", 0)
        .attr("x", (d, i) => i * 26)
        .text((d) => d)
        .transition(t)
        .attr("y", 30)
        .style("fill-opacity", 1);

      text
        .attr("fill", "#555")
        .transition(t)
        .attr("x", (d, i) => i * 26);

      text
        .exit()
        .attr("fill", "red")
        .transition(t)
        .attr("y", 30)
        .style("fill-opacity", 60)
        .remove();
    };
    updateLetters();
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <svg ref={svgRef} width={500} height={250} className="bg-red-200"></svg>
      <Button size={"lg"} onClick={()=>setCount(count+1)}>
        count+1
      </Button>
    </div>
  );
};

export default D3_Join;
