import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import useDebounce from "../../hooks/useDebounce";
import api from "../../api";
import { IFormData } from "../../types";
import "./styles.css";

const AgeForm = () => {
  const [age, setAge] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastSearchedValue, setLastSearchedValue] = useState<string>("");
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
    },
  });

  const submit = (data: IFormData) => {
    if (isValid && !isWaiting && data.name !== lastSearchedValue) {
      setIsWaiting(true);
      setLastSearchedValue(data.name);
      api
        .getAge(data.name)
        .then((response) => setAge(response.age))
        .catch((error) =>
          console.log("Что-то пошло не так! Попробуйте еще раз...", error)
        )
        .finally(() => setIsWaiting(false));
    }
  };

  const debouncedValue = useDebounce<string>(searchValue);

  useEffect(() => {
    if (isValid && !isWaiting && searchValue !== lastSearchedValue) {
      setIsWaiting(true);
      setLastSearchedValue(searchValue);
      api
        .getAge(searchValue)
        .then((response) => setAge(response.age))
        .catch((error) =>
          console.log("Что-то пошло не так! Попробуйте еще раз...", error)
        )
        .finally(() => setIsWaiting(false));
    }
  }, [debouncedValue]);

  return (
    <form className="age-form" onSubmit={handleSubmit(submit)}>
      <input
        className="age-form__input"
        type="text"
        placeholder="Введите имя"
        {...register("name", {
          required: "Нужно ввести имя...",
          pattern: /^[a-zA-Z]+$/,
          onChange: (e) => {
            if (isDirty && isValid) setSearchValue(e.target.value);
          },
        })}
      />
      <Button
        type="submit"
        size="l"
        loading={isWaiting}
        disabled={!isValid || searchValue === lastSearchedValue}
      >
        Узнать возраст
      </Button>
      <textarea
        className="age-form__textarea"
        defaultValue={age}
        rows={2}
        cols={15}
      />
    </form>
  );
};

export default AgeForm;
