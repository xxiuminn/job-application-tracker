interface CreateList {
  title: string;
  user_id: string;
}

interface UpdateList {
  title: string;
  id: number;
}

interface DelList {
  id: number;
}

export { CreateList, UpdateList, DelList };
