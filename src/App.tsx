import ListEmployees from "./components/pages/ListEmployees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/pages/AddEmployee";
import EmployeeDetail from "./components/pages/EmployeeDetail";

function App() {
  return (
    <main className="flex w-full h-screen gap-2 p-4 m-auto bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListEmployees />}></Route>
          <Route path="employee/:id" element={<EmployeeDetail />} />
          <Route path="addEmployee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
