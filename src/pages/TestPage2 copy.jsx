import React, { useEffect, useState } from "react";

import {useForm } from "react-hook-form";

import data2 from "demos/countrystate.json";

function CountryState() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const watchOption1 = watch("option1");
  const onSubmit = data => {
    console.log(data2);
  };
  const [dropDownData, setDropDownData] = useState(null);
  const [option2Data, setOption2Data] = useState(null);


  useEffect(() => {
      setDropDownData(data2);
  }, []);

  return (
        <div>
        {dropDownData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="option1">Food types</label>
              <select
                onChange={e => {
                  if (e.target.value) {
                    setOption2Data(
                      dropDownData.countries.find(i => i.country === watchOption1)
                        .states
                    );
                      
                    setValue("option2", "");
                    
                  }
                  setValue("option2", "");
                 
                }}
                id="option1"
                name="option1"
                ref={register}
              >
                <option value="" selected="selected">
                  Select
                </option>
                {dropDownData.countries.map(i => (
                  <option key={i.country} value={i.country}>
                    {i.country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="option2">Nutrition type</label>
              <select
                
                id="option2"
                name="option2"
                ref={register}
              >
                <option value="" selected="selected">
                  Select
                </option>
                {option2Data &&
                  option2Data.map(i => (
                    <option key={i} value={i}>
                      {i}
                     
                    </option>
                  )  )
                  
                  }
                  
              </select>
            </div>
          
           
          </form>
        )}
     </div>
  );
}

export default CountryState ;
