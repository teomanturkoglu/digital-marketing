import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    minPrice: number | undefined;
    setMinPrice: (price: number | undefined) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined) => void;
    keywords: string;
    setKeywords: (keywords: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
    const [keywords, setKeywords] = useState<string>('')
    return <FilterContext.Provider value={{ searchQuery, setSearchQuery, minPrice, setMinPrice, selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, keywords, setKeywords }}>
        {children}
    </FilterContext.Provider>
};

export const useFilter = () => {
    const context = useContext(FilterContext)
    if(context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider")
    }
    return context;
};