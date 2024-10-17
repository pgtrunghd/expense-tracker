interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  createDate: Date;
}

interface RecentActivity {
  id: string;
  description: string;
  amount: number;
  createDate: string;
  type: string;
}
