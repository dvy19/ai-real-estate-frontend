import React, { useState, useRef } from 'react';
import { Building2, User, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';

import authService from '../../services/authService'

export default function RoleSection() {

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

  
  const signup=async(e)=>{

     e.preventDefault();

    try{

      const data=await authService.register(formData)
      console.log(data)

      console.log(data.user.role)

      if(data.user.role=='broker'){
        navigate('/broker-details')
      }
      else{
        navigate('/customer-home')
      }
      

    }
    catch(err){
      console.log(err)
    }
  }
    

 

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* SECTION 1: ROLE SELECTION CARDS */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome to <span className="text-indigo-600">ReState</span>
        </h2>
        <p className="mt-3 text-lg sm:text-xl text-gray-600 font-medium">
          Continue as a broker or a customer
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          
          {/* Card 1: Broker */}
          <div
            onClick={() => handleRoleSelect('broker')}
            className={`group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer text-left shadow-sm hover:shadow-xl ${
              selectedRole === 'broker'
                ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Building2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              I'm a Broker
            </h3>
            
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              List properties, manage client inquiries, and close deals efficiently with our broker tools.
            </p>

            <div className="mt-6 flex items-center font-semibold text-sm text-indigo-600 group-hover:text-indigo-700">
              Continue as Broker
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Customer */}
          <div
            onClick={() => handleRoleSelect('customer')}
            className={`group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer text-left shadow-sm hover:shadow-xl ${
              selectedRole === 'customer'
                ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <User className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              I'm a Customer
            </h3>

            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              Explore verified properties, connect with trusted agents, and find your dream home.
            </p>

            <div className="mt-6 flex items-center font-semibold text-sm text-indigo-600 group-hover:text-indigo-700">
              Continue as Customer
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FORM SECTION */}
      <section ref={formRef} className="max-w-md mx-auto pt-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Create Your Account</h3>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to continue as a{' '}
              <span className="font-semibold text-indigo-600 capitalize">
                {formData.role}
              </span>
            </p>
          </div>

          <form onSubmit={signup} className="space-y-5">
            {/* Selected Role Input (Controlled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) => {
                  handleInputChange(e);
                  setSelectedRole(e.target.value);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-gray-50 capitalize"
              >
                <option value="customer">Customer</option>
                <option value="broker">Broker</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  //required
                  placeholder="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  //required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
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
              Sign Up as {formData.role === 'broker' ? 'Broker' : 'Customer'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}