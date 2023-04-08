import { format, parseISO } from 'date-fns';

export default function Date({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString}>
      {format(parseISO(dateString), 'LLLL d, yyyy')}
    </time>
  );
}
