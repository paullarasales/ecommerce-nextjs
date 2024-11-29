import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className="flex flex-row justify-center text-center bg-white">
            <div className="flex flex-col justify-center items-start">
                <h1 className="text-6xl font-extrabold mb-2 text-black text-left">Maximize Your Savings</h1>
                <h1 className="text-6xl font-extrabold mb-3 text-black">On <span className="text-red-500">Superbike Rentals!</span></h1>
                <p className="text-xl mb-2 text-gray-500 text-center">We Offer The Best Superbikes At Affordable Prices.</p>
                <div className="mt-2">
                    <a href="/auth/signin" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center">
                        Get Started
                        <FaArrowRight className="ml-2" />
                    </a>
                </div>
            </div>
            <div className="ml-2">
                <Image
                    src="/yamaha.png"
                    alt="Superbike"
                    width={631}
                    height={500}
                    className=""
                />
            </div>

        </div>
    );
};

export default HeroSection;