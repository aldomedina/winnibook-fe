import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const Admin = ({ lists }) => {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/admin/locals");
  }, []);

  return false;
};

export default Admin;
