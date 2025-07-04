import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <div className="text-center py-10 px-4">
        <h2 className="text-2xl font-semibold mb-2">Start Your Developer Journey</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join a community of developers sharing their thoughts, tutorials, and experiences.
        </p>
        <Link to="/Register">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
