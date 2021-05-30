import { useState, useEffect } from 'react';

import AddLocalForm from '../../components/AddLocalForm';

const Admin = () => {

  return (
    <div className="">
      
      <div className="container">
        <AddLocalForm
          formDetails={{}}
          setFormDetails={()=>{}}
          setErrors={()=>{}}
          errors={{}}
        />
      </div>

    </div>
  );
};

export default Admin;
