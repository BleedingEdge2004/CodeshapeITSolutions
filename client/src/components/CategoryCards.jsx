// client/src/components/CategoryCards.jsx
import React from 'react';

const categories = [
    { name: 'Pain Relief', image: 'https://via.placeholder.com/150' },
    { name: 'Diabetes', image: 'https://via.placeholder.com/150' },
    { name: 'Heart Health', image: 'https://via.placeholder.com/150' },
    { name: 'Skin Care', image: 'https://via.placeholder.com/150' },
];

const CategoryCards = () => {
    return (
        <section className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg p-3 text-center">
                    <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover rounded" />
                    <h2 className="mt-2 text-sm font-semibold text-gray-700">{cat.name}</h2>
                </div>
            ))}
        </section>
    );
};

export default CategoryCards;