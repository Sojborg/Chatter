import React, {useContext} from 'react';

import './RightSide.css';
import {SocketContext} from "../../../Providers/SocketProvider";

export const RightSide = () => {
  const {users} = useContext(SocketContext);

  return (<div className="textContainer">
      <div>
        <h2>People online <span role="img" aria-label="emoji">💬</span></h2>
      </div>
      {
        users
          ? (
            <div>
              <div className="activeContainer">
                {users.map((user: any) => (
                  <div key={user.email} className="activeItem">
                    {user.username}
                  </div>
                ))}
              </div>
            </div>
          )
          : null
      }
    </div>
  )
};
