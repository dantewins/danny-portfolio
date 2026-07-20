export function AccentedText({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, index) =>
        index % 2 === 1 ? (
          <em key={index} className="font-merriweather font-light italic">
            {part}
          </em>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
