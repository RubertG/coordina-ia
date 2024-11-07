import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="mx-auto my-4 text-sm">
      <p className="text-center text-sm text-zinc-500">
        Diseñado por
        <Link
          target="_blank"
          className="hover:underline lg:transition-colors lg:hover:text-zinc-700"
          href="https://github.com/rubertg12"
        >
          &nbsp;Rubert Gonzalez&nbsp;
        </Link>
        y
        <Link
          target="_blank"
          className="hover:underline lg:transition-colors lg:hover:text-zinc-700"
          href="https://github.com/HAndres8"
        >
          &nbsp;Andres hernandez&nbsp;
        </Link>
      </p>
    </footer>
  )
}