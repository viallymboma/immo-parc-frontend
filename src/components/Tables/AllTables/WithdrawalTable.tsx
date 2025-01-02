"use client";
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  TransactionType,
} from '@/components/common/backbone/other_component/data';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from '@/components/svgs/SvgIcons';
import { capitalize } from '@/utility/upperCaseFunction';
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import {
  columnsRecharges,
  statusOptions,
} from './tableData';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "amount", "createdAt", "type",
  // "phone_number",  
  "status", "actions"
];

// type Recharge = typeof recharges[0];

type TableRechargeType = {
  allWithdrawalTransactionsData: TransactionType []; 
  isValidatingWithdrawalData?: boolean;
}

const WithdrawalTable: React.FC <TableRechargeType> = ({ allWithdrawalTransactionsData, isValidatingWithdrawalData }) => {
  const allWithdrawalTransactionsInStore = allWithdrawalTransactionsData?.map((fund: TransactionType) => {
    return {
      ...fund, 
      phone_number: fund?.user?.phone, 
      walletBallance: fund?.walletId?.balance, 
      walletId: fund?.walletId?._id
    }
  })
  const [filterValue, setFilterValue] = React.useState<any>(null);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const router = useRouter ()

  const pages = Math.ceil(allWithdrawalTransactionsInStore?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsRecharges;

    return columnsRecharges.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRecharges = [...allWithdrawalTransactionsInStore];

    if (hasSearchFilter) {
      filteredRecharges = filteredRecharges.filter((recharge) =>{
        const filterValueAsNumber = Number(filterValue); // Convert to number
        return recharge.type.toLowerCase().includes(filterValue.toLowerCase()) ||
          (filterValueAsNumber && recharge.amount === filterValueAsNumber) // Compare numbers only if conversion is valid
      });
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredRecharges = filteredRecharges.filter((recharge) =>
        Array.from(statusFilter).includes(recharge.status),
      );
    }

    return filteredRecharges;
  }, [allWithdrawalTransactionsInStore, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems: any = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof TransactionType] as number;
      const second = b[sortDescriptor.column as keyof TransactionType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell: any = React.useCallback((recharge: TransactionType, columnKey: React.Key) => {
    const cellValue = recharge[columnKey as keyof TransactionType];

    switch (columnKey) {
      case "amount":
        let formattedNumber = cellValue?.toLocaleString('cm-CM', {
          style: 'currency',
          currency: 'XAF',
        });
        const formattedAmount = formattedNumber?.replace("FCFA", "").replace(",", " ").trim() + " FCFA";
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-500">{ formattedAmount }</p>
          </div>
        );
      
      // case "operator":
      //   return (
      //     <User
      //       // avatarProps={{radius: "full", size: "sm", src: user.avatar}}
      //       classNames={{
      //         description: "text-default-500",
      //       }}
      //       description={recharge.service}
      //       name={cellValue}
      //     >
      //       {recharge.operator}
      //     </User>
      //   );
      // case "service":
      //   return (
      //     <div className="flex flex-col">
      //       {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
      //       <p className="text-bold text-tiny capitalize text-default-500">{recharge.service}</p>
      //     </div>
      //   );
      
      case "type":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-500">{recharge.type}</p>
          </div>
        );

      case "createdAt":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-500">{recharge.createdAt}</p>
          </div>
        );

      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[recharge.status]}
            size="sm"
            variant="dot"
          >
            {recharge.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <span>View</span>
                <span>Edit</span>
                <span>Delete</span>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg-flex-row justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex flex-col lg:flex-row gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsRecharges.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Link
              href={"/backoffice/transactions/withdrawals/add"}

              // onClick={() => {
              //   router.push("/backoffice/financial-accounts")
              // }}
              className="bg-foreground flex flex-row text-background p-2 rounded-xl"
              // endContent={<PlusIcon />}
              // size="sm"
            >
              <PlusIcon />
              Faire un retait
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {allWithdrawalTransactionsInStore?.length} recharges</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    allWithdrawalTransactionsInStore?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl", "overflow-x-auto"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <div className='overflow-x-auto mb-[10rem]' >
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No withdrawals found"} loadingContent={ isValidatingWithdrawalData ? <LoadingSpinner /> : null } items={sortedItems}>
          {(item: TransactionType) => (
            <TableRow key={item._id}>
              {(columnKey: React.Key) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default WithdrawalTable; 
