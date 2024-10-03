import Tabs from "@/app/components/list/Tabs";
import Image from "next/image";
import NameGenerator from "@/app/components/generator/NameGenerator";

const Home = async () => {

  return (
    <main className="flex flex-col container mx-auto p-6 min-h-screen max-w-[840px]">
      <Tabs/>
      <div className={"flex flex-col gap-10 w-full flex-grow justify-center"}>
        <h1 className={"text-2xl self-center"}>AI가 말아주는 카더가든 작명소</h1>
        <Image src={"/images/kinderjoy.png"} alt={"칼든강도"} width={160} height={160} className={"self-center"} />
        <NameGenerator />
      </div>
    </main>
  );
}

export default Home;

