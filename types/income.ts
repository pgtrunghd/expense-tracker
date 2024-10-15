type Income = {
  id: string;
  description: string;
  amount: number;
  createDate: Date;
};

type CreateIncome = {
  description: string;
  amount: number;
  createDate: Date;
};

type AllIncome = {
  data: Income[];
  meta: Meta;
};
