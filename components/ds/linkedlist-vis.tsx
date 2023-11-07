import {LinkedList,ListNode} from "@/lib/ds/LinkedList";
import * as d3 from "d3";
import { useEffect, useRef } from "react";


interface LinkedListVisualizerProps {
  linkedList: LinkedList;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  linkedList,
}: LinkedListVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!linkedList.head) return;

    const nodes = linkedList.toArray();
    const svg = d3.select(svgRef.current);

    const updateNodes = svg.selectAll<SVGSVGElement,ListNode>(".node").data(nodes,(d)=>d.id);
    const enterNodes = updateNodes.enter();
    const exitNodes = updateNodes.exit();
    //绘制节点
    const nodeSelection = enterNodes.append("g").attr("class", "node");

    const t = d3.transition().duration(750);
    // 添加圆形来表示节点
    nodeSelection
      .append("circle")
      .attr("r", 0)
      .attr("cx", (d, i) => 50 + i * 100)
      .attr("cy", 50)
      .transition(t)
      .attr("r", 20);

    // 添加文本来显示节点值
    nodeSelection
      .append("text")
      .text((d) => d.value)
      .attr("x", (d, i) => 50 + i * 100)
      .attr("y", 50)
      .style("fill", "white")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "middle")
      .style("fill-opacity", 0)
      .transition(t)
      .style("fill-opacity", 1);

    const updateNodeSelection = updateNodes.append("g").attr("class","node");
    updateNodeSelection.append("circle").transition(t).attr("x",(d, i) => 50 + i * 100);

    exitNodes
      .attr("fill", "red")
      .transition(t)
      .style("fill-opacity", 0) // 使节点逐渐透明
      .attr("r", 0) // 圆形半径逐渐减小至0
      .remove(); // 动画结束后移除节点

    // 绘制连接线
    interface Link {
      source: [number, number];
      target: [number, number];
    }
    const links: Link[] = nodes.slice(1).map((d, i) => {
      return {
        source: [50 + i * 100 + 20, 50], // 当前节点的位置
        target: [50 + (i + 1) * 100 - 20, 50], // 下一个节点的位置
      };
    });

    const lineGenerator = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1]);

    const updateLinks = svg.selectAll(".link").data(links);
    const enterLinks = updateLinks.enter();
    const exitLinks = updateLinks.exit();

    enterLinks
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return lineGenerator([d.source, d.target]);
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .style("stroke-opacity", 0) // 初始透明度为0
      .transition(t)
      .style("stroke-opacity", 1); // 动画结束时透明度为1

    exitLinks
      .attr("stroke", "red")
      .transition(t)
      .style("stroke-opacity", 0) // 使线逐渐透明
      .remove(); // 动画结束后移除线段
  }, [linkedList]);

  return <svg ref={svgRef} width={500} height={100}></svg>;
};

export default LinkedListVisualizer;
