import { useCallback } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface UserClaims {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const useJwtDecode = () => {
  const decodeToken = useCallback((token: string) => {
    if (token) {
      try {
        const decodedToken: JwtPayload & UserClaims = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }, []);

  return { decodeToken };
};

export default useJwtDecode;
