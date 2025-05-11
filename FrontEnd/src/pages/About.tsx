import { Award, Book, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="relative py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About EduQuest</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're revolutionizing the way students take exams with our innovative online platform.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Target className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              To provide a seamless and secure online examination experience that empowers both students
              and educators in their academic journey.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Book className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Quality Education</h3>
                <p className="mt-2 text-gray-500">
                  We believe in providing high-quality educational resources and assessment tools.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Student Success</h3>
                <p className="mt-2 text-gray-500">
                  Our platform is designed to help students achieve their academic goals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Award className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Excellence</h3>
                <p className="mt-2 text-gray-500">
                  We strive for excellence in everything we do, from platform stability to user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-xl text-gray-500">
              Meet the passionate individuals behind ExamPro
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: 'S VIGNESH ',
                role: 'Creator of ExamPro',
                image: '../src/pages/Vi.jpg',
              },
              {
                name: 'K SHANMUKH ',
                role: 'Co-Creator',
                image: '../src/pages/shan.jpg',
              },
              {
                name: 'B PRADUMNA KUMAR',
                role: 'Co-Creator',
                image: '../src/pages/prad.jpg',
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative">
                  <img
                    className="mx-auto h-48 w-48 rounded-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600">{member.role}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;