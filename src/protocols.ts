export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type CreatePostParams = {
  text: string;
  imageUrl?: string;
  location?: string;
  userId: number;
  updatedAt: Date | string;
};
