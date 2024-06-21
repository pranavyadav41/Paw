import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoCallProps {
  roomID: any;
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
      sharedLinks: [
        {
          name: 'Call Link',
          url: `${window.location.origin}/videoChat?roomID=${roomID}`,
        },
      ], 
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}