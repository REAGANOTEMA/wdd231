// js/data.js
// ES module exporting a fetch function
export async function fetchItems() {
    try {
        // fetch from the data folder relative to the page root
        const response = await fetch('data/items.json');
        if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return []; // caller handles empty array
    }
}
