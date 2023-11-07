import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-indigo-200">
      <h2 className=" text-3xl text-indigo-500 font-bold">数据结构可视化</h2>
      <div>
        <ul className="space-y-2">
          <li>
            <Link href="/ds-vis/linkedlist">
              <Button size={"lg"}>链表可视化</Button>
            </Link>
          </li>
          <li>
            <Link href="/ds-vis/array">
              <Button size={"lg"}>数组可视化</Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
