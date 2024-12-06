import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to My Hooks App</h1>
      <p>
        <Link href="/attendance" style={{ color: "blue", textDecoration: "underline" }}>
          Go to Attendance Tracker
        </Link>
      </p>
    </div>
  );
}
