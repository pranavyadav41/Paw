import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoCallProps {
  roomID: string;
  userID: string;
  userName: string;
}

export function VideoCall({ roomID, userID, userName }: VideoCallProps) {
  const myMeeting = async (element: HTMLDivElement) => {
   
    const appID = 1681484312;
    const serverSecret = "f6069e4dad867babee87fb58e1b97250";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      // sharedLinks: [
      //   {
      //     name: 'Personal link',
      //     url:
      //       window.location.protocol + '//' + 
      //       window.location.host + window.location.pathname +
      //       '?roomID=' +
      //       roomID,
      //   }, 
      // ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onJoinRoom: () => {
        console.log('Joined the room successfully');
      },
      onLeaveRoom: () => {
        console.log('Left the room');
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height:'50vw'}}
    ></div>
  );
}