import { useFilter } from "./FilterContext";
import { useEffect, useState} from "react";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";


const MainContent = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keywords } = useFilter();
    
    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 12;
    
    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

        if(keywords) {
                url = `https://dummyjson.com/products/search?q=${keywords}`;
            }

        axios.get(url).then((response) => {
            setProducts(response.data.products);
            console.log(response.data.products);
        }).catch((error) => {
            console.error("Error fetching error", error);
        });

    }, [currentPage, keywords]);

    const getFilteredProducts = () => {
        let filteredProducts = products;

        if(selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
        }

        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
        }

        if(maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
        }

        if(searchQuery) {
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        switch(filter) {
            case 'expensive':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'cheap':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'popular':
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts;
        }

    };
    
    const filteredProducts = getFilteredProducts();
    
    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if(page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationButtons = () => {
        const buttons: number[] = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage - 2 < 1) {
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
        }

        if (currentPage + 2 > totalPages) {
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
        }

        for(let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }

        return buttons;
    };


    console.log(filteredProducts);
    
    return <section className="xl:w-[55rem] lg:w[55rem] sm:w-[40rem] xs:w[20rem] p-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5 mt-5">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-cwenter">
                    <Tally3 className="mr-2" />

            {filter=== 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
                </button>

    {dropdownOpen && (
        <div className="absolute bg-white border border-gray 300 rounded mt-2 w-full sm:w-40">
            <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Cheap</button>
            <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Expensive</button>
            <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Popular</button>
        </div>
            )}
        </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
                <BookCard id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
                ))}
                
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 rounded-full mr-2">Previous</button>
            <div className="flex flex-wrap justify-center">
                {getPaginationButtons().map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? 'bg-black text-white' : ''}`}>{page}</button>
                ))}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 rounded-full mr-2">Next</button>
        </div>   
    </section>
};

export default MainContent;