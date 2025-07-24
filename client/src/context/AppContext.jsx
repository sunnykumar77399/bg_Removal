// import React, { createContext, useState } from 'react';
// import { useAuth } from '@clerk/clerk-react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [credit, setCredit] = useState(null) // ✅ changed from false to 0
//   const [loading, setLoading] = useState(true);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const { getToken } = useAuth();

// const loadCreditsData = async () => {
//   try {
//     setLoading(true);
//     const token = await getToken();
//     const { data } = await axios.get(backendUrl + `/api/user/credits`, {
//       headers: { token },
//     });
//     if (data.success) {
//       setCredit(data.credits);
//     }
//   } catch (error) {
//     console.error(error.message);
//     toast.error("Failed to load credits");
//   } finally {
//     setLoading(false);
//   }
// };
// const value = {
//     credit,
//     setCredit,
//     loadCreditsData,
//     backendUrl
// }

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;


import React, { createContext, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(null); // Start with null
  const [loading, setLoading] = useState(true); // Add loading
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const loadCreditsData = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {headers: { token }, });

      if (data.success) {
        setCredit(data.credits);
        console.log("Fetched credits:", data.credits);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load credits");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    credit,
    setCredit,
    loading,
    setLoading,
    loadCreditsData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
