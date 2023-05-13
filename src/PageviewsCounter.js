import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export default function PageviewsCounter({ slug }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  if(views)
    return `${views} views`;
  return <><span className="line-through">999</span> views</>
}
