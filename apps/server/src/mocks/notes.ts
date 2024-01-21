export type TNote = {
  id: number;
  title: string;
  description: string;
  author_id: number;
  metadata: {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  content: string;
};

export default [
  {
    id: 1,
    title: "Meeting Notes",
    description: "Notes from the weekly team meeting",
    author_id: 2,
    metadata: {
      created_at: "2021-09-15T10:00:00.000Z",
      updated_at: "2021-09-15T11:30:00.000Z",
      deleted_at: null,
    },
    content:
      "# Meeting Notes\n\n## Agenda\n1. Project updates\n2. Upcoming events\n3. Team challenges\n\n## Discussion\n- Project A milestone achieved\n- Event planning for next month\n- Addressing team concerns\n\n---\nEnd of meeting notes",
  },
  {
    id: 2,
    title: "Recipe: Chocolate Brownies",
    description: "A delightful chocolate brownie recipe",
    author_id: 3,
    metadata: {
      created_at: "2021-09-16T14:00:00.000Z",
      updated_at: "2021-09-16T15:45:00.000Z",
      deleted_at: null,
    },
    content:
      "# Chocolate Brownies Recipe\n\n## Ingredients\n- 200g dark chocolate\n- 150g unsalted butter\n- 200g sugar\n- 3 eggs\n- 100g all-purpose flour\n- 1 tsp vanilla extract\n- A pinch of salt\n\n## Instructions\n1. Preheat oven to 180°C.\n2. Melt chocolate and butter, then mix with sugar.\n3. Beat in eggs, one at a time.\n4. Add flour, vanilla extract, and salt. Mix until smooth.\n5. Pour into a greased baking pan.\n6. Bake for 25-30 minutes.\n7. Allow to cool before cutting.\n\n---\nEnd of recipe",
  },
  {
    id: 3,
    title: "Tech Update: New Framework",
    description: "Overview of the latest tech framework",
    author_id: 1,
    metadata: {
      created_at: "2021-09-17T09:30:00.000Z",
      updated_at: "2021-09-17T10:45:00.000Z",
      deleted_at: null,
    },
    content:
      "# Tech Update: New Framework\n\n## Overview\nWe've adopted a new tech framework that enhances performance and scalability...\n\n## Key Features\n- Improved code efficiency\n- Enhanced security measures\n- Better integration capabilities\n\n## Implementation\nTeams have started training, and initial feedback is positive.\n\n---\nEnd of tech update",
  },
  {
    id: 4,
    title: "Meeting Minutes",
    description: "Minutes of the team meeting",
    author_id: 2,
    metadata: {
      created_at: "2021-10-01T14:30:00.000Z",
      updated_at: "2021-10-01T15:45:00.000Z",
      deleted_at: null,
    },
    content:
      "# Meeting Minutes\n\n## Agenda\n1. Project updates\n2. Upcoming deadlines\n3. Team collaboration\n\n## Discussion\n- Project A is on track\n- Deadline for Task B extended\n- New team member joining next week\n\n---\nEnd of meeting minutes",
  },
  {
    id: 5,
    title: "Recipe: Spicy Pasta",
    description: "A delicious spicy pasta recipe",
    author_id: 3,
    metadata: {
      created_at: "2021-11-05T12:00:00.000Z",
      updated_at: "2021-11-05T14:00:00.000Z",
      deleted_at: null,
    },
    content:
      "# Spicy Pasta Recipe\n\n## Ingredients\n- 250g pasta\n- 2 tbsp olive oil\n- 1 onion, chopped\n- 2 cloves garlic, minced\n- 1 can (400g) crushed tomatoes\n- 1 tsp red pepper flakes\n- Salt and pepper to taste\n\n## Instructions\n1. Cook pasta al dente.\n2. In a pan, sauté onions and garlic in olive oil.\n3. Add crushed tomatoes, red pepper flakes, salt, and pepper.\n4. Simmer for 10 minutes.\n5. Toss cooked pasta in the sauce.\n6. Serve hot and enjoy!\n\n---\nEnd of recipe",
  },
  {
    id: 6,
    title: "Book Review: 'The Silent Sky'",
    description: "Thoughts on the latest novel",
    author_id: 2,
    metadata: {
      created_at: "2022-01-10T09:00:00.000Z",
      updated_at: "2022-01-11T11:30:00.000Z",
      deleted_at: null,
    },
    content:
      "# Book Review: 'The Silent Sky'\n\n## Summary\n'The Silent Sky' is a captivating novel that explores the mysteries of the universe...\n\n## Pros\n- Engaging plot\n- Well-developed characters\n- Thought-provoking themes\n\n## Cons\n- Slow pacing in the middle\n- Ambiguous ending\n\n## Recommendation\nI highly recommend this novel to those who enjoy science fiction and philosophical exploration.\n\n---\nEnd of book review",
  },
] as TNote[];
