import React from "react";
import BillBoardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillboarPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storedId: params.storeId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default BillboarPage;
