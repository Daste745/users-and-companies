import { User } from "./user";

const API_URL: string = "http://localhost:5000";

export class Company {
  id: number;
  name: string;
  uri: string;
  readonly users: User[];

  constructor(name: string, uri: string) {
    this.id = parseInt(uri.split("/").pop());
    this.name = name;
    this.uri = uri;
    this.users = [];
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}

type PartialCompany = { name: string; uri: string };

export async function fetchCompanies(): Promise<Company[]> {
  console.debug("Fetching company data");

  const res = await fetch(`${API_URL}/companies`);
  const data: PartialCompany[] = await res.json();

  return data.map((partial) => new Company(partial.name, partial.uri));
}
