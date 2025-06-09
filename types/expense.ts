interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  createDate: Date;
}

interface RecentActivityData {
  id: string;
  description: string;
  amount: number;
  createDate: string;
  type: string;
  category?: Category;
}

interface RecentActivity {
  data: RecentActivityData[];
  meta: Meta;
}
