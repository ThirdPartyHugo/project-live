// app/api/create-checkout-session/route.js
export async function POST(request) {
    const body = await request.json();
    console.log('Payment data:', body);

    // Your logic to create a checkout session
    return new Response(
        JSON.stringify({ message: 'Checkout session created successfully!' }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}
