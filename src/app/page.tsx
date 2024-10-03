import Tabs from "@/app/components/list/Tabs";
import NameInput from "@/app/components/list/NameInput";
import NameList from "@/app/components/list/NameList";

const Home = async () => {

  return (
      <main className="container mx-auto p-6 min-h-screen max-w-[840px]">
        <Tabs/>
        <NameInput />
        <NameList />
      </main>
  );
}

export default Home;
