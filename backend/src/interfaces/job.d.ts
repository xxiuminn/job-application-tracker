interface CreateJob {
  title: string;
  description: string;
  url: string;
  salary: string;
  location: string;
  attachment: string[];
  list_id: number;
}

interface UpdateJob {
  id: number;
  title: string;
  description: string;
  url: string;
  salary: string;
  location: string;
  attachment: string[];
  listId: number;
}

interface DelJob {
  id: number;
}

export { CreateJob, UpdateJob, DelJob };
