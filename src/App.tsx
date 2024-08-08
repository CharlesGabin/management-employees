import { useState } from "react";
import "./App.css";
import ListEmployees from "./components/ListEmployees";
// import { Employee } from "./lib/utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetail from "./components/EmployeeDetail";
import { Employee } from "./lib/utils";

function App() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  return (
    <main className="flex w-full h-full gap-2">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ListEmployees
                employees={employees}
                setEmployees={setEmployees}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          ></Route>
          <Route
            path="employee/:id"
            element={
              <EmployeeDetail
                employees={employees}
                setEmployees={setEmployees}
              />
            }
          />
          <Route path="addEmployee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
