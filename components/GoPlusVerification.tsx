import clsx from 'clsx';
import { GoPlusService } from "@/services/goplus.service";


export interface GoPlusCheckResultProps {
    className?: string;
    address: string;
}

async function verifyToken(address: string) {
    return address ? await GoPlusService.verifyToken(address) : null;
}

export const GoPlusVerification = async ({ className, address }: GoPlusCheckResultProps) => {
    const goPlusVerificationResult = await verifyToken(address);

    if (!goPlusVerificationResult) {
        return null;
    }

    const { threats, isAllChecksPassed } = goPlusVerificationResult;

    return (
        <div className={clsx("collapse bg-base-200 collapse-arrow", className)}>
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