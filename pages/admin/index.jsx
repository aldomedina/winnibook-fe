import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Admin = ({ lists }) => {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/admin/locals");
  }, []);

  return false;
};

export const getServerSideProps = withPageAuthRequired();

export default Admin;
