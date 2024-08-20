// import Board from "./components/Board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
        {/* <Board /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
