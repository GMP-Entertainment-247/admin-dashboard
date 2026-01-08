import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useEffect } from "react";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  // data,
  // setDisplayData,
  // backendPaginated, //optional
  totalPages, //optional
}: any) {
  // const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  useEffect(() => {
    // const endOffset = itemOffset + itemsPerPage;
    // setDisplayData(data?.slice(itemOffset, endOffset) || []);
    setPageCount(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // itemOffset,
    itemsPerPage,
    // data
  ]);

  const handlePageClick = (event: any) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRightIcon className="text-[#212121] w-7" />}
      //   initialPage={Math.min(Math.max(Number(page) - 1, 0), pageCount - 1)}
      forcePage={Math.min(Math.max(Number(page) - 1, 0), pageCount - 1)}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount || 1}
      previousLabel={<ChevronLeftIcon className="text-[#212121] w-7" />}
      renderOnZeroPageCount={null}
      containerClassName="flex items-center justify-center text-sm list-none w-full"
      pageLinkClassName="p-2 font-normal cursor-pointer text-[#212121]"
      pageClassName="w-8 rounded-[4px] flex justify-center"
      previousClassName="mr-6"
      nextClassName="ml-6"
      nextLinkClassName="mt-2.5"
      breakLinkClassName="p-2"
      activeClassName="bg-primary"
      activeLinkClassName="text-white"
    />
  );
}
