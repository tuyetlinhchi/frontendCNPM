import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Sự kiện sắp diễn ra</h1>
      {events.length === 0 && (
        <h3>Không có sự kiện nào</h3>
      )}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">
            Xem tất cả sự kiện
          </a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/events?_sort=date:DESC&_limit=3`
  );
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
