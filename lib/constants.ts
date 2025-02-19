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
};

export const notification = {
  CREATE_SUCCESS: "Tạo mới thành công",
  UPDATE_SUCCESS: "Cập nhật thành công",
  DELETE_SUCCESS: "Xóa thành công",
};

export const formatDate = "dd/MM/yyyy";
