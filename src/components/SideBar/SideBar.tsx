"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPriceRange((prev) => {
      if (name === "min") {
        return [Number(value), prev[1]];
      } else {
        return [prev[0], Number(value)];
      }
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.categorySection}>
        <h3>Categories</h3>
        <label>
          <input
            type="checkbox"
            value="Category1"
            checked={selectedCategories.includes("Category1")}
            onChange={() => handleCategoryChange("Category1")}
          />
          Category1
        </label>
        <label>
          <input
            type="checkbox"
            value="Category2"
            checked={selectedCategories.includes("Category2")}
            onChange={() => handleCategoryChange("Category2")}
          />
          Category2
        </label>
        <label>
          <input
            type="checkbox"
            value="Category3"
            checked={selectedCategories.includes("Category3")}
            onChange={() => handleCategoryChange("Category3")}
          />
          Category3
        </label>
      </div>
      <div className={styles.priceSection}>
        <h3>Price Range</h3>
        <label>
          Min:
          <input
            type="number"
            name="min"
            value={priceRange[0]}
            onChange={handlePriceChange}
            className={styles.priceInput}
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            name="max"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className={styles.priceInput}
          />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
