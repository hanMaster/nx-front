'use client';
import { useRouter } from 'next/navigation';

export default function GoBackBtn() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="md:hidden bg-brown text-white py-2.5 px-5 rounded-3xl font-cormorant text-[20px] fixed left-5 bottom-12.5"
        >
            Назад
        </button>
    );
}
