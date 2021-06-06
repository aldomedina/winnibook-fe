import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Icon } from '../Icon';

const AdminHeader = () => {

  return (
    <div className="
      flex-grow-0 

      flex
      items-center

      px-5
      py-3

      border-b
      border-gray-50
    ">

      <div className="mr-4">
        <Link href="/admin">
          <a className="mr-5">
            <Icon icon="logo" w="30px" h="30px" />
          </a>
        </Link>
      </div>
      
      <a 
        className="mr-8"
        href="/admin/locals"
      >
        Locals
      </a>

      <a 
        className="mr-8"
        href="/admin/stories"
      >
        Stories
      </a>

      <a 
        className="mr-8"
        href="/admin/categories"
      >
        Categories
      </a>

      <a 
        className="mr-8"
        href="/admin/tags"
      >
        Tags
      </a>

      <a 
        className="mr-8"
        href="/admin/lists"
      >
        Lists
      </a>

      <a 
        className="mr-8"
        href="/admin/misc"
      >
        Misc
      </a>

    </div>
  );
};

export default AdminHeader;
