export type UrlPutItem = {
  PK: string;
  SK: string;
  GST1PK?: string;
  GST1SK?: string;
  shortCode: string;
  longUrl: string;
  createdAt: number;
  expires: number;
  userId?: string;
};

export type UrlItem = {
  shortCode: string;
  longUrl: string;
  createdAt: number;
  expires: number;
  userId?: string;
};
