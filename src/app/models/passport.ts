import DateTimeFormat = Intl.DateTimeFormat;

export interface Passport {
  id: string;
  name: string;
  secret: string;
  creator: string;
  created_at: DateTimeFormat;
}
