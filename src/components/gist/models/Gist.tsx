export interface Owner {
  login: string;
  avatar_url: string;
}

export interface ForkUser {
  owner: Owner;
}

export interface Gist {
  files: { [key: string]: any };
  forks_url: string;
  description: string;
}
