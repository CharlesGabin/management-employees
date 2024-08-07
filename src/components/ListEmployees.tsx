import { useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlus, Trash2 } from "lucide-react";
import { Employee } from "../lib/utils";

export type ListEmployeeProps = {
  employees: Employee[] | null;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
};

const ListEmployees = ({
  employees,
  setEmployees,
  setLoading,
  loading,
  error,
  setError,
}: ListEmployeeProps) => {
  const navigate = useNavigate();

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
      );
      console.log(response.data);
      setEmployees(response.data);
      setLoading(false);
    } catch (error: Error | any) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await axios.delete(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      if (employees) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleRowClick = (id: number) => {
    navigate(`/employee/${id}`);
  };

  if (loading)
    return <span className="m-auto loading loading-dots loading-sm"></span>;
  if (error) return <span className="text-red-500">{error.message}</span>;

  return (
    <div className="m-auto">
      <div>
        <h1 className="inline-flex text-3xl font-bold">List of Employees</h1>
      </div>

      <Button className="my-4">
        <Link to="/addEmployee" className="inline-flex gap-2 items-center">
          {" "}
          <CirclePlus size={16} />
          Add
        </Link>
      </Button>
      <div>
        <Table>
          <TableCaption>A list of your recent employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25 0px]">ID</TableHead>
              <TableHead className="w-[25 0px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow
                key={employee.id}
                onClick={() => handleRowClick(employee.id)}
              >
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.emailId}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell className="text-right">{employee.country}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="inline-flex gap-2 items-center px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListEmployees;
