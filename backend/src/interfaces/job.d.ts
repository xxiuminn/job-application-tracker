interface CreateJob {
  title: string;
  company: string;
  description: string;
  url: string;
  salary: string;
  location: string;
  attachment: string[];
  list_id: number;
}

interface UpdateJob {
  id: number;
  company: string;
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
