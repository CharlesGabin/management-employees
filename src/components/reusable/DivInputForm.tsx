import { ChangeEvent, useEffect, useState } from "react";
import { COUNTRIES_URL } from "../../lib/utils";
import axios from "axios";

const DivInputForm = ({
  labelName,
  type,
  onChange,
  value,
}: {
  labelName: string;
  type: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  value: string;
}) => {
  const [countries, setCountries] = useState([]);

  const getCountriesName = () => {
    axios
      .get(COUNTRIES_URL)
      .then((response) => {
        console.log(response.data);
        const sortedData = response.data.sort(
          (a: { name: { common: string } }, b: { name: { common: string } }) =>
            a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (type === "option") {
      getCountriesName();
    }
  }, []);

  return (
    <div className="inline-flex gap-2 items-center">
      <label
        htmlFor={labelName.toLowerCase()}
        className="w-[100px] items-start inline-flex"
      >
        {labelName}
      </label>
      {type === "option" ? (
        <select
          name={labelName.toLowerCase()}
          id={labelName.toLowerCase()}
          className="p-2 w-full rounded-md border-2 border-black"
          // placeholder={`Enter ${labelName.toLowerCase()}`}
          required
          onChange={onChange}
          value={value}
        >
          {countries
            ? countries.map((country: { name: { common: string } }) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))
            : null}
        </select>
      ) : (
        <input
          type={type}
          name={labelName.toLowerCase()}
          id={labelName.toLowerCase()}
          className="p-2 w-full rounded-md border-2 border-black"
          placeholder={`Enter ${labelName.toLowerCase()}`}
          required
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default DivInputForm;
