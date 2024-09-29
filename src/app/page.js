import Sidebar from "./components/sidebar/page";
import "./globals.css";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" flex flex-col p-4 sm:ml-64">
        <div className="text-4xl font-bold text-indigo-950">
          Bem vindo a sua
        </div>
        <div>
          <div className="text-4xl font-bold text-indigo-950">
            biblioteca de filmes!
          </div>
        </div>
      </div>
    </div>
  );
}
