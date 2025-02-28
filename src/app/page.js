import { promises as fs } from "fs";
import JsonParser from "@/components/JsonParser";
import TypeStructure from "@/components/TypeStructure";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/src/data/input.json", "utf8");
  const data = JSON.parse(file);

  // return <TypeStructure data={data} />;
  return <JsonParser data={data} />;
}
