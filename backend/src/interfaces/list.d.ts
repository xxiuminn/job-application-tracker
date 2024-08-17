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

interface GetList {
  user_id: string;
}

export { CreateList, UpdateList, DelList, GetList };
