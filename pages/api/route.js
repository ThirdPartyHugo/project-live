// app/api/create-checkout-session/route.js
export async function POST(request) {
    const body = await request.json();
    console.log('Payment data:', body);

    return new Response(
        JSON.stringify({ message: 'Checkout session created successfully!' }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}
// app/api/current-price/route.js
export async function GET(request) {
    return new Response(JSON.stringify({ price: 100 }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
