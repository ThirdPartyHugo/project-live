// app/api/current-price/route.js
export async function GET(request) {
    // Your logic to fetch the current price
    return new Response(JSON.stringify({ price: 100 }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
