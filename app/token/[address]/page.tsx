import { GoPlusVerification } from "@/components/GoPlusVerification";

export default async function TokenDetailsPage({ params }: { params: { address: string } }) {
    const { address } = params;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 className="mb-5">Token Details</h1>
            <p className="mb-5">Token Address: {address}</p>
            <div className="flex">
                <div className="w-96">
                    <GoPlusVerification address={address} />
                </div>
            </div>
        </div>
    );
}
