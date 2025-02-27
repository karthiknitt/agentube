"use client";

import { useSchematicEvents } from "@schematichq/schematic-react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { EmailAddress } from "@clerk/nextjs/server";
const SchematicWrapped = ({ children }: { children: React.ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(()=>{
    const userName=
    user?.username??
    user?.fullName??
    user?.emailAddresses[0]?.emailAddress ??
    user?.id;

    if(user?.id){
        identify({
            //Company Level Key
            company:{
                keys:{
                    id:user.id,
                },
                name:userName,
            },

            // User Level Key
            keys:{
                id:user.id,
            },
            name:userName,
        });}
    },[user,identify]);

  

  return children;
};

export default SchematicWrapped;
