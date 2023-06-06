import React, { createContext, useState } from 'react'
export const registerContext = createContext()
export const deleteContext = createContext()
export const editContext  = createContext()
function ContextShare({children}) {
    // create state for hold register details
    const [registerData,setregisterData] = useState("")
    const [deleteData,setdeleteData] =useState("")
    // delete data share
    const [editData,seteditData] = useState("")
  return (
    <>
    <registerContext.Provider value={{registerData,setregisterData}}>
      <editContext.Provider value={{editData,seteditData}}>
          <deleteContext.Provider value={{deleteData,setdeleteData}}>
              {children}
            </deleteContext.Provider>
      </editContext.Provider>
       
    </registerContext.Provider>

    </>
  )
}

export default ContextShare