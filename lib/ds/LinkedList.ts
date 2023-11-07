import { v4 as uuidv4 } from "uuid";
export class ListNode {
  id: string;
  value: number;
  next: ListNode | null;
  constructor(value: number,id?:string) {
    if(id!==undefined&&id!==null) this.id = id;
    else this.id = uuidv4();
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: ListNode | null;
  constructor() {
    this.head = null;
  }

  append(value: number,id?:string): void {
    if (!this.head) {
      this.head = new ListNode(value,id);
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(value,id);
    }
  }
  toArray():ListNode[]{
    const nodes: ListNode[] = [];
    let current = this.head;
    while(current){
        nodes.push(current);
        current=current.next;
    }
    return nodes;
  }
}
