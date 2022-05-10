export interface JwtDto {
  userId: string;
  role: string;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
}
