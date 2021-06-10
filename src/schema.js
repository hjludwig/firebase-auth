const data = {
    user: {
        name: "First Last",
        email: "email@example.com",
        ingredients: [
            {
                name: "item1",
                category: "meat",
            },
            {
                name: "item2",
                category: "produce",
            },
            {
                name: "item3",
                category: "pantry items",
            },
        ],
        dishes: [
            {
                name: "Dish1",
                categories: ["Meat", "Dinner"],
                url: "www.url.com",
                recipe: {},
            },
        ],
        mealPlan: {
            days: [
                {
                    day: "Day",
                    meals: [
                        {
                            name: "Breakfast",
                            dishes: [
                                {
                                    name: "Frittata",
                                    categories: ["Eggs", "Breakfast", "Lunch"],
                                },
                            ],
                        },
                        {
                            name: "Lunch",
                            dishes: [
                                {
                                    name: "Corn Chowder",
                                    categories: ["Soups, Vegetarian, Lunch"],
                                },
                            ],
                        },
                        {
                            name: "Dinner",
                            dishes: [
                                {
                                    name: "Spaghetti and Meatballs",
                                    categories: ["Meat, Dinner, Italian"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
};
