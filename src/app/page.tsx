import Tabs from "@/app/components/list/Tabs";
import NameInput from "@/app/components/list/NameInput";
import NameList from "@/app/components/list/NameList";

const Home = async () => {
  const fetchNames = async () => {
    const res = await fetch(`${process.env.APP_URI}/api/names`, {
      method: 'GET',
    })
    return res.json();
  }
  const names = await fetchNames();

  return (
      <main className="container mx-auto p-6 min-h-screen max-w-[840px]">
        <Tabs/>
        <NameInput />
        <NameList items={names}/>
      </main>
  );
}

export default Home;
