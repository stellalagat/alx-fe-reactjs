import React from "react";

const UserProfile = () => {
  return (
    <div className="mx-auto sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm bg-white shadow-lg rounded-2xl text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Profile Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="mx-auto rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
      />

      {/* Heading */}
      <h2 className="mt-4 font-semibold sm:text-lg md:text-xl text-gray-800 hover:text-blue-500 transition-colors duration-300 ease-in-out">
        John Doe
      </h2>

      {/* Paragraph */}
      <p className="mt-2 sm:text-sm md:text-base text-gray-600">
        A passionate developer who loves creating responsive and modern
        applications using React and Tailwind CSS.
      </p>
    </div>
  );
};

export default UserProfile;
