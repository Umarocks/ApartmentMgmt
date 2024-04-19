import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import backgroundImage from '../../Assets/Homepage.jpeg'; 

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-center dark:bg-zinc-800" style="background-image: url('https://api.deepai.org/job-view-file/e4a535e9-b1a5-4a8c-82b8-4d9a80f9ee9d/outputs/output.jpg');">
        <Sidebar/>
        <img src="https://bcassetcdn.com/public/blog/wp-content/uploads/2023/07/28140224/Urban-City-Apartment-by-marcololstudio.png" alt="ALMS Logo" className="mx-auto my-4">
        <div className="flex-1 p-10">
                    <div className="flex justify-end space-x-4 mb-6">
                        <button id="homeBtn" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Home</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact Us</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Login</button>
                    </div>
                </div>  
        </div>
  );
}

export default Home;
