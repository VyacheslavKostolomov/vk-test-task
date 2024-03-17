import { IGetAgeResponse } from "./age.types";

async function getAge(name: string): Promise<IGetAgeResponse> {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`)
    if (!response.ok) {
      throw new Error('Что-то пошло не так...');
    }
    const age = await response.json();
    return age;
  } catch (error) {
    throw new Error('Что-то пошло не так...');
  }
}

export default getAge;