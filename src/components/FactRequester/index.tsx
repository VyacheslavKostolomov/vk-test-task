import { useEffect, useState } from "react";
import api from "../../api";
import { Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./styles.css";

const FactRequester = () => {
  const [factResult, setFactResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsLoading(true);
    api
      .getFact()
      .then((response) => setFactResult(response.fact))
      .catch((error) =>
        console.log("Что-то пошло не так! Попробуйте еще раз...", error)
      )
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    const splittedFactArray = factResult.split(" ");
    textarea.focus();
    textarea.setSelectionRange(
      splittedFactArray[0].length,
      splittedFactArray[0].length
    );
  }, [factResult]);

  return (
    <div className="fact-requester">
      <textarea
        id="textarea"
        className="fact-requester__textarea"
        rows={15}
        cols={35}
        defaultValue={factResult}
      />
      <Button size="l" loading={isLoading} onClick={handleOnClick}>
        Узнать интересный факт
      </Button>
    </div>
  );
};

export default FactRequester;
