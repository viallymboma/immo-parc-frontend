import React from 'react';

import { UserType } from './TreeViewComponent';

// import { User } from '../types/User';

interface UserNodeProps {
    user: UserType;
}

const UserNodeFolder: React.FC<UserNodeProps> = ({ user }) => (
    <div className='border-l-1 ml-[20px] p-[5px] cursor-pointer'>
        {/* style={{ marginLeft: '20px', border: '1px solid #ddd', padding: '5px' }}  */}
        <p>{user.name}</p>
        {user.children && user.children.length > 0 && (
            <div style={{ marginLeft: '15px' }}>
                {user.children.map((child: UserType) => (
                    <UserNodeFolder key={child.id} user={child} />
                ))}
            </div>
        )}
    </div>
);

export default UserNodeFolder;
