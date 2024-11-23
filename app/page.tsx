'use client';

import {FormEventHandler, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [tokenAddress, setTokenAddress] = useState('');
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (tokenAddress) {
            // Redirect to the token details page
            router.push(`/token/${tokenAddress}`);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Token Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter token address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    style={{ padding: '0.5rem', width: '300px' }}
                />
                <button type="submit" style={{ padding: '0.5rem', marginLeft: '1rem' }}>
                    Search
                </button>
            </form>
        </div>
    );
}