import React ,{useState, useEffect ,createContext } from 'react'
import axios from "axios";
import { createAPIEndpoint, ENDPIONTS } from "../api";



export const HistoryContext = createContext()

export const HistoryProvider =({children})=>{


  const [details, setDetails] = useState(null);
    const UserID = localStorage.getItem('UserID');
    const action ={
      ADD:0,
      EDIT:1,
      DELETE:2,
    }
    function handlehistory(OperationIndex,  ScreenName ,  description   ) {
           createAPIEndpoint(ENDPIONTS.LOGS).create(
            {
                LogID:0,
                interfaceID:0,
                UserID:UserID,
                OperationIndex:OperationIndex,
                ScreenName:ScreenName,
                Operation:description,
                MachineIP:'',
                MachineName:'',
             }
           )
          .then(res => {      
          })
            .catch(function (response) {
              console.log(response);
            });
         //  operation index      // 0 = add 1 = update 2 = delete 
 
         console.log(
            {
                LogID:0,
                interfaceID:0,
                UserID:UserID,
                OperationIndex:OperationIndex,
                ScreenName:ScreenName,
                Operation:description,
                MachineIP:'',
                MachineName:'',
             }
         );
      }


    return(
        <HistoryContext.Provider value = {{handlehistory , action , UserID}}
        >
            {children}
        </HistoryContext.Provider>

    );

}