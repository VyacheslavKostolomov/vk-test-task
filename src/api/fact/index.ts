import { IGetFactResponse } from "./fact.types";

async function getFact(): Promise<IGetFactResponse> {
  try {
    const response = await fetch('https://catfact.ninja/fact')
    if (!response.ok) {
      throw new Error('Что-то пошло не так...');
    }
    const text = await response.json();
    return text;
  } catch (error) {
    throw new Error('Что-то пошло не так...');
  }
}

export default getFact;