const API_URL: string = "http://localhost:5000";

export class User {
  id: number;
  name: string;
  uri: string;
  email: string;
  uris: UriMap;
  companyId: number;

  constructor(name: string, uri: string, email: string, uris: UriMap) {
    this.id = parseInt(uri.split("/").pop());
    this.name = name;
    this.uri = uri;
    this.email = email;
    this.uris = uris;
    this.companyId = parseInt(uris["company"].split("/").pop());
  }
}

type UriMap = { [key: string]: string };

type PartialUser = {
  name: string;
  uri: string;
  email: string;
  uris: UriMap;
};

export async function fetchUsers(): Promise<User[]> {
  console.debug("Fetching user data");

  const res = await fetch(`${API_URL}/users`);
  const data: PartialUser[] = await res.json();

  return data.map(
    (partial) =>
      new User(partial.name, partial.uri, partial.email, partial.uris)
  );
}
