import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="mx-auto px-4 max-w-7xl my-4 text-sm">
      <p className="text-center text-sm text-zinc-500">
        Diseñado por&nbsp;
        <Link
          target="_blank"
          className="hover:underline lg:transition-colors lg:hover:text-zinc-700"
          href="https://github.com/RubertG"
        >
          Rubert Gonzalez
        </Link>
        &nbsp;y&nbsp;
        <Link
          target="_blank"
          className="hover:underline lg:transition-colors lg:hover:text-zinc-700"
          href="https://github.com/HAndres8"
        >
          Andres Hernandez
        </Link>
      </p>
    </footer>
  )
}