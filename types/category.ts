interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  expenses: Expense[];
  incomes: Income[];
}

interface AllCategory {
  data: Category[];
  meta: Meta;
}
