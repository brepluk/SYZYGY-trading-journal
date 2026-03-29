import { StatusCodes } from "http-status-codes";
import {
  fetchDashboardStats,
  fetchDashboardCalendar,
} from "../services/dashboardService.js";

export const getDashboardStats = async (req, res) => {
  const payload = await fetchDashboardStats(req.user.userId, req.query.range);
  res.status(StatusCodes.OK).json(payload);
};

export const getDashboardCalendar = async (req, res) => {
  const payload = await fetchDashboardCalendar(
    req.user.userId,
    req.query.year,
    req.query.month,
  );
  res.status(StatusCodes.OK).json(payload);
};
