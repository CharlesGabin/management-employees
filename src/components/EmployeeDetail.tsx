import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Employee } from "../lib/utils";

type EmployeeDetailProps = {
  employees: Employee[] | null;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[] | null>>;
};

const EmployeeDetail = ({ employees, setEmployees }: EmployeeDetailProps) => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);

  const { id } = useParams();

  const handleEditClick = () => {
    navigate(`/addEmployee`, { state: { employee } });
  };

  const deleteEmployee = async (id: number) => {
    try {
      await axios.delete(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      if (employees) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployee = (id: number) => {
    axios
      .get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
      .then((response) => {
        response.data;
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmployee(Number(id));
  }, [id]);

  return (
    <div className="flex relative justify-center items-center w-full h-full bg-white">
      <Button className="absolute top-2 left-2" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
      </Button>
      <div className="flex flex-col gap-2 justify-center items-center p-8 m-auto w-1/3 rounded-lg shadow-lg">
        <img
          src={employee?.avatar}
          alt="Employee Image"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold">{employee?.name}</h1>
        <div className="flex flex-col gap-4 items-start">
          <p className="text-sm"> ID: {id}</p>
          <p className="text-sm">Email: {employee?.emailId}</p>
          <p className="text-sm">Mobile: {employee?.mobile}</p>
          <p className="text-sm">Country: {employee?.country}</p>
          <p className="text-sm">State: {employee?.state}</p>
          <p className="text-sm">District: {employee?.district}</p>
        </div>

        <div className="flex gap-8 items-center my-4">
          <Button
            className="inline-flex gap-2 items-center bg-red-500 hover:bg-red-700"
            onClick={() => {
              if (employee) deleteEmployee(employee.id);
            }}
          >
            <Trash2 size={20} />
          </Button>
          <Button
            className="inline-flex gap-2 items-center bg-blue-500 hover:bg-blue-700"
            onClick={handleEditClick}
          >
            <Pencil size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
