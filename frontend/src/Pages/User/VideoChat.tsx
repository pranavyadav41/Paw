import { useLocation } from "react-router-dom";
import { VideoCall } from "../../Components/common/videoCall";
import { randomID } from "../../utils/randomID";

export default function VideoCallPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roomID = params.get("roomID") || randomID(10);
  const role = params.get("role") || "user";
  const userID = randomID(5);
  const userName = role === "user" ? `User_${userID}` : `Provider_${userID}`;

  return (
    <>
        <VideoCall roomID={roomID} userID={userID} userName={userName} />;
    </>
  );
}
