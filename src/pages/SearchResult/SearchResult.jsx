import { useEffect, useState } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { searchAPI } from '../../api/userAPI';
import { useLocation } from 'react-router-dom';
import ItemCard from '../../components/ui/Item.card';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';

const priceRanges = [
    { label: '1 triệu - 4 triệu', min: 1_000_000, max: 4_999_000 },
    { label: '5 triệu - 9 triệu', min: 5_000_000, max: 9_999_000 },
    { label: '10 triệu - 15 triệu', min: 10_000_000, max: 15_999_000 },
    { label: '16 triệu - 20 triệu', min: 16_000_000, max: 20_999_000 },
    { label: 'trên 21 triệu ', min: 21_000_000, max: Infinity },
];

function SearchResult() {
    const [searchResult, setSearchResult] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalEquipment, setTotalEquipment] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [priceRange, setPriceRange] = useState(null);

    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const keyword = query.get('search');

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const sortByPriceAsc = (arr) => {
        return [...arr].sort((a, b) => a.price - b.price);
    };

    const sortByPriceDesc = (arr) => {
        return [...arr].sort((a, b) => b.price - a.price);
    };

    const handlePriceRangeFilter = (min, max) => {
        setPriceRange({ min, max });
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const removeFilter = () => {
        setPriceRange(null);
        setSortBy('');
        setCurrentPage(1);
    };

    useEffect(() => {
        toast.success(`Tìm thấysản phẩm cho từ khóa "${keyword}"`);

        setCurrentPage(1);
    }, [keyword]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleSearch = async () => {
            try {
                const limit = 10;
                const res = await searchAPI(keyword, currentPage, limit);

                if (res.data) {
                    let filteredResults = res.data.equipment;

                    // Apply price range filter if selected
                    if (priceRange) {
                        filteredResults = filteredResults.filter(
                            (item) => item.price >= priceRange.min && item.price <= priceRange.max,
                        );
                    }

                    setSearchResult(filteredResults);
                    setTotalPage(res.data.totalPages);
                    setTotalEquipment(res.data.total);
                }
            } catch (error) {
                console.log(error);
            }
        };
        handleSearch();
    }, [keyword, currentPage, priceRange]);

    return (
        <div className="container">
            <div className="bg-white mt-6 border rounded-lg">
                <div className="flex p-4 border-gray-300 border-b">
                    <p className="flex-shrink-0 mr-6 w-fit font-semibold text-sm">Khoảng giá:</p>
                    <ul className="flex flex-wrap gap-4">
                        {priceRanges.map((range, index) => {
                            const isSelected = priceRange?.min === range.min && priceRange?.max === range.max;

                            return (
                                <li
                                    key={index}
                                    onClick={() => handlePriceRangeFilter(range.min, range.max)}
                                    className={`cursor-pointer rounded-lg border px-2 py-1 text-sm hover:shadow-inner hover:shadow-gray-400 ${
                                        isSelected ? 'bg-primary text-white' : 'bg-[#f8f8f8]'
                                    }`}
                                >
                                    {range.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex p-4">
                    <p className="flex-shrink-0 mr-6 w-fit font-semibold text-sm">Chọn theo tiêu chí:</p>
                    <ul className="flex flex-wrap gap-4"></ul>
                </div>
            </div>

            <div className="bg-white mt-6 p-4 border rounded-lg">
                {/* filter */}
                <div className="inline-flex gap-4 w-full">
                    <div
                        onClick={() => {
                            setSortBy('asc');
                            setSearchResult(sortByPriceAsc(searchResult));
                        }}
                        className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:shadow-inner hover:shadow-gray-400 ${sortBy === 'asc' ? 'bg-primary text-white' : ''}`}
                    >
                        <FaArrowTrendUp />
                        <p>Giá tăng dần</p>
                    </div>
                    <div
                        onClick={() => {
                            setSortBy('desc');
                            setSearchResult(sortByPriceDesc(searchResult));
                        }}
                        className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:shadow-inner hover:shadow-gray-400 ${sortBy === 'desc' ? 'bg-primary text-white' : ''}`}
                    >
                        <FaArrowTrendDown />
                        <p>Giá giảm dần</p>
                    </div>

                    <div
                        onClick={() => {
                            removeFilter();
                        }}
                        className="flex items-center gap-2 bg-[#f8f8f8] hover:shadow-gray-400 hover:shadow-inner px-[10px] py-2 border rounded-lg w-fit text-[#515151] text-sm cursor-pointer"
                    >
                        <p>Bỏ filter</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    {searchResult.length === 0 ? (
                        <img
                            src="https://grgarments.in/images/product-not-found.png"
                            alt=""
                            className="mx-auto w-[60%]"
                        />
                    ) : (
                        searchResult.map((item, index) => (
                            <ItemCard
                                key={index}
                                item={{
                                    id: item._id,
                                    urlImage: item.urlImage,
                                    best_seller: item.best_seller,
                                    name: item.name,
                                    price: item.price,
                                    discount: item.discount,
                                    countSold: item.sold_quantity ?? 0,
                                    sold_quantity: item.sold_quantity,
                                }}
                            />
                        ))
                    )}
                </div>
                <div className="justify-items-center mt-6">
                    <Pagination
                        current={currentPage}
                        total={totalPage}
                        defaultPageSize={1}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
