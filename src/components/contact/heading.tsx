type Props = {
  id: string;
  children: React.ReactNode;
};

export default function ContactHeading({ id, children }: Props) {
  return (
    <h2 id={id} className="text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}