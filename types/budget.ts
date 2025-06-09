interface Budget {
  id: string;
  amount: number;
  startDate: string;
  endDate: string;
  cycle: string;
  isRecurring: boolean;
  createAt: string;
  updateAt: string;
  category: Category;
}

interface AllBudget {
  data: Budget[];
  meta: Meta;
}
