import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Bell, BookOpen, CheckCircle, CheckCircle2, ClipboardList, CreditCard, DollarSign, Download, FileText, Home, LogOut, Search, Timer, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', exams: 30, students: 40, revenue: 2400 },
  { name: 'Feb', exams: 35, students: 45, revenue: 2800 },
  { name: 'Mar', exams: 32, students: 42, revenue: 2600 },
  { name: 'Apr', exams: 40, students: 48, revenue: 3200 },
  { name: 'May', exams: 38, students: 46, revenue: 3000 },
  { name: 'Jun', exams: 45, students: 52, revenue: 3600 },
  { name: 'Jul', exams: 42, students: 50, revenue: 3400 },
  { name: 'Aug', exams: 48, students: 55, revenue: 3800 },
];

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Exam {
  id: number;
  name: string;
  date: string;
  students: number;
  status: "Upcoming" | "Completed";
  subject: string;
  value: number;
  questions: number;
  timeRemains: string;
}


interface Registration {
  id: number;
  student: string;
  exam: Exam;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  paymentStatus: 'Pending' | 'Paid';
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the time complexity of the QuickSort algorithm in the average case?",
    options: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which data structure uses FIFO (First-In-First-Out) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What is the main purpose of an index in a database?",
    options: ["To store data", "To improve query performance", "To backup data", "To encrypt data"],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Which protocol is used to send email?",
    options: ["FTP", "SMTP", "HTTP", "SSH"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 2
  },
  {
    id: 6,
    text: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Laravel", "Vue"],
    correctAnswer: 2
  },
  {
    id:7,
    text: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Berlin"],
    correctAnswer: 2
  },
  {
    id: 8,
    text: "What is the capital of Germany?",
    options: ["London", "Madrid", "Paris", "Berlin"],
    correctAnswer: 3
  },
  {
    id: 9,
    text: "What is the capital of Spain?",
    options: ["London", "Madrid", "Paris", "Berlin"],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "What is the capital of England?",
    options: ["London", "Madrid", "Paris", "Berlin"],
    correctAnswer: 0
  }
];

const predefinedExams = [
  {
    id: 101,
    name: 'Mathematics Fundamentals',
    subject: 'Math',
    duration: '01:30:00',
    price: 50,
    questions: [
      {
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1
      },
    ]
  },
  {
    id: 102,
    name: 'Physics Basics',
    subject: 'Physics',
    duration: '02:00:00',
    price: 60,
    questions: [
      {
        text: "What is the unit of force?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correctAnswer: 0
      }
    ]
  },
];


const initialExams: Exam[] = [
  {
    id: 1,
    name: "Math Exam",
    date: "2023-10-01",
    students: 30,
    status: "Upcoming",
    subject: "Mathematics",
    value: 100,
    questions: 50,
    timeRemains: "02:00:00",
  },
];


const examsList = [
  { id: 1, name: 'Mathematics Final', date: '2024-03-15', students: 45, status: 'Upcoming', subject: "Math", value: 100, questions: 26, timeRemains: "6:05:32" },
  { id: 2, name: 'Physics Midterm', date: '2024-03-18', students: 38, status: 'Upcoming', subject: "Physics", value: 100, questions: 26, timeRemains: "10:30:54" },
  { id: 3, name: 'Chemistry Lab Test', date: '2024-03-10', students: 42, status: 'Completed', subject: "Chemistry", value: 100, questions: 26, timeRemains: "1:30:22" },
  { id: 4, name: 'Biology Assessment', date: '2024-03-05', students: 40, status: 'Completed', subject: "Biology", value: 100, questions: 26, timeRemains: "00:30:56" },
];

const registrations = [
  { id: 1, student: 'Alice Johnson', exam: 'Mathematics Final', date: '2024-03-15', status: 'Confirmed' },
  { id: 2, student: 'Bob Smith', exam: 'Physics Midterm', date: '2024-03-18', status: 'Pending' },
  { id: 3, student: 'Carol White', exam: 'Chemistry Lab Test', date: '2024-03-10', status: 'Confirmed' },
  { id: 4, student: 'David Brown', exam: 'Biology Assessment', date: '2024-03-05', status: 'Confirmed' },
];

const payments = [
  { id: 1, student: 'Alice Johnson', amount: 150, date: '2024-03-01', status: 'Paid' },
  { id: 2, student: 'Bob Smith', amount: 150, date: '2024-03-02', status: 'Pending' },
  { id: 3, student: 'Carol White', amount: 200, date: '2024-03-03', status: 'Paid' },
  { id: 4, student: 'David Brown', amount: 200, date: '2024-02-28', status: 'Paid' },
];


function ExamComponent({ exam, onBack }: { exam: Exam, onBack: () => void }) {
  const [currentView, setCurrentView] = useState<'terms' | 'welcome' | 'exam' | 'confirm'|'thankyou'>('terms');
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam.timeRemains);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (currentView === 'exam') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const [hours, minutes, seconds] = prev.split(':').map(Number);
          let totalSeconds = hours * 3600 + minutes * 60 + seconds;
          totalSeconds--;
          if (totalSeconds <= 0) {
            clearInterval(timer);
            return '00:00:00';
          }
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentView]);

  const handleAgreeTerms = () => {
    setCurrentView('welcome');
  };

  const handleLogin = () => {
    setCurrentView('exam');
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    setCurrentView('confirm');
  };

  const handleFinalSubmit = () => {
    setCurrentView('thankyou');
  };


  const renderQuestionNumbers = () => {
    return (
      <div className="flex flex-col gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-lg ${
              selectedAnswers[index] !== undefined ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const sendPasswordCode = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const templateParams = {
      email_from: email,
      passcode: otp,
      time: new Date(Date.now() + 15 * 60000).toLocaleTimeString(),
    };
    try {
      await emailjs.send(
        "service_5hmqqzg",    
        "template_0qhaaqf",   
        templateParams,
        "NCQ-5D-Axdtas-n3s"        
      );
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };


  if (currentView === 'terms') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
          <p className="text-gray-600 mb-8">
            By accessing or using this System, you agree to comply with and
            be bound by these Terms and Conditions. If you do not agree
            with any part of these terms, you are not permitted to use this System.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 text-indigo-600"
            />
            <label htmlFor="agree">Agreed in all terms</label>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleAgreeTerms}
              disabled={!agreed}
              className={`w-full py-2 rounded-lg ${
                agreed
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Take exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'thankyou') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <h3 className="text-xl mb-6">You have successfully completed the exam</h3>
          <p className="text-gray-600 mb-6">
            Your answers have been submitted. You can now close this window or 
            return to your dashboard.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome ,</h2>
          <h3 className="text-xl mb-6">Are you ready to take your exam</h3>
          <p className="text-gray-600 mb-6">
            Provide the Email you used during registration to receive a password code.
          </p>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-6 border rounded-lg"
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the OTP code"
            className="w-full p-2 mb-6 border rounded-lg"
          />
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={sendPasswordCode}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Send Code
            </button>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'confirm') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Are you sure you want to submit?</h2>
          <p className="text-gray-600 mb-6">
            Once you submit, you won't be able to change your answers. 
            Make sure you've answered all questions before submitting.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView('exam')}
              className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back to Exam
            </button>
            <button
              onClick={handleFinalSubmit}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Confirm Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">{exam.subject}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-gray-400" />
              <span className={timeLeft.startsWith('00') ? 'text-red-500' : ''}>
                {timeLeft}
              </span>
            </div>
            <span className="text-gray-600">Welcome John</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8 p-4 flex gap-8">
        <div className="w-24">
          {renderQuestionNumbers()}
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Submit
          </button>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Q{currentQuestion + 1}: {questions[currentQuestion].text}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className="block p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="answer"
                  checked={selectedAnswers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(currentQuestion, index)}
                  className="mr-3"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Sidebar({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/login');
  };
  return (
    <div className="w-64 bg-indigo-900 h-screen fixed left-0 top-0 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">EduQuest</h1>
      </div>
      
      <nav className="space-y-4">
        <a 
          href="#" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${activePage === 'dashboard' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
          onClick={() => setActivePage('dashboard')}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${activePage === 'exams' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
          onClick={() => setActivePage('exams')}
        >
          <BookOpen size={20} />
          <span>Exams</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${activePage === 'register' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
          onClick={() => setActivePage('register')}
        >
          <ClipboardList size={20} />
          <span>Register</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${activePage === 'reports' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
          onClick={() => setActivePage('reports')}
        >
          <FileText size={20} />
          <span>Reports</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${activePage === 'payments' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
          onClick={() => setActivePage('payments')}
        >
          <CreditCard size={20} />
          <span>Payment</span>
        </a>
      </nav>
      
      <div className="absolute bottom-8 space-y-4 w-52">
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800">
          <LogOut size={20} />
          <button onClick={handleSignOut}  
            style={{
              padding: '10px 40px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: 'bg-indigo-800',
              color: 'white'
            }}>Sign out</button>
        </a>
      </div>
    </div>
  );
}

function StatCard({ title, value, data, color }: { title: string; value: number; data: any[]; color: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={title.toLowerCase()}
              stroke={color}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <StatCard
          title="Exams"
          value={203}
          data={data}
          color="#6366f1"
        />
        <StatCard
          title="Students"
          value={351}
          data={data}
          color="#ec4899"
        />
      </div>
    </div>
  );
}

function ExamsPage({
  exams,
  onStartExam,
  onCompleteExam,
}: {
  exams: Exam[];
  onStartExam: (exam: Exam) => void;
  onCompleteExam: (examId: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search exams..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{exam.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{exam.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{exam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{exam.timeRemains}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      exam.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {exam.status === 'Upcoming' && (
                    <button
                      onClick={() => onStartExam(exam)}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
                    >
                      <CheckCircle2 size={16} />
                      Start Exam
                    </button>
                  )}
                  {(exam.status === 'Upcoming') && (
                    <button
                      onClick={() => onCompleteExam(exam.id)}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle2 size={16} />
                      .
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



function RegisterPage({ 
  onExamRegistered,
  registeredExamIds,
  onRemoveAvailableExam,
  availableExams
 
}: {
  availableExams: typeof predefinedExams; 
  onExamRegistered: (exam: Exam) => void;
  registeredExamIds: number[];
  onRemoveAvailableExam: (id: number) => void;
}) {
  const [selectedExam, setSelectedExam] = useState<typeof predefinedExams[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleRegister = (exam: typeof predefinedExams[0]) => {
    setSelectedExam(exam);
    setShowPayment(true);
  };
  

  const handlePaymentSubmit = () => {
    if (!selectedExam) return;
    
    const newExam: Exam = {
      id: Date.now(), 
      name: selectedExam.name,
      subject: selectedExam.subject,
      value: selectedExam.price,
      questions: selectedExam.questions.length,
      timeRemains: selectedExam.duration,
      date: new Date().toISOString().split('T')[0],
      students: 1,
      status: 'Upcoming'
    };
    
    onExamRegistered(newExam);
    setShowPayment(false);
    onRemoveAvailableExam(selectedExam.id);
    
    setSelectedExam(null);
    setShowPayment(false);
    setCardDetails({ number: '', expiry: '', cvv: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{availableExams.length > 0 ? 'Available Exams' : 'No Exams Available'}</h2>
      </div>

      {!showPayment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">{exam.name}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subject: {exam.subject}</span>
                  <span>Duration: {exam.duration}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Includes {exam.questions.length} questions</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-green-600">${exam.price}</span>
                  <button
                    onClick={() => handleRegister(exam)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">Complete Registration</h3>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Exam Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-indigo-700">{selectedExam?.name}</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>Subject: {selectedExam?.subject}</p>
                <p>Duration: {selectedExam?.duration}</p>
                <p>Questions: {selectedExam?.questions.length}</p>
                <p className="font-bold">Price: ${selectedExam?.price}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-4">Payment Method</h4>
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg border-2 ${paymentMethod === 'credit' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('credit')}
              >
                Credit Card
              </button>
              <button
                className={`px-4 py-2 rounded-lg border-2 ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                PayPal
              </button>
            </div>

            {paymentMethod === 'credit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowPayment(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handlePaymentSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={paymentMethod === 'credit' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)}
            >
              Complete Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
            <Download size={20} />
            <span>Download Report</span>
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 border hover:bg-gray-50">
            <Upload size={20} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Exam Statistics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="exams" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Student Enrollment Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#ec4899" fill="#fce7f3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search payments..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">$12,500</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid Invoices</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{payment.student}</td>
                <td className="px-6 py-4 whitespace-nowrap">${payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Dash() {
  const [activePage, setActivePage] = useState('dashboard');
  const [userFullName, setUserFullName] = useState('');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [availableExamIds, setAvailableExamIds] = useState<number[]>(
    predefinedExams.map(exam => exam.id)
  );

  const getUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/20');
      console.log(response.data.name);
      return {
        fullName: `${response.data.name}`,
      };
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserFullName(userInfo.fullName);
      }
    };

    fetchUserInfo();
  }, []);

  const handleExamRegistered = (newExam: Exam) => {
    setExams(prev => [...prev, newExam]);
    setAvailableExamIds(prev => prev.filter(id => id !== newExam.id));
    setActivePage('exams');
  };

  const handleRemoveAvailableExam = (id: number) => {
    setAvailableExamIds(prev => prev.filter(examId => examId !== id));
  };

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const handleBackFromExam = () => {
    setSelectedExam(null);
  };

  const availableExams = predefinedExams.filter(exam => 
    availableExamIds.includes(exam.id)
  );
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSettingsClick = () => {
    setShowSettings(true); 
    setShowDropdown(false); 
  };

  const handleEditClick = () => {
    console.log("Edit clicked");
  };

  const closeSettings = () => {
    setShowSettings(false); // Close the settings panel
  };

  if (selectedExam) {
    return <ExamComponent exam={selectedExam} onBack={handleBackFromExam} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h1>
            <p className="text-gray-500">Welcome back, {userFullName}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-2">
            <div className="relative">
      
      <div
        className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white cursor-pointer"
        onClick={toggleDropdown}
      >
        JD
      </div>

      {showDropdown && (
        <div className="absolute mt-2 right-0 bg-white shadow-lg rounded-lg w-40">
          <button
            onClick={handleSettingsClick}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </button>
          <button
            onClick={handleEditClick}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </button>
        </div>
      )}
    </div>
              
            </div>
          </div>
        </div>
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'exams' && <ExamsPage exams={exams} onStartExam={handleStartExam} onCompleteExam={function (examId: number): void {
          throw new Error('Function not implemented.');
        } } />}
        {activePage === 'register' && <RegisterPage 
            availableExams={availableExams}
            onExamRegistered={handleExamRegistered}
            registeredExamIds={exams.map(exam => exam.id)}
            onRemoveAvailableExam={handleRemoveAvailableExam}/>}
        {activePage === 'reports' && <ReportsPage />}
        {activePage === 'payments' && <PaymentsPage />}
      </div>
    </div>
  );
}

export default Dash;