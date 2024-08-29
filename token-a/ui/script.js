
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return [];
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function updateCryptoTable(cryptoData) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';

    cryptoData.forEach((coin, index) => {
        const row = `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full" src="${coin.image}" alt="${coin.name}">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${coin.name}</div>
                            <div class="text-sm text-gray-500">${coin.symbol.toUpperCase()}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatNumber(coin.current_price)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coin.price_change_percentage_24h > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatNumber(coin.market_cap)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function updateTrendingCoins(cryptoData) {
    const trendingSection = document.getElementById('trendingCoins');
    trendingSection.innerHTML = '';

    cryptoData.slice(0, 4).forEach(coin => {
        const coinCard = `
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center">
                        <img src="${coin.image}" alt="${coin.name}" class="w-8 h-8 mr-2">
                        <span class="font-semibold">${coin.symbol.toUpperCase()}</span>
                    </div>
                    <span class="text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </div>
                <p class="text-gray-600">${formatNumber(coin.current_price)}</p>
                <p class="text-xs text-gray-500 mt-1">Market Cap: ${formatNumber(coin.market_cap)}</p>
            </div>
        `;
        trendingSection.innerHTML += coinCard;
    });
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const cryptoData = await fetchCryptoData();
    updateCryptoTable(cryptoData);
    updateTrendingCoins(cryptoData);
});
