'use client';

import { useRouter } from 'next/navigation';
import mockFit from '@/utils/mockFit-defaultData';

type Category = {
  heading: string;
  description: string;
};

type MockFitData = {
  [category: string]: Category;
};

const MockfitPage = () => {
    const router = useRouter();

    const mockFitData = mockFit as MockFitData;

    return (
        <div>
            <h1>Mockfit Categories</h1>
            {Object.keys(mockFitData).map((category, index) => (
                <div key={index}>
                    <h2>{mockFitData[category].heading}</h2>
                    <p>{mockFitData[category].description}</p>
                    <button onClick={() => router.push(`/MockFit/${category}`)}>
                        {category}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MockfitPage;
