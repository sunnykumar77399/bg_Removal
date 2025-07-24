// import React, { useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// const NavBar = () => {
//   const { openSignIn } = useClerk();
//   const { isSignedIn } = useUser();
//   const { credit, loadCreditsData } = useContext(AppContext);

//   useEffect(() => {
//     if (isSignedIn) {
//       loadCreditsData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isSignedIn]);

//   return (
//     <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
//       <Link to="/">
//         <img className="w-32 sm:w-44" src={assets.logo} alt="Logo" />
//       </Link>

//       {isSignedIn ? (
//         <div className="flex items-center gap-4">
//           <img src={assets.credit_icon} alt="" />
//           <p>Credits : {credit}</p>
//           {/* <span className="text-sm font-semibold">Credits: {credit}</span> */}
//           <UserButton />
//         </div>
//       ) : (
//         <button
//           onClick={() => openSignIn({})}
//           className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
//         >
//           Get Started
//           <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default NavBar;

import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { credit, loadCreditsData, loading } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="Logo" />
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={assets.credit_icon} alt="" />
          {loading ? (
            <p>Loading credits...</p>
          ) : credit !== null && credit !== undefined ? (
            <p>Credits: {credit}</p>
          ) : (
            <p>Credits not loaded</p>
          )}
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started
          <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
