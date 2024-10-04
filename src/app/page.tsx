import Tabs from "@/app/components/list/Tabs";
import NameInput from "@/app/components/list/NameInput";
import NameList from "@/app/components/list/NameList";

const Home = async () => {
  return (
    <main className="container mx-auto min-h-screen max-w-[840px] p-6">
      <Tabs />
      <NameInput />
      <NameList />
    </main>
  );
};

export default Home;
