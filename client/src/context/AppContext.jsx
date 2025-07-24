
import React, { createContext, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [credit, setCredit] = useState(false); // Start with null 
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { getToken } = useAuth();
  
  const loadCreditsData = async () => {
       
    //   try {
    //       const token = await getToken();
    //       const { data } = await axios.get(backendUrl+`/api/user/credits`, {headers: { token }});
          
    //       if (data.success) {
    //           setCredit(data.credits);
    //           console.log("Fetched credits:", data.credits);
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //         toast.error("Failed to load credits");
        
    // }
    try {
    const token = await getToken();
    const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
      headers: { token }
    });

    console.log("Full response:", data); // Debug log

    if (data.success) {
      // Handle different possible response formats
      const credits = data.credits ?? data.user?.creditBalance ?? false;
      // setCredit(credits);
      console.log("Fetched credits:", credits);
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to load credits");
  }
};

const value = {
    credit,
    setCredit, 
    loadCreditsData,
    backendUrl
};

return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

 