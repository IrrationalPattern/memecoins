import clsx from 'clsx';
import { GoPlusService } from "@/services/goplus.service";


interface GoPlusCheckResultProps {
    address: string;
}

async function verifyToken(address: string) {
    return address ? await GoPlusService.verifyToken(address) : null;
}

export const GoPlusVerification = async ({ address }: GoPlusCheckResultProps) => {
    const goPlusVerificationResult = await verifyToken(address);

    if (!goPlusVerificationResult) {
        return null;
    }

    const { threats, isAllChecksPassed } = goPlusVerificationResult;

    return (
        <div className="collapse bg-base-200 collapse-arrow">
            <input type="checkbox"/>
            <div className="flex justify-between items-center collapse-title text-xl font-medium">
                Go+ Verification
                <div className={clsx("badge gap-2", isAllChecksPassed ? 'badge-success' : 'badge-error')}>
                    {isAllChecksPassed ? 'All Good' : `Threats Found: ${threats.length}`}
                </div>
            </div>
            <div className="collapse-content pl-10">
                {threats?.length > 0 && (
                    <ul className="list-disc">
                        {threats.map((threat: string) => (
                            <li key={threat}>{threat}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}