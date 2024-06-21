export function randomID(len: number = 5): string {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
  
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
  
    return result;
  }