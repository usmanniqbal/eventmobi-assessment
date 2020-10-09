import Axios from "axios";
import { ForkUser, Gist } from "./models/Gist";

export class GistService {
  async getGistDataByUsername(username: string, page: number): Promise<Gist[]> {
    try {
      return (await Axios.get(`https://api.github.com/users/${username}/gists?per_page=10&page=${page}`, {
      })).data as Gist[];
    } catch (e) {
      if (e.response.status === 404) {
        return [];
      } else {
        throw e;
      }
    }
  }

  async getForkUsersDataByUrl(url: string): Promise<ForkUser[]> {
    try {
      return (await Axios.get(url)).data;
    }
    catch (e) {
      if (e.response.status === 404) {
        return [];
      }
      else {
        throw e;
      }
    }
  }
}
