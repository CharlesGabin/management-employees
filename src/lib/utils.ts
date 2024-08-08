import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

export type Employee = {
  id: number;
  name: string;
  avatar: string;
  emailId: string;
  mobile: number;
  country: string;
  state: string;
  district: string;
};

export const states = [
  {
    name: "Andhra Pradesh",
    code: "AP",
    districts: ["Anantapur", "Chittoor", "East Godavari"],
  },
  {
    name: "Arunachal Pradesh",
    code: "AR",
    districts: ["Tawang", "West Kameng", "East Kameng"],
  },
  {
    name: "Assam",
    code: "AS",
    districts: ["Baksa", "Barpeta", "Biswanath"],
  },
  {
    name: "Bihar",
    code: "BR",
    districts: ["Araria", "Arwal", "Aurangabad"],
  },
  {
    name: "Chhattisgarh",
    code: "CT",
    districts: ["Balod", "Baloda Bazar", "Balrampur"],
  },
];
