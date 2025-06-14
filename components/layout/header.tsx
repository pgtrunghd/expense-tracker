"use client";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/month-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { balanceSlice } from "@/features/balance.slice";
import { changeDate } from "@/features/global.slice";
import { RootState } from "@/store";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.global);

  const signOut = () => {
    localStorage.removeItem("user");
    dispatch(balanceSlice.util.resetApiState());
    router.push("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger variant="outline" className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        {/* <div className="flex h-8 items-center gap-2 rounded-lg border px-3 text-xs shadow md:text-sm">
          <p>Số dư:</p>
          <p className="font-semibold">
            {formatter.format(overviewData?.balance ?? 0)}
          </p>
        </div> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 size-4" />
              {date ? formatDate(date, "MMMM yyyy") : <span>Pick a month</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <MonthPicker
              onMonthSelect={(value) => {
                dispatch(changeDate(value.toISOString()));
              }}
              selectedMonth={new Date(date)}
              maxDate={new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
