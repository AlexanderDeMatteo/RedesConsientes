import React, { useState, useContext, useEffect } from "react";
import {Pagination} from "@nextui-org/react";


export const Filtro2 = () => {
    
  const sizes = ["sm", "md", "lg"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {sizes.map((size) => (
        <Pagination key={size} total={10} initialPage={1} size={size} />
      ))}
    </div>
          
  );
}