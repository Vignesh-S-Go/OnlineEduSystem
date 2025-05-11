import { ArrowRight, Award, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
            alt="Students studying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to EduQuest</h1>
            <h1 className="text-4xl md:text-2xl font-bold mb-6">
              Your Gateway to Academic Excellence
            </h1>
            <p className="text-xl mb-8">
              Experience seamless online examinations with our state-of-the-art platform.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500 transition"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduQuest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Exams</h3>
              <p className="text-gray-600">
                Access a wide range of subjects and question types to test your knowledge effectively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
              <p className="text-gray-600">
                Navigate easily through our intuitive platform designed for both students and educators.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <Award className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get immediate feedback and detailed analysis of your performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;