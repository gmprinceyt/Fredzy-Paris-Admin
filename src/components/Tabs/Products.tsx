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
import { useCallback, useRef, useState } from "react";
import { Badge } from "../ui/badge";
// import ProductSkeleton from "../small/ProductSkeleton";

const Product = () => {
  const [priceRange, setPriceRange] = useState([100000]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  console.log(priceRange, page, sort, category, search);

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
    <div className="flex flex-col md:flex-row gap-2  m-auto max-w-[1280px] px-3 font-[Geist]">
      {/* Filterr Section */}
      <section className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Aduit Products
        </h1>

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
                  <SelectItem value="asc">low-high</SelectItem>
                  <SelectItem value="dsc">high-low</SelectItem>
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
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>

                  {/* {categories?.data.map((category, i) => {
                    return (
                      <SelectItem key={i} value={category}>
                        {category.toLowerCase()}
                      </SelectItem>
                    );
                  })} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-44">
            <h4 className="font-semibold ">Price Range</h4>

            <Slider
              onValueChange={setPriceRange}
              defaultValue={priceRange}
              max={100000}
              min={1000}
              step={1}
            />
            <Badge className="mt-1 rounded-md  text-sm ">
              100 - {priceRange}
            </Badge>
          </div>
        </div>
      </section>

      {/* Main product Section */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-2">
          <ProductCard
            key={1}
            name={"Green Hibiscus Print One-Shoulder Co-Ord Set"}
            price={12800}
            stock={20}
            productId={"hello"}
            photo={
              "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww"
            }
            discription={`No. of Components - 2
Components - Tunic, Pants
Material - Tunic - Modal Satin; Pants - Pure Muslin
Hibiscus print asymmetric tunic
One shoulder neckline
Tie-up belt attached on the waist
Hand embroidery detailing on the border
Paired with a medium flared pants
Colour - Bottle Green `}
            category={"clothes"}
          />
          {/* {isLoading ? (
            <>
             <ProductSkeleton />
             <ProductSkeleton />
             <ProductSkeleton />
             <ProductSkeleton />
            </>
          ) : (
            products?.products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  rating={4.5}
                  stock={product.stock}
                  productId={product._id}
                  photo={product.photo}
                  discription={product.discription}
                  category={product.category}
                />
              );
            })
          )} */}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page === 1) return;
                  setpage((page) => page - 1);
                }}
              />
            </PaginationItem>

            {/* Render page links dynamically based on totalPages and page */}
            {Array.from({ length: 1 }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => setpage(pageNumber)}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  // if (page === products?.pageLength) return;
                  setpage((page) => page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default Product;
