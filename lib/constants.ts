export const apiRoutes = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
  },
  USER: {
    REGISTER: "/user/register",
  },
  EXPENSE: "/expense",
  RECENT_ACTIVITY: "/expense/recent-activity",
  CATEGORY: "/category",
  INCOME: "/income",
  BALANCE: {
    OVERVIEW: "/balance/overview",
    INDEX: "/balance",
  },
  BUDGET: "/budget",
};

export const notification = {
  CREATE_SUCCESS: "Tạo mới thành công",
  UPDATE_SUCCESS: "Cập nhật thành công",
  DELETE_SUCCESS: "Xóa thành công",
};

export const formatDate = "dd/MM/yyyy";

export const titlePage = {
  dashboard: "Tổng quan",
  transaction: "Giao dịch",
  expense: "Chi tiêu",
  income: "Thu nhập",
  category: "Danh mục",
  budget: "Ngân sách",
};

export enum BudgetCycle {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}
