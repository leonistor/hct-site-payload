export function Heading1({ text = 'Heading 1 text' }: { text?: string }) {
  return (
    <div className="prose dark:prose-invert lg:prose-xl mt-2">
      <h1>{text}</h1>
    </div>
  )
}
