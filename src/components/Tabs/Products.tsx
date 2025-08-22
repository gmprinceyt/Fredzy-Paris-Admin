import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/small/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useCallback,useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../small/ErrorUI";
import ProductSkeleton from "../small/ProductSkeleton";
import { ApiFunctions } from "@/Apis/Apis";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "@/hooks/Debounce";

const Product = () => {
  const [priceRange, setPriceRange] = useState([1000000]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const price = useDebounce(priceRange[0], 500);

  // get All Search Products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "search-product",
      { category, page, price, search, sort },
    ],
    queryFn: () =>
      ApiFunctions.SearchProduct({
        category,
        page,
        price: priceRange[0],
        search,
        sort,
      }),
    placeholderData: keepPreviousData,
  });
  if (isError) return <ErrorMessage ErrorMessage={error.message} />;

  // Get All Categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: ApiFunctions.Categories,
  });

  const products = data?.data.products;

  const SearchDebounce = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        setSearch(e.target.value);
      }, 300);
    },
    [setSearch]
  );
  return (
    <div className="flex flex-col md:flex-row gap-2 relative  m-auto max-w-[1280px] px-3 font-[Geist]">
      {/* Filterr Section */}
      <section className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Aduit Products
        </h1>

        <div className="my-2 ">
          <Link to="/addproduct">
            {" "}
            <Button className="w-full">
              Create <Plus />{" "}
            </Button>
          </Link>
        </div>
        <div className="my-2 ">
          <h4 className="  font-semibold ">Keyword</h4>
          <Input
            onChange={SearchDebounce}
            type="text"
            placeholder="Product keyword or name.."
          />
        </div>

        <div className="flex flex-wrap md:inline-block gap-3 items-center">
          <div className="">
            <h4 className="   font-semibold ">Sort</h4>
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Price</SelectLabel>
                  <SelectItem value="asc">Low-High</SelectItem>
                  <SelectItem value="dsc">High-Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="  font-semibold ">Category</h4>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">ALL</SelectItem>
                  {categories?.data.data.map((category, i) => {
                    return (
                      <SelectItem key={i} value={category}>
                        {category.toUpperCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-44">
            <h4 className="font-semibold ">Price Range</h4>

            <Slider
              onValueChange={setPriceRange}
              defaultValue={priceRange}
              max={1000000}
              min={1000}
              step={1000}
            />
            <Badge className="mt-1 rounded-md  text-sm ">
              100 - {priceRange}
            </Badge>
          </div>
        </div>
      </section>

      {/* Main product Section */}
      {isLoading && products?.length == 0 ? (
        <ProductSkeleton />
      ) : (
        <section className="">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-2">
            {isLoading ? (
              <>
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </>
            ) : (
              products?.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    productId={product._id}
                    photo={product.photo}
                    discription={product.discription}
                    category={product.category}
                  />
                );
              })
            )}
          </div>

          <Pagination className="">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page === 1) return;
                    setpage((page) => page - 1);
                  }}
                />
              </PaginationItem>

              {Array.from(
                { length: data?.data.pageLength || 1 },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setpage(pageNumber)}
                    className={
                      pageNumber === page
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page === data?.data.pageLength) return;
                    setpage((page) => page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      )}
    </div>
  );
};

export default Product;
