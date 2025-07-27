export type TextBoxAuthor = 'me' | 'you';
export type TextBoxStatus =
  | 'default'
  | 'clicked'
  | 'inputed'
  | 'error'
  | 'success';

export interface TextBoxBaseProps {
  value: string;
  author?: TextBoxAuthor;
  multiline?: boolean;
  time?: string;
  className?: string;
}

export interface TextBoxStatusProps extends TextBoxBaseProps {
  status?: TextBoxStatus;
  error?: string;
  success?: string;
}
