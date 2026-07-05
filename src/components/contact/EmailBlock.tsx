export default function ContactEmailBlock() {
  return (
    <blockquote className="border-l-4 border-[var(--accent-teal)] pl-6 py-4 mb-8 bg-[rgba(131,212,197,0.05)] rounded-r">
      <p>
        You can manually send Erin an email at{' '}
        <a
          href="mailto:erin.skidds@gmail.com"
          className="text-[var(--accent-teal)] hover:underline"
        >
          erin.skidds@gmail.com
        </a>
      </p>
    </blockquote>
  );
}