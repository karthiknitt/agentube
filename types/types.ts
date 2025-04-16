export interface ChannelDetails {
  title: string;

  thumbnail: string;
  subscribers: string;
}
export interface VideoDetails {
  title: string;

  publishedAt: string;
  thumbnail: string;

  likes: string;
  comments: string;
  channel: ChannelDetails;
  views: string;
}
