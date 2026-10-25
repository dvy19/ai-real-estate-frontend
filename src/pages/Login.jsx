import React, { useState, useRef } from 'react';
import { Building2, User, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import authService from '../services/authService';


const Login = () => {
    const navigate=useNavigate()

  const [selectedRole, setSelectedRole] = useState('customer');
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });

  // Reference for scrolling to the form
  const formRef = useRef(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({ ...prev, role }));

    // Smooth scroll to form section
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login=async(e)=>{

    e.preventDefault()

    try{

        const data=await authService.login(formData)

        console.log(data)

        
        if(data.user.role=='customer'){
          navigate('/customer-home')
        }
        else{
          navigate('/broker-home')
        }
    }
    catch(err){
        console.log(err)
    }

  }

  return (
    <div>

    <section ref={formRef} className="max-w-md mx-auto pt-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Create Your Account</h3>
            <p className="text-sm text-gray-500 mt-1">
             Login to your account
            </p>
          </div>

          <form onSubmit={login} className="space-y-5">
           

           

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  //required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  //required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-sm transition-colors duration-200 mt-2"
            >
             Login 
            </button>
          </form>
        </div>
      </section>

    </div>
      
  )
}

export default Login
