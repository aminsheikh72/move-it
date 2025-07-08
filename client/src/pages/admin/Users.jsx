import React, { useEffect } from "react";
import { Filter, Download, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/admin/adminSlice";
import { toast } from 'react-toastify';
import PulseLoader from './../../components/loaders/PulseLoader';

const Users = () => {
  const { users,isLoading,isError,isSuccess,message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

useEffect(()=>{
if(isError && message){
  toast.error(message,{
    position : "top-center"
  })
}
},[isError,message])


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Users</h2>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <p className="text-gray-300 text-center uppercase">
            details all registered users
          </p>
        </div>

        <div className="overflow-x-auto">
       
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Name
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Email
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Phone
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? <div className=' w-full flex items-center justify-center'><h1 className=' text-4xl font-serif'>No users yet</h1></div>:""}
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-white/10 hover:bg-white/5 transition-colors"
                >
                
                  <td className="p-4 text-white">{user.name}</td>
                  <td className="p-4 text-gray-300">{user.email}</td>
                  <td className="p-4 text-gray-300">{user.phone}</td>

                  <td className="p-4 text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
       {isLoading ? <PulseLoader/> : ""}
      </div>
    </div>
  );
};

export default Users;
