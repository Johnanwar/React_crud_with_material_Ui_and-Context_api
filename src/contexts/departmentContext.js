import React ,{useState, useEffect ,createContext } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../api";



export const DepartmentContext = createContext()

export const DepartmentProvider =({children})=>{

    // const [uncle, setUncle] = useState()
    const [managementValues, setManagementValues] = useState([])

    // const headerToken  = localStorage.getItem('AccessToken');

          // fetch departments
          useEffect(() => {
            createAPIEndpoint(ENDPIONTS.DEPARTMENTS).fetchAll()
            .then(res => {
                setManagementValues(res.data.data)
              //     let customerList = res.data.data.map(item => ({
            //         id: item.DepartmentID,
            //         title: item.DepartmentName
            //     }));
            //     customerList = [].concat(customerList);
            //    console.log(customerList)
              
            })
            .catch(err => console.log(err))
          }, [])

    return(
        <DepartmentContext.Provider value = {{managementValues}}
        >
            {children}
        </DepartmentContext.Provider>

    );

}