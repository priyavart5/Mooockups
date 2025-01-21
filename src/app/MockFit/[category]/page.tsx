'use client';

import { useRouter, useParams } from 'next/navigation';
import mockFit from '@/utils/mockFit-defaultData';
import { useDispatch } from 'react-redux';
import { setSelectedMockup } from '../../../redux/mockFit-slices/mockFitSlice';

type Mockup = {
  mockupName: string;
  mockupSrc: string;
};

type CategoryData = {
  heading: string;
  description: string;
  [subCategory: string]: string | Mockup[];
};

const CategoryPage = () => {
    const router = useRouter();
    const { category } = useParams();

    const dispatch = useDispatch();

    if (!category || !mockFit[category as keyof typeof mockFit]) {
        return <p>Category not found</p>;
    }

    const categoryData = mockFit[category as keyof typeof mockFit] as CategoryData;

    const handleMockup = (mockup: any) => {
        dispatch(setSelectedMockup({isMockupSelected: true, ...mockup}))
        router.push(`/MockFit/Editor`);
    }

    return (
        <div>
            <h1>{categoryData.heading}</h1>
            <p>{categoryData.description}</p>
            {Object.keys(categoryData).map((subCategory, index) => {
                if (subCategory === 'heading' || subCategory === 'description') return null;
                
                const mockups = categoryData[subCategory] as Mockup[];
                return (
                    <div key={index}>
                        <h2>{subCategory}</h2>
                        <ul>
                            {mockups.map((mockup, index) => (
                                <li key={index}>
                                    <button onClick={() => handleMockup(mockup)}>
                                        {mockup.mockupName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryPage;
