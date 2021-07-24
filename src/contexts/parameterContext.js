import React ,{useState, createContext } from 'react'



export const ParameterContext = createContext()

export const ParameterProvider =({children})=>{

     const [paramId, setParamId] = useState(0)
     const [paramType, setParamType] = useState(0)
 

    return(
        <ParameterContext.Provider value = {{paramId ,setParamId , paramType ,setParamType }}
        >
            {children}
        </ParameterContext.Provider>

    );

}