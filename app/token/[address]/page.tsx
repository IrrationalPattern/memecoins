import { GoPlusVerification } from "@/components/GoPlusVerification";
import { DexToolsGraph } from "@/components/DexToolsGraph";

export default async function TokenDetailsPage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = await params;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 className="mb-5">Token Details</h1>
            <p className="mb-5">Token Address: {address}</p>
            <DexToolsGraph className="mb-5" address={address} />
            <div className="flex">
                <GoPlusVerification className="w-96" address={address} />
            </div>
        </div>
    );
}
