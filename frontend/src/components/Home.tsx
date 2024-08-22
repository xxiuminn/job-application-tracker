import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Methods } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const fetchData = useFetch();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["login"],
    queryFn: async () =>
      await fetchData(
        "/auth/login",
        Methods.POST,
        {
          email,
          password,
        },
        undefined
      ),
    enabled: isLogin,
  }) as { data: { access: string } };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLogin(true);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setIsLogin(false);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.access);
      navigate("/board");
    }
  }, [data]);

  return (
    <div className="bg-stone-400 min-h-screen min-w-screen overflow-hidden grid md:grid-cols-2 ">
      <div className="bg-cyan-600 p-12">
        <h1 className="text-center text-red-200">
          <span className=" font-fraunces font-medium text-3xl">
            Ditch Your Excel Sheet
          </span>
          <br />
          <span className="font-epilogue font-light text-xl">
            and track your job applications with ease.
          </span>
        </h1>
      </div>
      <div className="bg-cyan-950 flex flex-col text-xl text-red-200 font-light p-12">
        <h2 className="font-fraunces font-medium text-3xl text-red-200 text-center mb-10">
          Welcome Back!
        </h2>
        <form
          className="flex flex-col justify-center content-center px-28 gap-5"
          onSubmit={handleLogin}
        >
          <div className="flex flex-row justify-between">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="rounded-lg px-4 py-1 text-black"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="rounded-lg px-4 py-1 text-black"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <button className="rounded-lg px-4 py-1 bg-cyan-600" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
