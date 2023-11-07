"use client";
import LinkedListVisualizer from "@/components/ds/linkedlist-vis";
import { Button } from "@/components/ui/button";
import {LinkedList,ListNode} from "@/lib/ds/LinkedList";
import { useState } from "react";

const LinkedListVisPage = () => {
  const [list, setList] = useState(new LinkedList());
  const [newValue, setNewValue] = useState(0);

  const handleAddNode = () => {
    const newList = new LinkedList();

    let current = list.head;

    while (current) {
      newList.append(current.value,current.id);
      current = current.next;
    }
    //添加新节点
    newList.append(newValue);

    //更新状态
    setList(newList);
  };
  const handleRemoveNode = () => {
    if (!list.head) return; // 如果链表为空，则直接返回

    const newList = new LinkedList();
    let current = list.head;

    while (current!==null) {
      if (current.value !== newValue) {
        newList.append(current.value,current.id);
      }
      current = current.next;
    }

    // 更新状态
    setList(newList);
  };
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewValue(Number(e.target.value));
  }

  return (
    <div>
      <input type="number" value={newValue} onChange={handleInputChange} />
      <Button onClick={handleAddNode}>添加节点</Button>
      <Button onClick={handleRemoveNode}>删除节点</Button>
      <LinkedListVisualizer linkedList={list} />
    </div>
  );
};

export default LinkedListVisPage;
