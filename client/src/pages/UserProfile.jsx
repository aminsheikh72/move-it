import React, { useState } from 'react';
import { User, Mail, Edit3, Save, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
 

const {user}= useSelector(state=> state.auth)
window.scrollTo(0,0)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
    <h1 className=' text-3xl my-3'>Profile details</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
        
              <div className="text-white flex items-center">
                <User className="mr-2 text-purple-400" size={18} />
                {user.name}
              </div>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            
              <div className="text-white flex items-center">
                <Mail className="mr-2 text-purple-400" size={18} />
                {user.email}
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
